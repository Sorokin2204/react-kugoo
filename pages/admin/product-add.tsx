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
import HeaderAdmin from '../../component/admin/HeaderAdmin';
import MainWrapper from '../../component/admin/MainWrapper';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/mutation/product';
import { Add, Category } from '@mui/icons-material';
import CategoryModal from '../../component/admin/ProductAdd/CategoryModal';
import { GET_ALL_CATEGORY, GET_CATEGORY } from '../../graphql/query/category';
import AttributeModal from '../../component/admin/ProductAdd/AttributeModal';
import ProductAttribute from '../../component/admin/ProductAttribute';
import _ from 'lodash';
import EditOptionModal from '../../component/admin/ProductAdd/EditOptionModal';
import SpecModal from '../../component/admin/ProductAdd/SpecModal';
import NumberFormat from 'react-number-format';
type Props = {};

interface IFormInput {
  name: string;
  price: number;
  discountPrice: number;
  specs: Array<{
    specId: string;
    specOpt: string;
  }>;
  // image: FileList;
}

const ProductAdmin: React.FC<Props> = ({}) => {
  const {
    control,
    handleSubmit,
    register,
    resetField,
    reset,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: 'onTouched',
    defaultValues: {
      specs: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'specs',
  });

  const [newProduct] = useMutation(CREATE_PRODUCT);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const [openSpec, setOpenSpec] = useState<boolean>(false);
  const [openAttrs, setOpenAttrs] = useState<boolean[]>([]);
  const [attrOptions, setAttrOptions] = useState<
    Array<{ optId: string; checked: boolean; customPrice: number | null }>
  >([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  //EDIT OPTION MODAL
  const [editedOption, setEditedOption] = useState(null);
  const [openEditOptionModal, setOpenEditOptionModal] = useState(false);
  const handleEditOptionClick = (opt) => {
    setEditedOption(opt);
    setOpenEditOptionModal(true);
  };
  const handleCloseEditOptionModal = () => {
    setOpenEditOptionModal(false);
  };

  useEffect(() => {}, [editedOption]);

  const [
    getCategory,
    {
      data: categoryData,
      loading: categoryLoading,
      error: categoryError,
      refetch: categoryRefetch,
    },
  ] = useLazyQuery(GET_CATEGORY);

  const handleSwithCategory = () => setOpenCategory(!openCategory);
  const handleSwithAttribute = () => setOpenAttribute(!openAttribute);
  const handleSwithSpec = () => setOpenSpec(!openSpec);
  const {
    data: allCategoryData,
    loading: allCategoryLoading,
    error: allCategoryError,
    refetch: allCategoryRefetch,
  } = useQuery(GET_ALL_CATEGORY);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    // newProduct({
    //   variables: {
    //     input: data,
    //   },
    // }).then((data) => {
    //   console.log(data);
    // });
  };

  useEffect(() => {
    if (categoryData)
      console.log('DATA SUCCESS', categoryData.getCategory.specs.edges);
  }, [categoryData]);

  useEffect(() => {
    clearErrors('specs');
    setValue('specs', []);
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
              return {
                name: attr.node.name,
                opts: attr.node.AttributeOptions.map((opt) => ({
                  ...opt,
                  checked: false,
                  customPrice: null,
                  customSublabel: null,
                })),
              };
            });
            setAttrOptions(attrOptIds);
            setOpenAttrs(_.fill(Array(length), false));
          } else {
            setAttrOptions([]);
            setOpenAttrs([]);
          }

          console.log(specOpts);
        })
        .catch((err) => {
          console.error(err);
          // console.error(JSON.stringify(err, null, 2));
        });
    }
  }, [activeCategoryId]);

  const ProductAttributeBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridGap: '10px',
  }));

  return (
    <>
      <MainWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="category"
            control={control}
            rules={{
              required: { value: false, message: 'Выберите категорию' },
            }}
            render={({ field }) => (
              <>
                <FormControl
                  fullWidth
                  error={errors?.category?.message !== undefined}>
                  <InputLabel id="category-id">Категория</InputLabel>
                  <Select
                    labelId="category-id"
                    {...field}
                    onChange={(e) => {
                      setActiveCategoryId(e.target.value);
                      field.onChange(e.target.value);
                    }}>
                    {!allCategoryLoading &&
                      allCategoryData?.getAllCategory?.map((category) => (
                        <MenuItem value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors?.category?.message && (
                    <FormHelperText>{errors?.category?.message}</FormHelperText>
                  )}
                </FormControl>
              </>
            )}
          />
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
              categoryData.getCategory.specs.edges.map((spec, index) => (
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
                        <Controller
                          name={`specs[${index}].before`}
                          control={control}
                          rules={{
                            required: {
                              value: false,
                              message: 'Обязательное поле',
                            },
                          }}
                          render={({ field }) => (
                            <>
                              <FormControl
                                fullWidth
                                error={errors?.specs?.message !== undefined}>
                                <InputLabel
                                  id={`spec-${spec.node._id}`}></InputLabel>
                                <Select
                                  defaultValue={''}
                                  error={
                                    errors?.specs?.[index]?.before?.message !==
                                    undefined
                                  }
                                  labelId={`spec-${spec.node._id}id`}
                                  {...field}
                                  onChange={(e) => {
                                    // setActiveCategoryId(e.target.value);
                                    field.onChange(e.target.value);
                                  }}>
                                  <MenuItem value={''}>Не выбранно</MenuItem>
                                  {spec?.node?.SpecExtraTexts?.map(
                                    (specOpt) => (
                                      <MenuItem value={specOpt.slug}>
                                        {specOpt.name}
                                      </MenuItem>
                                    ),
                                  )}
                                </Select>
                                {errors?.specs?.[index]?.before?.message !==
                                  undefined && (
                                  <FormHelperText sx={{ color: 'error.main' }}>
                                    {errors?.specs?.[index]?.before?.message}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </>
                          )}
                        />
                      </Box>
                    )}

                    <Controller
                      key={spec.node._id}
                      name={`specs[${index}].value`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: ' ',
                        },
                      }}
                      render={({ field }) => (
                        <Box sx={{ width: '100%' }}>
                          {spec?.node?.SpecOptions.length !== 0 ? (
                            <FormControl
                              fullWidth
                              error={errors?.specs?.message !== undefined}>
                              <InputLabel id={`spec-${spec.node._id}id`}>
                                {/* {spec.node.name} */}
                              </InputLabel>
                              <Select
                                defaultValue={''}
                                error={
                                  errors?.specs?.[index]?.value?.message !==
                                  undefined
                                }
                                labelId={`spec-${spec.node._id}id`}
                                {...field}
                                onChange={(e) => {
                                  // setActiveCategoryId(e.target.value);
                                  field.onChange(e.target.value);
                                }}>
                                <MenuItem value={''}>Не выбранно</MenuItem>
                                {spec?.node?.SpecOptions?.map((specOpt) => (
                                  <MenuItem value={specOpt.slug}>
                                    {specOpt.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {errors?.specs?.[index]?.value?.message !==
                                undefined && (
                                <FormHelperText sx={{ color: 'error.main' }}>
                                  {errors?.specs?.[index]?.value?.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          ) : spec.node.type === 'number' ? (
                            <NumberFormat
                              customInput={TextField}
                              sx={{ width: '100%' }}
                              error={
                                errors?.specs?.[index]?.value?.message !==
                                undefined
                              }
                              helperText={
                                errors?.specs?.[index]?.value?.message
                              }
                              {...field}
                              variant="outlined"
                            />
                          ) : (
                            <TextField
                              sx={{ width: '100%' }}
                              error={
                                errors?.specs?.[index]?.value?.message !==
                                undefined
                              }
                              helperText={
                                errors?.specs?.[index]?.value?.message
                              }
                              {...field}
                              variant="outlined"
                            />
                          )}
                        </Box>
                      )}
                    />

                    {spec?.node?.SpecExtraTexts.findIndex(
                      (specExtra) => specExtra.type === 'after',
                    ) !== -1 && (
                      <Box sx={{ width: '25%' }}>
                        <Controller
                          name={`specs[${index}].after`}
                          control={control}
                          rules={{
                            required: {
                              value: false,
                              message: 'Обязательное поле',
                            },
                          }}
                          render={({ field }) => (
                            <>
                              <FormControl
                                fullWidth
                                error={
                                  errors?.specs?.[index]?.after?.message !==
                                  undefined
                                }>
                                <InputLabel
                                  id={`spec-${spec.node._id}`}></InputLabel>
                                <Select
                                  defaultValue={''}
                                  error={
                                    errors?.specs?.[index]?.after?.message !==
                                    undefined
                                  }
                                  labelId={`spec-${spec.node._id}id`}
                                  {...field}
                                  onChange={(e) => {
                                    // setActiveCategoryId(e.target.value);
                                    field.onChange(e.target.value);
                                  }}>
                                  <MenuItem value={''}>Не выбранно</MenuItem>
                                  {spec?.node?.SpecExtraTexts?.map(
                                    (specOpt) => (
                                      <MenuItem value={specOpt.slug}>
                                        {specOpt.name}
                                      </MenuItem>
                                    ),
                                  )}
                                </Select>
                                {errors?.specs?.[index]?.after?.message !==
                                  undefined && (
                                  <FormHelperText sx={{ color: 'error.main' }}>
                                    {errors?.specs?.[index]?.after?.message}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </>
                          )}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
          </Box>
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: 'Поле не должно быть пустым' },
              maxLength: { value: 40, message: 'Не более 40 символов' },
              minLength: { value: 5, message: 'Не менее 5 символов' },
            }}
            render={({ field }) => (
              <>
                <TextField
                  error={errors?.name?.message !== undefined}
                  helperText={errors?.name?.message}
                  label="Название"
                  variant="outlined"
                  {...field}
                />
              </>
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: { value: true, message: 'Поле не должно быть пустым' },
              min: { value: 1, message: 'Мин. цена - 1₽' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                error={errors?.price?.message !== undefined}
                helperText={errors?.price?.message}
                label="Цена"
                variant="outlined"
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
              />
            )}
          />
          <Controller
            name="discountPrice"
            control={control}
            rules={{
              required: false,
              min: { value: 1, message: 'Мин. цена - 1₽' },
              max: { value: 999999, message: 'Макс. цена - 999 999₽' },
            }}
            render={({ field }) => (
              <TextField
                type="number"
                error={errors?.discountPrice?.message !== undefined}
                helperText={errors?.discountPrice?.message}
                label="Акционная цена"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
              />
            )}
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

          <Button type="submit" disabled={!isValid}>
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
            setAttrOptions((prev) => {
              const arr = [...prev];
              const indexAttr = arr.findIndex((attr) =>
                attr.opts.some((opt) => opt._id === selectedOpt._id),
              );
              arr[indexAttr] = {
                ...arr[indexAttr],
                opts: arr[indexAttr].opts.map((prevItem) =>
                  prevItem._id === selectedOpt._id
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
            setEditedOption(null);
            setOpenEditOptionModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default ProductAdmin;
