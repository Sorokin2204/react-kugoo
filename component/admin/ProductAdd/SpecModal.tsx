import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Close, Delete } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  Paper,
  Radio,
  RadioGroup,
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
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  CREATE_SPEC,
  DELETE_SPEC,
  UPDATE_SPEC,
} from '../../../graphql/mutation/spec';
import { GET_ALL_SPEC, GET_SPEC } from '../../../graphql/query/spec';
import { withSnackbar } from '../../../hooks/useAlert';
import useModal from '../../../hooks/useModal';
import translationToSlug from '../../../utils/translateToSlug';
import AlertDelete from '../AlertDelete';
import { ModalBox } from '../ModalBox';
import Overlay from '../Overlay';
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

const SpecModal: React.FC<Props> = ({
  open,
  handleClose,
  snackbarShowMessage,
}) => {
  // MUTATIONS
  const [newSpec] = useMutation(CREATE_SPEC);
  const [updateSpec] = useMutation(UPDATE_SPEC);
  const [deleteSpec] = useMutation(DELETE_SPEC);
  // QUERIES
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
  // STATES
  const theme = useTheme();
  const [openDelete, handleToggleDelete] = useModal();
  const [activeSpec, setActiveSpec] = useState(null);
  const [typingNameCat, setTypingNameCat] = useState('');
  const [visibleOverlay, setVisibleOverlay] = useState<boolean>(false);
  const [isNumber, setIsNumber] = useState(false);
  const [disabledSlugCat, setDisabledSlugCat] = useState(false);
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
  const specOptionFieldArray = useFieldArray({
    name: 'specOption',
    control,
  });
  // EFFECTS
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

  useEffect(() => {
    allSpecRefetch();
  }, []);

  useEffect(() => {
    if (!activeSpec) reset();
  }, [activeSpec]);
  // FUNCTIONS
  const handleTableRowClick = (event, spec) => {
    if (spec._id !== activeSpec?._id) {
      setVisibleOverlay(true);
      setActiveSpec(spec);
      getSpec({
        variables: {
          specId: spec._id,
        },
      })
        .then((resault) => {
          setVisibleOverlay(false);
          const data = resault.data.getSpec;
          setValue('spec._id', data._id, {
            shouldValidate: true,
          });
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

  const onSubmit = (data: IFormType) => {
    if (activeSpec) {
      setVisibleOverlay(true);
      let newSpecArr = [];
      let updateSpecArr = [];
      let deleteSpecArr = [];
      data.specOption.map((specOpt) => {
        if (specOpt.isDelete && !specOpt.isNew) deleteSpecArr.push(specOpt._id);
        if (!specOpt.isDelete && specOpt.newSlug && specOpt.newName)
          updateSpecArr.push({
            _id: specOpt._id,
            name: specOpt.newName,
            slug: specOpt.newSlug,
          });
        if (!specOpt.isDelete && specOpt.isNew)
          newSpecArr.push({
            name: specOpt.name,
            slug: specOpt.slug,
          });
      });

      updateSpec({
        variables: {
          updSpec: data.spec,
          newOpts: newSpecArr,
          updOpts: updateSpecArr,
          deleteIdOpts: deleteSpecArr,
        },
      })
        .then((dataSucc) => {
          setVisibleOverlay(false);
          snackbarShowMessage(`Характеристика обновлена успешно`),
            allSpecRefetch();
          setActiveSpec(null);
          reset();
        })
        .catch((err) => console.log(JSON.stringify(err, null, 2)));
    } else {
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
          setVisibleOverlay(false);
          snackbarShowMessage(`Характеристика добавлена успешно`), reset();
          allSpecRefetch();
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }
  };

  const handleDeleteSpecClick = () => {
    setVisibleOverlay(true);
    deleteSpec({
      variables: {
        specId: activeSpec._id,
      },
    })
      .then(() => {
        setVisibleOverlay(false);
        snackbarShowMessage(
          `Характеристика удалена успешно`,
          'error',
          2000,
          <Delete />,
        ),
          allSpecRefetch();
        setActiveSpec(null);
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
              display: 'grid',
              gridTemplateRows: 'min-content 1fr 40px',

              gridTemplateColumns: '1fr 1fr',
              gridGap: '20px',
              overflowY: 'scroll',
              [theme.breakpoints.down('sm')]: {
                gridTemplateRows:
                  'min-content auto minmax(min-content, auto) 40px',
              },
            }}>
            <IconButton
              sx={{ p: 0, position: 'absolute', top: 15, right: 15 }}
              onClick={handleClose}>
              <Close sx={{ fontSize: '30px' }} />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 'min-content',
                gridColumn: '1/2',
                gridRow: '1/2',
                [theme.breakpoints.down('sm')]: {
                  alignItems: 'flex-end',
                  gridColumn: '1/3',
                },
              }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  display: 'block',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '18px !important',
                  },
                }}>
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
                    sx={{ p: 0, ml: 1, color: theme.palette.error.main }}
                    onClick={handleToggleDelete}>
                    <Delete />
                  </IconButton>
                </>
              ) : (
                ''
              )}
            </Box>
            <Box
              sx={{
                gridColumn: '1/2',
                gridRow: '2/3',
                [theme.breakpoints.down('sm')]: {
                  gridColumn: '1/3',
                },
              }}>
              <form
                autoComplete="off"
                style={{
                  height: '100%',
                  display: 'grid',
                  gridTemplateRows: 'auto auto 1fr',
                  gridGap: '10px',
                }}>
                <Controller
                  control={control}
                  name="spec.name"
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                  }}
                  render={({ field }) => (
                    <>
                      <TextField
                        sx={{
                          gridRow: '1/2',
                          gridColumn: '1/2',
                        }}
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
                        sx={{
                          gridRow: '2/3',
                          gridColumn: '1/2',
                        }}
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
                <FormControl
                  component="fieldset"
                  sx={{
                    gridRow: '1/3',
                    gridColumn: '2/3',
                  }}>
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
                  />
                </FormControl>
                <Box
                  sx={{
                    gridColumn: '1/3',
                    gridRow: '3/4',
                  }}>
                  <SubTableModal
                    title={'Новая опция'}
                    isNumber={isNumber}
                    parent={'specOption'}
                    firstChild={'name'}
                    secondChild={'slug'}
                    fieldArray={specOptionFieldArray}
                    setValue={setValue}
                    activeSpec={activeSpec}
                    errorForm={{
                      trigger: trigger,
                      clearErrors: clearErrors,
                      watch: watch,
                      errors: errors,
                      setError: setError,
                    }}
                  />
                </Box>
              </form>
            </Box>
            {!allSpecLoading && (
              <TableContainer
                component={Paper}
                sx={{
                  gridColumn: '2/3',
                  gridRow: '1/3',
                  mt: '40px',
                  [theme.breakpoints.down('sm')]: {
                    gridRow: '3/4',
                    gridColumn: '1/3',
                    mt: '10px',
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

            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              disabled={!isValid}
              sx={{
                gridColumn: '1/3',
                gridRow: '3/4',

                [theme.breakpoints.down('sm')]: {
                  gridRow: '4/5',
                },
              }}>
              {activeSpec ? 'Сохранить' : 'Добавить'}
            </Button>
            {openDelete ? (
              <AlertDelete
                open={openDelete}
                handleClose={handleToggleDelete}
                title={'Характеристика будет удалена'}
                text={'Будет удалена характеристика и все связанные опции'}
                handleDelete={handleDeleteSpecClick}
              />
            ) : null}
          </ModalBox>
          {visibleOverlay && (
            <Overlay
              sx={{ height: '100vh !important', position: 'fixed !important' }}
            />
          )}
        </>
      </Modal>
    </>
  );
};

export default withSnackbar(SpecModal);
