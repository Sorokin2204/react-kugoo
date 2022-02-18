import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Modal,
  ModalUnstyled,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} from '../../../graphql/mutation/category';
import {
  GET_ALL_CATEGORY,
  GET_CATEGORY,
} from '../../../graphql/query/category';
import { ModalBox } from '../ModalBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GET_ALL_ATTRIBUTE } from '../../../graphql/query/attribute';
import _ from 'lodash';
import { Close, Delete } from '@mui/icons-material';
import translationToSlug from '../../../utils/translateToSlug';
import { GET_ALL_SPEC } from '../../../graphql/query/spec';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  open: boolean;
  handleClose();
};

const style = {};

type IFormType = {
  name: string;
  slug: string;
  Attributes: string[];
  Specs: string[];
};

const CategoryModal: React.FC<Props> = ({ open, handleClose }) => {
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
  const [activeCategory, setActiveCategory] = useState(null);
  const [newCategory] = useMutation(CREATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [autocompleteAttr, setAutocompleteAttr] = useState([]);
  const [autocompleteSpec, setAutocompleteSpec] = useState([]);
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

  useEffect(() => {}, []);

  const handleTableRowClick = (event, category) => {
    if (category._id !== activeCategory?._id) {
      setActiveCategory(category);
      getCategory({
        variables: {
          id: category._id,
          withAttrOpts: false,
          withSpecOpts: false,
        },
      })
        .then((resault) => {
          const data = resault.data.getCategory;
          if (data.attributes) {
            const Attribute = data.attributes.edges.map((attr) => ({
              _id: attr.node._id,
              name: attr.node.name,
            }));
            setAutocompleteAttr(Attribute);
          } else {
            setAutocompleteAttr([]);
          }

          if (data.specs) {
            const Spec = data.specs.edges.map((spec) => ({
              _id: spec.node._id,
              name: spec.node.name,
            }));
            setAutocompleteSpec(Spec);
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

  const onSubmit = (data: IFormType) => {
    console.log('Submit data ', data);

    newCategory({
      variables: {
        cat: { name: data.name, slug: data.slug },
        catAttrIds: data.Attributes.map((attr) => attr._id),
        catSpecIds: data.Specs.map((spec) => spec._id),
      },
    })
      .then(() => {
        allCategoryRefetch();
      })
      .catch((err) => console.log(err.message));

    reset();
  };

  const [typingNameCat, setTypingNameCat] = useState('');
  const [disabledSlugCat, setDisabledSlugCat] = useState(false);
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

  const handleDeleteCategoryClick = (e) => {
    deleteCategory({
      variables: {
        catId: activeCategory._id,
      },
    })
      .then(() => {
        allCategoryRefetch();
        setActiveCategory(null);
        reset();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <ModalBox>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
            }}>
            <Typography variant="h6" component="h2" sx={{ display: 'block' }}>
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
                  sx={{ p: 0, ml: 1 }}
                  onClick={() => {
                    handleDeleteCategoryClick();
                  }}>
                  <Delete />
                </IconButton>
              </>
            ) : (
              ''
            )}
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Controller
              control={control}
              name="name"
              rules={{
                required: { value: true, message: 'Обязательное поле' },
              }}
              render={({ field }) => (
                <>
                  <TextField
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
                  <FormControl fullWidth>
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
                      onChange={(e, data) => {
                        const attrIds = data.map((attr) => ({
                          _id: attr._id,
                          name: attr.name,
                        }));
                        setAutocompleteAttr(attrIds);
                        setValue('Attributes', attrIds);
                        // field.onChange(attrIds);
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
                          error={errors?.Attributes?.message !== undefined}
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
                  <FormControl fullWidth>
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

            <Button type="submit" disabled={!isValid}>
              {activeCategory ? 'Сохранить' : 'Добавить'}
            </Button>
          </form>
          {!allCategoryLoading && (
            <TableContainer component={Paper}>
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
                      onClick={(event) => handleTableRowClick(event, category)}
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
        </ModalBox>
      </Modal>
    </>
  );
};

export default CategoryModal;
