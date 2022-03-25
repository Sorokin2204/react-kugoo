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

const AddEditProduct: React.FC<Props> = ({ product }) => {
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
    var result = _.flatten(_.map(data.attributes, 'opts'));
    result = _.filter(result, { checked: true });
    result = _.map(result, (e) =>
      _.pick(e, ['_id', 'customPrice', 'customSublabel']),
    );
    const productData = {
      ...data,
      attributes: result,
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
      }).catch((err) => console.log(JSON.stringify(err, null, 2)));
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
      }).catch((err) => {
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
      <MainWrapper>
        <form onSubmit={productForm.handleSubmit(onSubmit)}>
          <Typography
            variant="body1"
            sx={{
              fontSize: '20px',
              fontWeight: '600',
              display: 'block',
            }}>
            Шаг 1 - Изображения
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
            Шаг 2 - Категоря
          </Typography>
          <Divider sx={{ marginBottom: '20px', marginTop: '5px' }} />
          <SelectForm
            name={'category'}
            label={'Категория'}
            rules={{
              required: { value: false, message: 'Выберите категорию' },
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
                <MenuItem value={category._id}>{category.name}</MenuItem>
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
            Шаг 3 - Аттрибуты
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
            Шаг 4 - Характеристики
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
                            <MenuItem value={''}>Не выбранно</MenuItem>
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
                            <MenuItem value={''}>Не выбранно</MenuItem>
                            {spec?.node?.SpecOptions?.map((specOpt) => (
                              <MenuItem value={specOpt._id}>
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
                                message: 'Обязательное поле',
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
                            <MenuItem value={''}>Не выбранно</MenuItem>
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
            Шаг 5 - Общая информация
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
              label={'Название'}
              name={'name'}
              rules={{
                required: {
                  value: true,
                  message: 'Поле не должно быть пустым',
                },
                maxLength: { value: 40, message: 'Не более 40 символов' },
                minLength: { value: 5, message: 'Не менее 5 символов' },
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
              label={'Слаг'}
              name={'slug'}
              rules={{
                required: {
                  value: true,
                  message: 'Поле не должно быть пустым',
                },
                maxLength: { value: 40, message: 'Не более 40 символов' },
                minLength: { value: 5, message: 'Не менее 5 символов' },
              }}
              inputProps={{
                disabled: disabledSlug,
              }}
              form={productForm}
            />
            <PriceInputForm
              label={'Акционная цена'}
              rules={{ required: false }}
              name={'discountPrice'}
              form={productForm}
            />
            <PriceInputForm label={'Цена'} name={'price'} form={productForm} />
            <NumberInputForm
              label={'Артикул'}
              name={'vendorCode'}
              rules={{ required: false }}
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
              Сохранить
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
                Удалить
              </Button>
            )}
          </Box>
        </form>
      </MainWrapper>
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
          title={'Товар будет удален'}
          text={'Будет удален товар и все что с ним связанно'}
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

export default AddEditProduct;
