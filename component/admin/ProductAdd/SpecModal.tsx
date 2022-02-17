import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  ModalUnstyled,
  Paper,
  Radio,
  RadioGroup,
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
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_SPEC, DELETE_SPEC } from '../../../graphql/mutation/spec';
import { GET_ALL_SPEC, GET_SPEC } from '../../../graphql/query/spec';
import { ModalBox } from '../ModalBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GET_ALL_ATTRIBUTE } from '../../../graphql/query/attribute';
import _ from 'lodash';
import { Add, Close, Delete } from '@mui/icons-material';
import translationToSlug from '../../../utils/translateToSlug';
import SubTableModal from './SubTableModal';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  open: boolean;
  handleClose();
};

type IFormType = {
  spec: {
    name: string;
    slug: string;
    type: string;
  };
  specOption: Array<{
    name: string;
    slug: string;
  }>;
  specExtraTextAfter: Array<{
    name: string;
    slug: string;
    type: string;
  }>;
  specExtraTextBefore: Array<{
    name: string;
    slug: string;
    type: string;
  }>;
};

const SpecModal: React.FC<Props> = ({ open, handleClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isValid, errors },
    setValue,
    getValues,
    setError,
    clearErrors,
    watch,
    setFocus,
    trigger,
  } = useForm<IFormType>({
    mode: 'onBlur',
    defaultValues: {
      spec: { name: '', slug: '', type: 'string' },
      specOption: [],
      specExtraTextAfter: [],
      specExtraTextBefore: [],
    },
  });
  const [activeSpec, setActiveSpec] = useState(null);
  const [newSpec] = useMutation(CREATE_SPEC);
  const [typingNameCat, setTypingNameCat] = useState('');
  const [isNumber, setIsNumber] = useState(false);
  const [disabledSlugCat, setDisabledSlugCat] = useState(false);
  const specOptionFieldArray = useFieldArray({
    name: 'specOption',
    control,
  });
  const specExtraTextAfterFieldArray = useFieldArray({
    name: 'specExtraTextAfter',
    control,
  });
  const specExtraTextBeforeFieldArray = useFieldArray({
    name: 'specExtraTextBefore',
    control,
  });
  const [deleteSpec] = useMutation(DELETE_SPEC);
  // const [autocompleteAttr, setAutocompleteAttr] = useState([]);
  const {
    data: allSpecData,
    loading: allSpecLoading,
    error: allSpecError,
    refetch: allSpecRefetch,
  } = useQuery(GET_ALL_SPEC);
  const [
    getSpec,
    {
      data: specData,
      loading: specLoading,
      error: specError,
      refetch: specRefetch,
    },
  ] = useLazyQuery(GET_SPEC);

  const handleTableRowClick = (event, spec) => {
    if (spec._id !== activeSpec?._id) {
      setActiveSpec(spec);
      getSpec({
        variables: {
          specId: spec._id,
        },
      })
        .then((resault) => {
          const data = resault.data.getSpec;
          setValue('spec.name', data.name, {
            shouldValidate: true,
          });
          setValue('spec.slug', data.slug, {
            shouldValidate: true,
          });
          setValue('spec.type', data.type, {
            shouldValidate: true,
          });
          setValue('specOption', data.SpecOptions, {
            shouldValidate: true,
          });
          setValue(
            'specExtraTextAfter',
            data.SpecExtraTexts.filter(
              (specAfter) => specAfter.type === 'after',
            ),
            {
              shouldValidate: true,
            },
          );
          setValue(
            'specExtraTextBefore',
            data.SpecExtraTexts.filter(
              (specBefore) => specBefore.type === 'before',
            ),
            {
              shouldValidate: true,
            },
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!activeSpec) reset();
  }, [activeSpec]);

  const onSubmit = (data: IFormType) => {
    console.log('Submit data ', data);

    newSpec({
      variables: {
        spec: data.spec,
        specOpts: data?.specOption && data?.specOption,
        specExtraAfter:
          data?.specExtraTextAfter &&
          data?.specExtraTextAfter?.map((el) => ({
            ...el,
            type: 'after',
          })),
        specExtraBefore:
          data?.specExtraTextBefore &&
          data?.specExtraTextBefore?.map((el) => ({
            ...el,
            type: 'before',
          })),
      },
    })
      .then(() => {
        reset();
        console.log('SUCCESS SUBMIT');
        allSpecRefetch();
      })
      .catch((err) => {
        console.log('ERROR SUBMIT');
        console.log(err.message);

        console.log(JSON.stringify(err, null, 2));
      });
  };

  useEffect(() => {
    const timer = translationToSlug(
      'spec.name',
      'spec.slug',
      getValues,
      setValue,
      setDisabledSlugCat,
    );
    return () => clearTimeout(timer);
  }, [typingNameCat]);

  const handleDeleteSpecClick = (e) => {
    deleteSpec({
      variables: {
        specId: activeSpec._id,
      },
    })
      .then(() => {
        allSpecRefetch();
        setActiveSpec(null);
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
              {activeSpec
                ? `Изменить характеристку '${activeSpec.name}'`
                : 'Добавить характеристку'}
            </Typography>
            {activeSpec !== null ? (
              <>
                <IconButton
                  sx={{ p: 0, ml: 1 }}
                  onClick={() => {
                    setActiveSpec(null);
                  }}>
                  <Close />
                </IconButton>
                <IconButton
                  sx={{ p: 0, ml: 1 }}
                  onClick={() => {
                    handleDeleteSpecClick();
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
              name="spec.name"
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
                    error={errors?.spec?.name?.message !== undefined}
                    helperText={errors?.spec?.name?.message}
                    {...field}
                    {...register('spec.name')}
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
              name="spec.slug"
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
                    error={errors?.spec?.slug?.message !== undefined}
                    helperText={errors?.spec?.slug?.message}
                    disabled={disabledSlugCat}
                    {...field}
                    {...register('spec.slug')}
                  />
                </>
              )}
            />
            <FormControl component="fieldset">
              <Controller
                control={control}
                name="spec.type"
                render={({ field }) => (
                  <>
                    <RadioGroup
                      defaultValue="string"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setIsNumber(e.target.value === 'number');
                      }}>
                      <FormControlLabel
                        value="string"
                        control={<Radio />}
                        label="Строка"
                      />
                      <FormControlLabel
                        value="number"
                        control={<Radio />}
                        label="Число"
                      />
                    </RadioGroup>
                  </>
                )}
              />{' '}
            </FormControl>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
              }}>
              <SubTableModal
                title={'Префикс'}
                isNumber={isNumber}
                parent={'specExtraTextAfter'}
                firstChild={'name'}
                secondChild={'slug'}
                fieldArray={specExtraTextAfterFieldArray}
              />
              <SubTableModal
                title={'Значения'}
                isNumber={isNumber}
                parent={'specOption'}
                firstChild={'name'}
                secondChild={'slug'}
                fieldArray={specOptionFieldArray}
                errorForm={{
                  trigger: trigger,
                  clearErrors: clearErrors,
                  watch: watch,
                  errors: errors,
                  setError: setError,
                }}
              />
              <SubTableModal
                title={'Постфикс'}
                isNumber={isNumber}
                parent={'specExtraTextBefore'}
                firstChild={'name'}
                secondChild={'slug'}
                fieldArray={specExtraTextBeforeFieldArray}
              />
            </Box>

            <Button type="submit" disabled={!isValid}>
              {activeSpec ? 'Сохранить' : 'Добавить'}
            </Button>
          </form>
          {!allSpecLoading && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Название</TableCell>
                    <TableCell align="right">Слаг</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allSpecData.getAllSpec.map((spec) => (
                    <TableRow
                      onClick={(event) => handleTableRowClick(event, spec)}
                      selected={spec._id === activeSpec?._id}
                      key={spec._id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        {spec.name}
                      </TableCell>
                      <TableCell align="right">{spec.slug}</TableCell>
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

export default SpecModal;
