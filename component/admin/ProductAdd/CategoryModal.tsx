import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Close, Delete } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../../../graphql/mutation/category';
import { GET_ALL_ATTRIBUTE } from '../../../graphql/query/attribute';
import {
  GET_ALL_CATEGORY,
  GET_CATEGORY,
} from '../../../graphql/query/category';
import { GET_ALL_SPEC } from '../../../graphql/query/spec';
import { withSnackbar } from '../../../hooks/useAlert';
import useModal from '../../../hooks/useModal';
import translationToSlug from '../../../utils/translateToSlug';
import AlertDelete from '../AlertDelete';
import { ModalBox } from '../ModalBox';
import Overlay from '../Overlay';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  open: boolean;
  handleClose();
};

type IFormType = {
  name: string;
  slug: string;
  Attributes: string[];
  Specs: string[];
};

const CategoryModal: React.FC<Props> = ({
  open,
  handleClose,
  snackbarShowMessage,
}) => {
  // MUTATIONS
  const [newCategory] = useMutation(CREATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  // QUERIES
  const {
    data: allCategoryData,
    loading: allCategoryLoading,
    error: allCategoryError,
    refetch: allCategoryRefetch,
  } = useQuery(GET_ALL_CATEGORY);
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
    data: allAttributeData,
    loading: allAttributeLoading,
    error: allAttributeError,
    refetch: allAttributeRefetch,
  } = useQuery(GET_ALL_ATTRIBUTE);

  const {
    data: allSpecData,
    loading: allSpecLoading,
    error: allSpecError,
    refetch: allSpecRefetch,
  } = useQuery(GET_ALL_SPEC);
  // STATES
  const theme = useTheme();
  const [openDelete, handleToggleDelete] = useModal();
  const [activeCategory, setActiveCategory] = useState(null);
  const [autocompleteAttr, setAutocompleteAttr] = useState([]);
  const [autocompleteAttrDefault, setAutocompleteAttrDefault] = useState([]);
  const [autocompleteSpec, setAutocompleteSpec] = useState([]);
  const [autocompleteSpecDefault, setAutocompleteSpecDefault] = useState([]);
  const [typingNameCat, setTypingNameCat] = useState('');
  const [disabledSlugCat, setDisabledSlugCat] = useState(false);
  const [visibleOverlay, setVisibleOverlay] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isValid, errors },
    setValue,
    getValues,
  } = useForm<IFormType>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      slug: '',
      Attributes: [],
      Specs: [],
    },
  });

  //HOOKS
  useEffect(() => {
    allSpecRefetch();
    allCategoryRefetch();
    allAttributeRefetch();
  }, []);

  useEffect(() => {
    if (!activeCategory) reset();
  }, [activeCategory]);

  useEffect(() => {
    setValue('Attributes', autocompleteAttr, {
      shouldValidate: true,
    });
  }, [autocompleteAttr]);

  useEffect(() => {
    setValue('Specs', autocompleteSpec, {
      shouldValidate: true,
    });
  }, [autocompleteSpec]);

  useEffect(() => {
    const timer = translationToSlug(
      'name',
      'slug',
      getValues,
      setValue,
      setDisabledSlugCat,
    );
    return () => clearTimeout(timer);
  }, [typingNameCat]);

  // FUNCTIONS
  const handleTableRowClick = (event, category) => {
    if (category._id !== activeCategory?._id) {
      setVisibleOverlay(true);
      setActiveCategory(category);
      getCategory({
        variables: {
          id: category._id,
          withAttrOpts: false,
          withSpecOpts: false,
        },
      })
        .then((resault) => {
          setVisibleOverlay(false);
          const data = resault.data.getCategory;

          if (data.attributes) {
            const Attribute = data.attributes.edges.map((attr) => ({
              _id: attr.node._id,
              name: attr.node.name,
            }));
            setAutocompleteAttr(Attribute);
            setAutocompleteAttrDefault(Attribute);
          } else {
            setAutocompleteAttr([]);
          }

          if (data.specs) {
            const Spec = data.specs.edges.map((spec) => ({
              _id: spec.node._id,
              name: spec.node.name,
            }));
            setAutocompleteSpec(Spec);
            setAutocompleteSpecDefault(Spec);
          } else {
            setAutocompleteSpec([]);
          }

          setValue('name', data.name, {
            shouldValidate: true,
          });
          setValue('slug', data.slug, {
            shouldValidate: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onSubmit = (data: IFormType) => {
    if (activeCategory) {
      setVisibleOverlay(true);
      let diffDeletedSpecs = _.differenceWith(
        autocompleteSpecDefault,
        data.Specs,
        _.isEqual,
      );
      let diffAddedSpecs = _.differenceWith(
        data.Specs,
        autocompleteSpecDefault,
        _.isEqual,
      );
      let diffDeletedAttrs = _.differenceWith(
        autocompleteAttrDefault,
        data.Attributes,
        _.isEqual,
      );
      let diffAddedAttrs = _.differenceWith(
        data.Attributes,
        autocompleteAttrDefault,
        _.isEqual,
      );

      updateCategory({
        variables: {
          updCategory: _.omit(activeCategory, '__typename'),
          deleteIdSpecs: diffDeletedSpecs.map((delSpec) => delSpec._id),
          newIdSpecs: diffAddedSpecs.map((addedSpec) => addedSpec._id),
          deleteIdAttrs: diffDeletedAttrs.map((delAttr) => delAttr._id),
          newIdAttrs: diffAddedAttrs.map((addedAttr) => addedAttr._id),
        },
      })
        .then(() => {
          setVisibleOverlay(false);
          snackbarShowMessage(`Категория обновлена успешно`),
            setActiveCategory(null);
          allCategoryRefetch();
        })
        .catch((err) => console.log(JSON.stringify(err, null, 2)));
    } else {
      newCategory({
        variables: {
          cat: { name: data.name, slug: data.slug },
          catAttrIds: data.Attributes.map((attr) => attr._id),
          catSpecIds: data.Specs.map((spec) => spec._id),
        },
      })
        .then(() => {
          setVisibleOverlay(false);
          snackbarShowMessage(`Категория добавлена успешно`);
          reset();
          allCategoryRefetch();
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleDeleteCategoryClick = (e) => {
    setVisibleOverlay(true);
    deleteCategory({
      variables: {
        catId: activeCategory._id,
      },
    })
      .then(() => {
        setVisibleOverlay(false);
        snackbarShowMessage(
          `Категория удалена успешно`,
          'error',
          2000,
          <Delete />,
        ),
          allCategoryRefetch();
        setActiveCategory(null);
        reset();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <>
          <ModalBox
            sx={{
              overflowY: 'scroll',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr ',
              gridTemplateRows: 'auto',
              gridGap: '20px',
              [theme.breakpoints.down('sm')]: {
                gridTemplateColumns: '1fr ',
                gridTemplateRows: 'auto minmax(min-content, 1fr)',
              },
            }}>
            <IconButton
              sx={{ p: 0, position: 'absolute', top: 15, right: 15 }}
              onClick={handleClose}>
              <Close sx={{ fontSize: '30px' }} />
            </IconButton>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  [theme.breakpoints.down('sm')]: {
                    alignItems: 'flex-end',
                  },
                }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ display: 'block' }}>
                  {activeCategory !== null
                    ? `Изменить категорию '${activeCategory.name}'`
                    : 'Добавить категорию'}
                </Typography>
                {activeCategory !== null ? (
                  <>
                    <IconButton
                      sx={{ p: 0, ml: 1 }}
                      onClick={() => {
                        setActiveCategory(null);
                      }}>
                      <Close />
                    </IconButton>
                    <IconButton
                      sx={{ p: 0, ml: 1, color: theme.palette.error.main }}
                      onClick={handleToggleDelete}>
                      <Delete />
                    </IconButton>
                  </>
                ) : (
                  ''
                )}
              </Box>

              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Box
                  sx={{
                    display: 'grid',
                    rowGap: '20px',
                    columnGap: '10px',
                  }}>
                  <Controller
                    control={control}
                    name="name"
                    rules={{
                      required: { value: true, message: 'Обязательное поле' },
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          sx={{
                            gridColumn: '1/2',
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Название"
                          error={errors?.name?.message !== undefined}
                          helperText={errors?.name?.message}
                          {...field}
                          {...register('name')}
                          onChange={(e) => {
                            setTypingNameCat(e.target.value);
                            setDisabledSlugCat(true);
                            field.onChange(e.target.value);
                          }}
                        />
                      </>
                    )}
                  />
                  <Controller
                    control={control}
                    name="slug"
                    rules={{
                      required: { value: true, message: 'Обязательное поле' },
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          sx={{
                            gridColumn: '2/3',
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Псевдоним"
                          error={errors?.slug?.message !== undefined}
                          helperText={errors?.slug?.message}
                          disabled={disabledSlugCat}
                          {...field}
                          {...register('slug')}
                        />
                      </>
                    )}
                  />
                  {!allAttributeLoading && (
                    <Controller
                      control={control}
                      name="Attributes"
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          sx={{
                            gridColumn: '1/3',
                          }}>
                          <Autocomplete
                            {...register('Attributes')}
                            value={autocompleteAttr}
                            multiple
                            options={allAttributeData.getAllAttribute}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            {...field}
                            isOptionEqualToValue={(option, value) =>
                              option._id == value._id
                            }
                            onChange={(e, data, reason, detail) => {
                              const attrIds = data.map((attr) => ({
                                _id: attr._id,
                                name: attr.name,
                              }));
                              setAutocompleteAttr(attrIds);
                              setValue('Attributes', attrIds);
                            }}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.name}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Аттрибуты по умолчанию"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={
                                  errors?.Attributes?.message !== undefined
                                }
                                helperText={errors?.Attributes?.message}
                              />
                            )}
                          />
                        </FormControl>
                      )}
                      onChange={([, data]) => data}
                    />
                  )}

                  {!allSpecLoading && (
                    <Controller
                      control={control}
                      name="Specs"
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          sx={{
                            gridColumn: '1/3',
                          }}>
                          <Autocomplete
                            {...register('Specs')}
                            value={autocompleteSpec}
                            multiple
                            options={allSpecData.getAllSpec}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            {...field}
                            isOptionEqualToValue={(option, value) =>
                              option._id == value._id
                            }
                            onChange={(e, data) => {
                              const specIds = data.map((spec) => ({
                                _id: spec._id,
                                name: spec.name,
                              }));
                              setAutocompleteSpec(specIds);
                              setValue('Specs', specIds);
                            }}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.name}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Характеристики по умолчанию"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                error={errors?.Specs?.message !== undefined}
                                helperText={errors?.Specs?.message}
                              />
                            )}
                          />
                        </FormControl>
                      )}
                      onChange={([, data]) => data}
                    />
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid}
                    sx={{
                      gridColumn: '1/3',
                    }}>
                    {activeCategory ? 'Сохранить' : 'Добавить'}
                  </Button>
                </Box>
              </form>
            </Box>
            {!allCategoryLoading && (
              <TableContainer
                component={Paper}
                sx={{
                  mt: '40px',
                  [theme.breakpoints.down('sm')]: {
                    mt: 0,
                  },
                }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Название</TableCell>
                      <TableCell align="right">Слаг</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCategoryData?.getAllCategory?.map((category) => (
                      <TableRow
                        onClick={(event) =>
                          handleTableRowClick(event, category)
                        }
                        selected={category._id === activeCategory?._id}
                        key={category._id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}>
                        <TableCell component="th" scope="row">
                          {category.name}
                        </TableCell>
                        <TableCell align="right">{category.slug}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {openDelete ? (
              <AlertDelete
                open={openDelete}
                handleClose={handleToggleDelete}
                title={'Категория будет удалена'}
                text={'Будет удалена категория и все товары связанные с ней'}
                handleDelete={handleDeleteCategoryClick}
              />
            ) : null}
          </ModalBox>
          {visibleOverlay && <Overlay />}
        </>
      </Modal>
    </>
  );
};

export default withSnackbar(CategoryModal);
