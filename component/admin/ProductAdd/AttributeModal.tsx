import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  Modal,
  ModalUnstyled,
  Paper,
  styled,
  Switch,
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
  CREATE_ATTRIBUTE_OPTION_IN_ATTRIBUTE,
  CREATE_ATTRIBUTE_WITH_OPTIONS,
  DELETE_ATTRIBUTE_OPTION,
  UPDATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE_OPTION,
} from '../../../graphql/mutation/attribute';
import {
  GET_ALL_ATTRIBUTE,
  GET_ATTRIBUTE,
} from '../../../graphql/query/attribute';
import { ModalBox } from '../ModalBox';
import { CheckCircle, CheckOutlined, Close, Delete } from '@mui/icons-material';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import translate from 'translate';
import slugify from 'slugify';
import translationToSlug from '../../../utils/translateToSlug';
type Props = {
  open: boolean;
  handleClose();
};

type IFormType = {
  attribute: {
    name: string;
    slug: string;
  };
  attributeOption: {
    label: string;
    slug: string;
    subLabel: string;
    defaultPrice: number;
    defaultChecked: boolean;
  };
};

const AttributeOptionList = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  gridGap: '10px',
  flexWrap: 'wrap',
  width: '100%',
}));

const AttributOption = styled(Box)<{ active: boolean }>(
  ({ theme, active }) => ({
    cursor: 'default',
    display: 'flex',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    borderRadius: '5px',
    border: `2px solid ${theme.palette.grey[400]}`,
    padding: '4px',
    ...(active && {
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    }),
  }),
);
const AttributeOptionLabel = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontWeight: '600',
}));
const AttributeOptionChecked = styled(Box)(({ theme }) => ({
  display: 'block',

  borderRadius: '50%',
  width: '10px',
  height: '10px',
  backgroundColor: theme.palette.grey[400],
  marginLeft: '6px',
  marginBottom: '2px',
}));

const AttributeModal: React.FC<Props> = ({ open, handleClose }) => {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    resetField,
    register,
    formState: { isValid, errors, isDirty },
    setValue,
    getValues,
  } = useForm<IFormType>({
    mode: 'onChange',
    defaultValues: {
      attributeOption: {
        label: '',
        slug: '',
        subLabel: '',
        defaultPrice: '',
        defaultChecked: false,
      },
      attribute: { name: '', slug: '' },
    },
  });
  const [activeAttribute, setActiveAttribute] = useState(null);
  const [activeAttributeOption, setActiveAttributeOption] = useState(null);
  const [disabledAttrSlug, setDisabledAttrSlug] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [newAttribute] = useMutation(CREATE_ATTRIBUTE_WITH_OPTIONS);
  const [newAttributeOption] = useMutation(
    CREATE_ATTRIBUTE_OPTION_IN_ATTRIBUTE,
  );
  const [updateAttributeOption] = useMutation(UPDATE_ATTRIBUTE_OPTION);
  const [updateAttribute] = useMutation(UPDATE_ATTRIBUTE);
  const [deleteAttributeOption] = useMutation(DELETE_ATTRIBUTE_OPTION);

  // ATTRIBUTE SLUG
  const [disabledSlugField, setDisabledSlugField] = useState(false);
  const [typingLabelField, setTypingLabelField] = useState('');
  const [typingLabelAttrField, setTypingLabelAttrField] = useState('');
  useEffect(() => {
    const timer = translationToSlug(
      'attributeOption.label',
      'attributeOption.slug',
      getValues,
      setValue,
      setDisabledSlugField,
    );

    return () => clearTimeout(timer);
  }, [typingLabelField]);

  useEffect(() => {
    const timer = translationToSlug(
      'attribute.name',
      'attribute.slug',
      getValues,
      setValue,
      setDisabledAttrSlug,
    );
    return () => clearTimeout(timer);
  }, [typingLabelAttrField]);

  const {
    data: allAttributeData,
    loading: allAttributeLoading,
    error: allAttributeError,
    refetch: allAttributeRefetch,
  } = useQuery(GET_ALL_ATTRIBUTE);
  const [
    getAttribute,
    {
      data: attributeData,
      loading: attributeLoading,
      error: attributeError,
      refetch: attributeRefetch,
    },
  ] = useLazyQuery(GET_ATTRIBUTE);

  useEffect(() => {
    if (activeAttribute) {
      setValue('attribute.name', activeAttribute.name, {
        shouldValidate: true,
      });
      setValue('attribute.slug', activeAttribute.slug, {
        shouldValidate: true,
      });
    } else {
      reset();
    }
  }, [activeAttribute]);

  useEffect(() => {
    if (activeAttributeOption) {
      setValue('attributeOption.label', activeAttributeOption?.label, {
        shouldValidate: true,
      });
      setValue('attributeOption.slug', activeAttributeOption?.slug, {
        shouldValidate: true,
      });
      setValue('attributeOption.subLabel', activeAttributeOption?.subLabel, {
        shouldValidate: true,
      });
      setValue(
        'attributeOption.defaultPrice',
        activeAttributeOption?.defaultPrice ?? '',
      );
      setValue(
        'attributeOption.defaultChecked',
        activeAttributeOption?.defaultChecked,
      );
    } else {
      resetField('attributeOption.label');
      resetField('attributeOption.slug');
      resetField('attributeOption.subLabel');
      resetField('attributeOption.defaultPrice');
      setValue('attributeOption.defaultPrice', '');
      resetField('attributeOption.defaultChecked');
    }
    checkFormChange();
  }, [activeAttributeOption]);

  const onSubmit = (data: IFormType) => {
    console.log('Form submited', data);
    if (checkFormChange()) {
      return;
    }
    if (!activeAttribute && !activeAttributeOption) {
      newAttribute({
        variables: {
          attr: data.attribute,
          attrOpt: {
            ...data.attributeOption,
            defaultPrice: parseInt(data.attributeOption.defaultPrice),
          },
        },
      }).then(() => {
        allAttributeRefetch();
        reset();
      });
    }
    if (activeAttribute && !activeAttributeOption) {
      newAttributeOption({
        variables: {
          attrId: activeAttribute._id,
          attrOpt: {
            ...data.attributeOption,
            defaultPrice: parseInt(data.attributeOption.defaultPrice),
          },
        },
      }).then(() => {
        allAttributeRefetch();
        reset();
      });
    }

    if (activeAttribute && activeAttributeOption) {
      updateAttributeOption({
        variables: {
          attrOptId: activeAttributeOption._id,
          newAttrOpt: {
            ...data.attributeOption,
            defaultPrice: parseInt(data.attributeOption.defaultPrice),
          },
        },
      }).then(() => {
        allAttributeRefetch();
      });
    }
    checkFormChange();
  };

  const checkFormChange = (): boolean => {
    if (activeAttributeOption === null) {
      setIsFormChanged(false);
      return false;
    }
    const newFormData = getValues().attributeOption;
    const oldFormData = _.omit(activeAttributeOption, ['_id', '__typename']);
    const isFormDataChanged = _.isEqual(newFormData, oldFormData);
    setIsFormChanged(isFormDataChanged);
    return isFormDataChanged;
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <ModalBox
          sx={{
            overflowY: 'scroll',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
            }}>
            <Typography variant="h6" component="h2" sx={{ display: 'block' }}>
              {activeAttribute !== null
                ? `Изменить аттрибут '${activeAttribute.name}'`
                : 'Добавить аттрибут'}
            </Typography>
            {activeAttribute !== null ? (
              <IconButton
                sx={{ p: 0, ml: 1 }}
                onClick={() => {
                  setActiveAttribute(null), setActiveAttributeOption(null);
                }}>
                <Close />
              </IconButton>
            ) : (
              ''
            )}
          </Box>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            onBlur={() => checkFormChange()}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,1fr)',
                gridGap: '10px',
              }}>
              <Controller
                control={control}
                name="attribute.name"
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
                      error={errors?.attribute?.name?.message !== undefined}
                      helperText={errors?.attribute?.name?.message}
                      {...field}
                      {...register('attribute.name')}
                      onChange={(e) => {
                        setTypingLabelAttrField(e.target.value);
                        setDisabledAttrSlug(true);
                        field.onChange(e.target.value);
                      }}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="attribute.slug"
                rules={{
                  required: { value: true, message: 'Обязательное поле' },
                }}
                render={({ field }) => (
                  <>
                    <TextField
                      disabled={disabledAttrSlug}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Псевдоним"
                      error={errors?.attribute?.slug?.message !== undefined}
                      helperText={errors?.attribute?.slug?.message}
                      {...field}
                      {...register('attribute.slug')}
                    />
                  </>
                )}
              />
              {activeAttribute && (
                <Button
                  disabled={errors?.attribute?.name || errors?.attribute?.slug}
                  onClick={() => {
                    console.log(getValues('attribute'));

                    updateAttribute({
                      variables: {
                        updAttr: {
                          _id: activeAttribute._id,
                          name: getValues('attribute.name'),
                          slug: getValues('attribute.slug'),
                        },
                      },
                    }).then(() => {
                      allAttributeRefetch();
                      reset();
                      setActiveAttribute(null);
                    });
                  }}>
                  Сохранить
                </Button>
              )}
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ display: 'block' }}>
                  {activeAttributeOption !== null
                    ? `Изменить опцию '${activeAttributeOption.label}'`
                    : 'Добавить опцию'}
                </Typography>
                {activeAttributeOption !== null ? (
                  <>
                    <IconButton
                      sx={{ p: 0, ml: 1 }}
                      onClick={() => {
                        setActiveAttributeOption(null);
                      }}>
                      <Close />
                    </IconButton>
                    <IconButton
                      sx={{ p: 0, ml: 1 }}
                      onClick={() => {
                        deleteAttributeOption({
                          variables: { attrOptId: activeAttributeOption._id },
                        }).then(() => {
                          setActiveAttributeOption(null);
                          allAttributeRefetch();
                        });
                      }}>
                      <Delete />
                    </IconButton>
                  </>
                ) : (
                  ''
                )}
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gridGap: '10px',
                }}>
                <Controller
                  control={control}
                  name={'attributeOption.label'}
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
                        error={
                          errors?.attributeOption?.label?.message !== undefined
                        }
                        helperText={errors?.attributeOption?.label?.message}
                        {...field}
                        {...register('attributeOption.label')}
                        onChange={(e) => {
                          setTypingLabelField(e.target.value);
                          setDisabledSlugField(true);
                          field.onChange(e.target.value);
                        }}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name={'attributeOption.slug'}
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                  }}
                  render={({ field }) => (
                    <>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={disabledSlugField}
                        label="Слаг"
                        error={
                          errors?.attributeOption?.slug?.message !== undefined
                        }
                        helperText={errors?.attributeOption?.slug?.message}
                        {...field}
                        {...register('attributeOption.slug')}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name={'attributeOption.subLabel'}
                  rules={{
                    required: false,
                  }}
                  render={({ field }) => (
                    <>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Доп.текст"
                        error={
                          errors?.attributeOption?.subLabel?.message !==
                          undefined
                        }
                        helperText={errors?.attributeOption?.subLabel?.message}
                        {...field}
                        {...register('attributeOption.subLabel')}
                      />
                    </>
                  )}
                />
                <Controller
                  name={'attributeOption.defaultPrice'}
                  control={control}
                  rules={{
                    required: false,
                    min: { value: 1, message: 'Мин. цена - 1₽' },
                    max: { value: 999999, message: 'Макс. цена - 999 999₽' },
                  }}
                  render={({ field }) => (
                    <NumberFormat
                      customInput={TextField}
                      {...field}
                      error={
                        errors?.attributeOption?.defaultPrice?.message !==
                        undefined
                      }
                      helperText={
                        errors?.attributeOption?.defaultPrice?.message
                      }
                      label="Стоимость"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      thousandSeparator={' '}
                      prefix={'₽ '}
                      onValueChange={(v) => {
                        setValue('attributeOption.defaultPrice', v.floatValue);
                      }}
                      {...register('attributeOption.defaultPrice')}
                    />
                  )}
                />
                <FormControlLabel
                  control={
                    <Controller
                      name="attributeOption.defaultChecked"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          onChange={(e) => field.onChange(e.target.checked)}
                          checked={field.value}
                        />
                      )}
                    />
                  }
                  label="Выбран по умолчанию"
                />
              </Box>
            </Box>

            <Button type="submit" disabled={!isValid || isFormChanged}>
              {activeAttributeOption ? 'Сохранить' : 'Добавить'}
            </Button>
          </form>
          {!allAttributeLoading && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Название</TableCell>
                    <TableCell align="center">Слаг</TableCell>
                    <TableCell align="center">Опции</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allAttributeData.getAllAttribute.map((attribute) => (
                    <TableRow
                      onClick={(event) => {
                        setActiveAttribute(attribute);
                        setActiveAttributeOption(null);
                      }}
                      selected={attribute._id === activeAttribute?._id}
                      key={attribute._id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell component="th" scope="row" align="left">
                        {attribute.name}
                      </TableCell>
                      <TableCell align="left">{attribute.slug}</TableCell>
                      <TableCell align="left">
                        <AttributeOptionList>
                          {attribute.AttributeOptions.map((option) => (
                            <AttributOption
                              key={option._id}
                              onClick={(event) => {
                                event.stopPropagation();
                                setActiveAttribute(attribute);
                                setActiveAttributeOption(option);
                              }}
                              active={
                                option._id === activeAttributeOption?._id
                              }>
                              <AttributeOptionLabel variant="caption">
                                {option.label}
                              </AttributeOptionLabel>
                              {option.defaultChecked && (
                                <AttributeOptionChecked></AttributeOptionChecked>
                              )}
                            </AttributOption>
                          ))}
                        </AttributeOptionList>
                      </TableCell>
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

export default AttributeModal;
