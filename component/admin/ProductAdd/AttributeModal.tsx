import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
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
  UPDATE_ATTRIBUTE_OPTION,
} from '../../../graphql/mutation/attribute';
import {
  GET_ALL_ATTRIBUTE,
  GET_ATTRIBUTE,
} from '../../../graphql/query/attribute';
import { ModalBox } from '../ModalBox';
import { CheckCircle, CheckOutlined, Close } from '@mui/icons-material';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
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
}));

const AttributOption = styled(Box)<{ active: boolean }>(
  ({ theme, active }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: `2px solid ${theme.palette.grey[400]}`,
    padding: '4px',
    ...(active && {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
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
    mode: 'onBlur',
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
  const [disabledAttributeField, setDisabledAttributeField] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [newAttribute] = useMutation(CREATE_ATTRIBUTE_WITH_OPTIONS);
  const [newAttributeOption] = useMutation(
    CREATE_ATTRIBUTE_OPTION_IN_ATTRIBUTE,
  );
  const [updateAttributeOption] = useMutation(UPDATE_ATTRIBUTE_OPTION);

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
      setDisabledAttributeField(true);
      setValue('attribute.name', activeAttribute.name, {
        shouldValidate: true,
      });
      setValue('attribute.slug', activeAttribute.slug, {
        shouldValidate: true,
      });
    } else {
      setDisabledAttributeField(false);
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
        <ModalBox>
          <Typography variant="h6" component="h2" sx={{ display: 'inline' }}>
            {activeAttribute !== null
              ? `Изменить аттрибут '${activeAttribute.name}'`
              : 'Добавить аттрибут'}
          </Typography>
          {activeAttribute !== null ? (
            <IconButton
              sx={{ mb: 0.5, p: 0, ml: 1 }}
              onClick={() => {
                setActiveAttribute(null), setActiveAttributeOption(null);
              }}>
              <Close />
            </IconButton>
          ) : (
            ''
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            onBlur={() => checkFormChange()}>
            <Controller
              control={control}
              name="attribute.name"
              rules={{
                required: { value: true, message: 'Обязательное поле' },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={disabledAttributeField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Название"
                    error={errors?.attribute?.name?.message !== undefined}
                    helperText={errors?.attribute?.name?.message}
                    {...field}
                    {...register('attribute.name')}
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
                    disabled={disabledAttributeField}
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
            <Box>
              <Typography
                variant="h6"
                component="h2"
                sx={{ display: 'inline' }}>
                {activeAttributeOption !== null
                  ? `Изменить опцию '${activeAttributeOption.label}'`
                  : 'Добавить опцию'}
              </Typography>
              {activeAttributeOption !== null ? (
                <IconButton
                  sx={{ mb: 0.5, p: 0, ml: 1 }}
                  onClick={() => {
                    setActiveAttributeOption(null);
                  }}>
                  <Close />
                </IconButton>
              ) : (
                ''
              )}
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
                        errors?.attributeOption?.subLabel?.message !== undefined
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
                    helperText={errors?.attributeOption?.defaultPrice?.message}
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

            <Button type="submit" disabled={!isValid || isFormChanged}>
              {activeAttributeOption ? 'Сохранить' : 'Добавить'}
            </Button>
          </form>
          {!allAttributeLoading && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Название</TableCell>
                    <TableCell align="right">Слаг</TableCell>
                    <TableCell align="right">Опции</TableCell>
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
                      <TableCell component="th" scope="row">
                        {attribute.name}
                      </TableCell>
                      <TableCell align="right">{attribute.slug}</TableCell>
                      <TableCell align="right">
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
