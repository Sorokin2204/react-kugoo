import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Divider,
  MenuItem,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Masonry from 'react-masonry-css';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../../../graphql/mutation/product';
import {
  GET_ALL_CATEGORY,
  GET_CATEGORY,
} from '../../../graphql/query/category';
import { withSnackbar } from '../../../hooks/useAlert';
import useModal from '../../../hooks/useModal';
import { Product, ProductImage } from '../../../types/graphql';
import translationToSlug from '../../../utils/translateToSlug';
import AlertDelete from '../AlertDelete';
import ImageGallery from '../ImageGallery';
import NumberInputForm from '../inputs/NumberInputForm';
import PriceInputForm from '../inputs/PriceInputForm';
import SelectForm from '../inputs/SelectForm';
import TextInputForm from '../inputs/TextInputForm';
import MainWrapper from '../MainWrapper';
import Overlay from '../Overlay';
import EditOptionModal from '../ProductAdd/EditOptionModal';
import ProductAttribute from '../ProductAttribute';
interface IFormInput {
  name: string;
  price: number;
  slug: string;
  discountPrice: number;
  vendorCode: string;
  category: string;
  specs: Array<{
    specId: string;
    specOpt: string;
  }>;
  attributes: [];
}

const ProductAttributeBox = styled(Masonry)(({ theme }) => ({}));

type Props = {
  product?: Product;
};

const AddEditProduct: React.FC<Props> = ({ product, snackbarShowMessage }) => {
  // MUTATION
  const [newProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  // STATE
  const theme = useTheme();
  const router = useRouter();
  const [images, setImages] = useState<ProductImage>(product?.images || []);
  const [openDelete, handleToggleDelete] = useModal();
  const [openEditOption, handleToggleEditOption] = useModal();
  const [openAttrs, setOpenAttrs] = useState<boolean[]>([]);
  const [attrOptions, setAttrOptions] = useState([]);
  const [visibleOverlay, setVisibleOverlay] = useState<boolean>(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const productForm = useForm<IFormInput>({
    mode: 'onBlur',
    defaultValues: {
      ...(product
        ? { ...product, category: product.Category._id }
        : { specs: [] }),
    },
  });
  // QUERY
  const [getCategory, { data: categoryData, loading: categoryLoading }] =
    useLazyQuery(GET_CATEGORY);
  const { data: allCategoryData, loading: allCategoryLoading } =
    useQuery(GET_ALL_CATEGORY);
  const [disabledSlug, setDisabledSlug] = useState(false);
  // REFS
  const timer = useRef('');

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setVisibleOverlay(true);
    var attributeOptsDto = _.flatten(_.map(data.attributes, 'opts'));
    attributeOptsDto = _.filter(attributeOptsDto, { checked: true });
    attributeOptsDto = _.map(attributeOptsDto, (e) =>
      _.pick(e, ['_id', 'customPrice', 'customSublabel']),
    );
    const specOptsDto = data.specs.filter((spec) => spec.specOptId);

    const productData = {
      ...data,
      specs: specOptsDto,
      attributes: attributeOptsDto,
      images: images.map((img) => _.omit(img, ['__typename', 'objectUrl'])),
    };

    if (product) {
      updateProduct({
        variables: {
          product: _.omit(productData, [
            '__typename',
            'AttributeOptions',
            'SpecOptions',
            'Category',
          ]),
        },
      })
        .then(() => {
          snackbarShowMessage(`?????????? ???????????????? ??????????????`);
          setVisibleOverlay(false);
        })
        .catch((err) => {
          setVisibleOverlay(false);
          console.log(err);
          if (err.graphQLErrors.length !== 0) {
            if (err.graphQLErrors[0].extensions.argumentName === 'slug') {
              snackbarShowMessage(
                `?????????? ?? ?????????? ???????????? ?????? ????????????????????`,
                'error',
              );
            } else if (
              err.graphQLErrors[0].extensions.argumentName === 'name'
            ) {
              snackbarShowMessage(
                `?????????? ?? ?????????? ?????????????????? ?????? ????????????????????`,
                'error',
              );
            } else {
              console.log(JSON.stringify(err, null, 2));

              snackbarShowMessage(`?????????????????? ???????????????????????????? ????????????`, 'error');
            }
          } else {
            snackbarShowMessage(`?????????????????? ???????????????????????????? ????????????`, 'error');
          }
        });
    } else {
      newProduct({
        variables: {
          product: _.omit(productData, [
            '__typename',
            'AttributeOptions',
            'SpecOptions',
            'Category',
          ]),
        },
      })
        .then(() => {
          snackbarShowMessage(`?????????? ???????????????? ??????????????`);
          router.push('/admin/product-list');
        })
        .catch((err) => {
          setVisibleOverlay(false);
          if (err.graphQLErrors[0].extensions.argumentName === 'slug') {
            snackbarShowMessage(`?????????? ?? ?????????? ???????????? ?????? ????????????????????`, 'error');
          } else if (err.graphQLErrors[0].extensions.argumentName === 'name') {
            snackbarShowMessage(
              `?????????? ?? ?????????? ?????????????????? ?????? ????????????????????`,
              'error',
            );
          } else {
            console.log(JSON.stringify(err, null, 2));

            snackbarShowMessage(`?????????????????? ???????????????????????????? ????????????`, 'error');
          }

          console.error(JSON.stringify(err, null, 2));
        });
    }
  };

  useEffect(() => {
    if (product?.Category?._id) {
      setActiveCategoryId(product?.Category?._id);
    }
  }, []);

  useEffect(() => {
    productForm.setValue('attributes', attrOptions);
  }, [attrOptions]);

  useEffect(() => {
    productForm.setValue('specs', []);
    if (activeCategoryId) {
      getCategory({
        variables: {
          id: activeCategoryId,
          withAttrOpts: true,
          withSpecOpts: true,
        },
      })
        .then((resault) => {
          const attrOpts = resault?.data?.getCategory?.attributes?.edges;
          const specOpts = resault?.data?.getCategory?.specs?.edges;
          if (attrOpts) {
            const length = attrOpts.leght;
            const attrOptIds = attrOpts.map((attr) => {
              const findAttr = product?.AttributeOptions?.edges.filter(
                (attrOpt) => attrOpt.node.Attribute._id == attr.node._id,
              );

              return {
                name: attr.node.name,
                _id: attr.node._id,
                opts: attr.node.AttributeOptions.map((opt) => {
                  const findAttrOpt = findAttr?.find(
                    (attrOptt) => attrOptt.node._id == opt._id,
                  );
                  if (findAttrOpt) {
                    return {
                      ...opt,
                      checked: true,
                      customPrice: findAttrOpt.customPrice,
                      customSublabel: findAttrOpt.customSublabel,
                    };
                  } else {
                    return {
                      ...opt,
                      checked: false,
                      customPrice: null,
                      customSublabel: null,
                    };
                  }
                }),
              };
            });
            setAttrOptions(attrOptIds);
            setOpenAttrs(_.fill(Array(length), false));
          } else {
            setAttrOptions([]);
            setOpenAttrs([]);
          }
          specOpts?.map((spec, index) => {
            const findSpec = product?.SpecOptions?.edges.find(
              (specc) => specc.node.Spec._id == spec.node._id,
            );
            if (findSpec) {
              if (findSpec.node.default == true) {
                productForm.setValue(
                  `specs[${index}].specOptId`,
                  findSpec.node._id,
                );
                return;
              }
              productForm.setValue(
                `specs[${index}].customValue`,
                findSpec.node.name,
              );
            }
          });
        })
        .catch((err) => {
          console.error(JSON.stringify(err, null, 2));
        });
    }
  }, [activeCategoryId]);

  function checkAttribute(attrOptId, customPrice, customLabel) {
    setAttrOptions((prev) => {
      const arr = [...prev];
      const indexAttr = arr.findIndex((attr) =>
        attr.opts.some((opt) => opt._id === attrOptId._id),
      );
      arr[indexAttr] = {
        ...arr[indexAttr],
        opts: arr[indexAttr].opts.map((prevItem) =>
          prevItem._id === attrOptId._id
            ? {
                ...prevItem,
                checked: true,
                customPrice: customPrice,
                customSublabel: customLabel,
              }
            : prevItem,
        ),
      };
      return arr;
    });
  }

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <MainWrapper>
          <form onSubmit={productForm.handleSubmit(onSubmit)}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                display: 'block',
              }}>
              ?????? 1 - ??????????????????????
            </Typography>
            <Divider sx={{ marginBottom: '20px', marginTop: '5px' }} />

            <ImageGallery images={images} setImages={setImages} />
            <Typography
              variant="body1"
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                display: 'block',
              }}>
              ?????? 2 - ????????????????
            </Typography>
            <Divider sx={{ marginBottom: '20px', marginTop: '5px' }} />
            <SelectForm
              name={'category'}
              label={'??????????????????'}
              rules={{
                required: { value: true, message: '???????????????? ??????????????????' },
              }}
              form={productForm}
              selectProps={{
                onChange: (e) => {
                  setActiveCategoryId(e.target.value);
                  productForm.setValue('category', e.target.value);
                },
              }}>
              {!allCategoryLoading &&
                allCategoryData?.getAllCategory?.map((category) => (
                  <MenuItem value={category._id} key={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
            </SelectForm>
            <Typography
              variant="body1"
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                display: 'block',
                marginTop: '10px',
              }}>
              ?????? 3 - ??????????????????
            </Typography>
            <Divider sx={{ marginBottom: '20px', marginTop: '5px' }} />
            <ProductAttributeBox
              breakpointCols={{
                default: 2,
                840: 1,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {attrOptions.lenght !== 0
                ? attrOptions.map((attr, i) => (
                    <>
                      <ProductAttribute
                        handleClose={handleToggleEditOption}
                        open={openAttrs[i]}
                        setOpen={(): void => {
                          setOpenAttrs((prev) => {
                            const arr = [...prev];
                            arr[i] = !arr[i];
                            return arr;
                          });
                        }}
                        handleCheckboxChange={(optId) => {
                          setAttrOptions((prev) => {
                            const arr = [...prev];
                            arr[i] = {
                              ...arr[i],
                              opts: arr[i].opts.map((prevItem) =>
                                prevItem._id === optId
                                  ? { ...prevItem, checked: !prevItem.checked }
                                  : prevItem,
                              ),
                            };
                            return arr;
                          });
                        }}
                        attrData={attr}
                      />
                    </>
                  ))
                : ''}
            </ProductAttributeBox>
            <Typography
              variant="body1"
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                display: 'block',
              }}>
              ?????? 4 - ????????????????????????????
            </Typography>
            <Divider
              sx={{
                marginBottom: '10px',
                marginTop: '5px',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                [theme.breakpoints.down('md')]: {
                  gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
                },
                gridGap: '15px',
                marginBottom: '15px',
              }}>
              {!categoryLoading &&
                categoryData &&
                categoryData?.getCategory?.specs?.edges?.map((spec, index) => {
                  productForm.setValue(`specs[${index}].specId`, spec.node._id);
                  productForm.setValue(`specs[${index}].type`, spec.node.type);
                  return (
                    <Box key={spec.node._id}>
                      <Typography variant="body1" sx={{ fontWeight: '600' }}>
                        {spec.node.name}
                      </Typography>
                      <Box
                        key={spec.node._id}
                        sx={{
                          display: 'flex',
                        }}>
                        {spec?.node?.SpecExtraTexts.findIndex(
                          (specExtra) => specExtra.type === 'before',
                        ) !== -1 && (
                          <Box sx={{ width: '25%' }}>
                            <SelectForm
                              name={`specs[${index}].beforeId`}
                              label={''}
                              rules={{
                                required: false,
                              }}
                              form={productForm}>
                              <MenuItem value={''}>???? ????????????????</MenuItem>
                              {spec?.node?.SpecExtraTexts?.filter(
                                (before) => before.type === 'before',
                              )?.map((specOpt) => (
                                <MenuItem key={specOpt._id} value={specOpt._id}>
                                  {specOpt.name}
                                </MenuItem>
                              ))}
                            </SelectForm>
                          </Box>
                        )}

                        <Box sx={{ width: '100%' }}>
                          {spec?.node?.SpecOptions.length !== 0 ? (
                            <SelectForm
                              name={`specs[${index}].specOptId`}
                              label={''}
                              rules={{
                                required: false,
                              }}
                              form={productForm}>
                              <MenuItem value={''}>???? ????????????????</MenuItem>
                              {spec?.node?.SpecOptions?.map((specOpt) => (
                                <MenuItem
                                  value={specOpt._id}
                                  key={specOpt.name}>
                                  {specOpt.name}
                                </MenuItem>
                              ))}
                            </SelectForm>
                          ) : spec.node.type === 'number' ? (
                            <NumberInputForm
                              label={''}
                              name={`specs[${index}].customValue`}
                              rules={{
                                required: {
                                  value: true,
                                  message: '???????????????????????? ????????',
                                },
                              }}
                              inputProps={{
                                onValueChange: (v) => {
                                  productForm.setValue(
                                    `specs[${index}].customValue`,
                                    v.value,
                                  );
                                },
                              }}
                              form={productForm}
                            />
                          ) : (
                            <TextInputForm
                              label={''}
                              name={`specs[${index}].customValue`}
                              rules={{
                                required: false,
                              }}
                              form={productForm}
                            />
                          )}
                        </Box>

                        {spec?.node?.SpecExtraTexts.findIndex(
                          (specExtra) => specExtra.type === 'after',
                        ) !== -1 && (
                          <Box sx={{ width: '25%' }}>
                            <SelectForm
                              name={`specs[${index}].afterId`}
                              label={''}
                              rules={{
                                required: false,
                              }}
                              form={productForm}>
                              <MenuItem value={''}>???? ????????????????</MenuItem>
                              {spec?.node?.SpecExtraTexts?.filter(
                                (after) => after.type === 'after',
                              )?.map((specOpt) => (
                                <MenuItem key={specOpt._id} value={specOpt._id}>
                                  {specOpt.name}
                                </MenuItem>
                              ))}
                            </SelectForm>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                display: 'block',
              }}>
              ?????? 5 - ?????????? ????????????????????
            </Typography>
            <Divider sx={{ marginBottom: '20px', marginTop: '5px' }} />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                [theme.breakpoints.down('md')]: {
                  gridTemplateColumns: '1fr',
                },
                gridGap: '20px',
              }}>
              <TextInputForm
                label={'????????????????'}
                name={'name'}
                rules={{
                  required: {
                    value: true,
                    message: '???????? ???? ???????????? ???????? ????????????',
                  },
                  maxLength: { value: 40, message: '???? ?????????? 40 ????????????????' },
                  minLength: { value: 5, message: '???? ?????????? 5 ????????????????' },
                }}
                inputProps={{
                  onChange: (e) => {
                    setDisabledSlug(true);
                    if (timer.current) {
                      clearTimeout(timer.current);
                      timer.current = null;
                    }
                    timer.current = translationToSlug(
                      'name',
                      'slug',
                      productForm.getValues,
                      productForm.setValue,
                      setDisabledSlug,
                    );
                    productForm.setValue('name', e.target.value);
                  },
                }}
                form={productForm}
              />
              <TextInputForm
                label={'????????'}
                name={'slug'}
                rules={{
                  required: {
                    value: true,
                    message: '???????? ???? ???????????? ???????? ????????????',
                  },
                  maxLength: { value: 40, message: '???? ?????????? 40 ????????????????' },
                  minLength: { value: 5, message: '???? ?????????? 5 ????????????????' },
                }}
                inputProps={{
                  disabled: disabledSlug,
                }}
                form={productForm}
              />
              <PriceInputForm
                label={'?????????????????? ????????'}
                rules={{ required: false }}
                name={'discountPrice'}
                form={productForm}
              />
              <PriceInputForm
                label={'????????'}
                name={'price'}
                form={productForm}
              />
              <NumberInputForm
                label={'??????????????'}
                name={'vendorCode'}
                rules={{
                  required: {
                    value: true,
                    message: '???????? ???? ???????????? ???????? ????????????',
                  },
                }}
                inputProps={{
                  format: '#### #### #### ####',
                  onValueChange: (v) => {
                    productForm.setValue('vendorCode', v.value);
                  },
                }}
                form={productForm}
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',

                [theme.breakpoints.down('md')]: {
                  gridTemplateColumns: '1fr',
                },
                marginTop: '20px',
                gap: '10px',
              }}>
              <Button
                type="submit"
                variant="contained"
                disabled={!productForm.formState.isValid}>
                ??????????????????
              </Button>
              {product && (
                <Button
                  onClick={handleToggleDelete}
                  sx={{
                    '&:hover': {
                      backgroundColor: `${theme.palette.error.main} !important `,
                    },
                  }}
                  variant="contained"
                  color="error">
                  ??????????????
                </Button>
              )}
            </Box>
          </form>
        </MainWrapper>
        {visibleOverlay && <Overlay />}
      </Box>
      {openEditOption ? (
        <EditOptionModal
          open={openEditOption}
          onClose={handleToggleEditOption}
          checkAttribute={checkAttribute}
        />
      ) : null}

      {openDelete ? (
        <AlertDelete
          open={openDelete}
          handleClose={handleToggleDelete}
          title={'?????????? ?????????? ????????????'}
          text={'?????????? ???????????? ?????????? ?? ?????? ?????? ?? ?????? ????????????????'}
          handleDelete={() =>
            deleteProduct({
              variables: {
                productId: product?._id,
              },
            }).then(() => {
              router.push('/admin/product-list');
            })
          }
        />
      ) : null}
    </>
  );
};

export default withSnackbar(AddEditProduct);
