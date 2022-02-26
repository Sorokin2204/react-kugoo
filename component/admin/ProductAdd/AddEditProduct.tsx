import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import HeaderAdmin from '../HeaderAdmin';
import MainWrapper from '../MainWrapper';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT } from '../../../graphql/mutation/product';
import { Add, Category } from '@mui/icons-material';
import CategoryModal from '../ProductAdd/CategoryModal';
import {
  GET_ALL_CATEGORY,
  GET_CATEGORY,
} from '../../../graphql/query/category';
import AttributeModal from '../ProductAdd/AttributeModal';
import ProductAttribute from '../ProductAttribute';
import _ from 'lodash';
import EditOptionModal from '../ProductAdd/EditOptionModal';
import SpecModal from '../ProductAdd/SpecModal';
import NumberFormat from 'react-number-format';
import TextInputCustom from '../inputs/TextInputForm';
import NumberInputCustom from '../inputs/NumberInputForm';
import PriceInputCustom from '../inputs/PriceInputForm';
import TextInputForm from '../inputs/TextInputForm';
import PriceInputForm from '../inputs/PriceInputForm';
import NumberInputForm from '../inputs/NumberInputForm';
import SelectForm from '../inputs/SelectForm';
import translationToSlug from '../../../utils/translateToSlug';
import { Product } from '../../../types/graphql';
import { ProductDto } from '../../../types/graphqlDto';

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
  // image: FileList;
}

type Props = {
  product?: ProductDto;
};

const AddEditProduct: React.FC<Props> = ({ product }) => {
  const productForm = useForm<IFormInput>({
    mode: 'onBlur',
    defaultValues: {
      ...(product
        ? { ...product, category: product.Category._id }
        : { specs: [] }),
    },
  });

  const { fields } = useFieldArray({
    control: productForm.control,
    name: 'specs',
  });
  // MUTATION
  const [newProduct] = useMutation(CREATE_PRODUCT);
  //   STATE
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const [openSpec, setOpenSpec] = useState<boolean>(false);
  const [openAttrs, setOpenAttrs] = useState<boolean[]>([]);
  const [attrOptions, setAttrOptions] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [editedOption, setEditedOption] = useState(null);
  const [openEditOptionModal, setOpenEditOptionModal] = useState(false);
  // QUERY
  const [
    getCategory,
    {
      data: categoryData,
      loading: categoryLoading,
      error: categoryError,
      refetch: categoryRefetch,
    },
  ] = useLazyQuery(GET_CATEGORY);
  const {
    data: allCategoryData,
    loading: allCategoryLoading,
    error: allCategoryError,
    refetch: allCategoryRefetch,
  } = useQuery(GET_ALL_CATEGORY);
  //EDIT OPTION MODAL
  const handleEditOptionClick = (opt) => {
    setEditedOption(opt);
    setOpenEditOptionModal(true);
  };
  const handleCloseEditOptionModal = () => {
    setOpenEditOptionModal(false);
  };

  useEffect(() => {}, [editedOption]);

  const handleSwithCategory = () => setOpenCategory(!openCategory);
  const handleSwithAttribute = () => setOpenAttribute(!openAttribute);
  const handleSwithSpec = () => setOpenSpec(!openSpec);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    var result = _.flatten(_.map(data.attributes, 'opts'));
    result = _.filter(result, { checked: true });
    result = _.map(result, (e) =>
      _.pick(e, ['_id', 'customPrice', 'customSublabel']),
    );
    const productData = { ...data, attributes: result };

    console.log(result);
    newProduct({
      variables: {
        product: productData,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
      });
  };

  useEffect(() => {
    if (product?.Category?._id) {
      setActiveCategoryId(product?.Category?._id);
    }

    // console.log('Upd specs', specs);
  }, []);

  useEffect(() => {
    productForm.setValue('attributes', attrOptions);
  }, [attrOptions]);

  useEffect(() => {
    if (categoryData) productForm.setValue(`specs`, []);
  }, [categoryData]);

  useEffect(() => {
    console.log('ACTIVE CATEGORY CHANGE');
    productForm.setValue('specs', []);
    productForm.clearErrors('specs');

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
          console.log('Attribut Resault', attrOpts);
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

          // attrOpts?.map((attr, index) => {
          //   const findAttr = product?.AttributeOptions?.edges.find(
          //     (attrOpt) => attrOpt.node.Attribute._id == attr.node._id,
          //   );
          //   checkAttribute(findAttr.node._id, null, null);

          //   // productForm.setValue(
          //   //   `attributes[${index}].specOptId`,
          //   //   findSpec.node._id,
          //   // );

          //   // productForm.setValue(
          //   //   `specs[${index}].customValue`,
          //   //   findSpec.node.name,
          //   // );
          // });
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
          console.log(err);
          // console.error(JSON.stringify(err, null, 2));
        });
    }
  }, [activeCategoryId]);

  const ProductAttributeBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridGap: '10px',
  }));
  const [typingName, setTypingName] = useState('');
  const [disabledSlug, setDisabledSlug] = useState(false);
  useEffect(() => {
    const timer = translationToSlug(
      'name',
      'slug',
      productForm.getValues,
      productForm.setValue,
      setDisabledSlug,
    );
    return () => clearTimeout(timer);
  }, [typingName]);

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

          <ProductAttributeBox>
            {attrOptions.lenght !== 0
              ? attrOptions.map((attr, i) => (
                  <>
                    <ProductAttribute
                      handleEditOptionClick={handleEditOptionClick}
                      open={openAttrs[i]}
                      setOpen={() => {
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
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
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
                              required: {
                                value: false,
                                message: 'Обязательное поле',
                              },
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
                              required: {
                                value: true,
                                message: 'Обязательное поле',
                              },
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
                              required: {
                                value: true,
                                message: 'Обязательное поле',
                              },
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
                              required: {
                                value: false,
                                message: 'Обязательное поле',
                              },
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
          <TextInputForm
            label={'Название'}
            name={'name'}
            rules={{
              required: { value: true, message: 'Поле не должно быть пустым' },
              maxLength: { value: 40, message: 'Не более 40 символов' },
              minLength: { value: 5, message: 'Не менее 5 символов' },
            }}
            inputProps={{
              onChange: (e) => {
                setDisabledSlug(true);
                setTypingName(e.target.value);
                productForm.setValue('name', e.target.value);
              },
            }}
            form={productForm}
          />
          <TextInputForm
            label={'Слаг'}
            name={'slug'}
            rules={{
              required: { value: true, message: 'Поле не должно быть пустым' },
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
          {/* <Controller
            name="image"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files);
                }}
                multiple
              />
            )}
          /> */}
          <Button type="submit" disabled={!productForm.formState.isValid}>
            Сохранить
          </Button>
        </form>

        <IconButton
          onClick={handleSwithCategory}
          sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
          <Add />
        </IconButton>
        <IconButton
          onClick={handleSwithAttribute}
          sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
          <Add />
        </IconButton>
        <IconButton
          onClick={handleSwithSpec}
          sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
          <Add />
        </IconButton>
        <CategoryModal open={openCategory} handleClose={handleSwithCategory} />
        <AttributeModal
          open={openAttribute}
          handleClose={handleSwithAttribute}
        />
        <SpecModal open={openSpec} handleClose={handleSwithSpec} />
      </MainWrapper>
      {openEditOptionModal ? (
        <EditOptionModal
          open={true}
          onClose={handleCloseEditOptionModal}
          opt={editedOption}
          handleSaveEditedOption={(selectedOpt, customPrice, customLabel) => {
            checkAttribute(selectedOpt, customPrice, customLabel);
            setEditedOption(null);
            setOpenEditOptionModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default AddEditProduct;
