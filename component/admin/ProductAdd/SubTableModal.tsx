import {
  Add,
  Close,
  Delete,
  RestartAltOutlined,
  Save,
} from '@mui/icons-material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { FieldArray } from 'react-hook-form';
import slugify from 'slugify';
import { createObjectId } from '../../../utils/createObjectId';
type Props = {
  firstChild: string;
  secondChild: string;
  fieldArray: FieldArray;
  title: string;
  isNumber?: boolean;
  parent: string;
  errorForm?: object;
  activeSpec: object;
};

const SubTableModal: React.FC<Props> = ({
  parent,
  firstChild,
  secondChild,
  fieldArray,
  title,
  isNumber = false,
  activeSpec,
  errorForm,
}) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [disabledSlug, setDisabledSlug] = useState(false);
  const [activeSpecOption, setActiveSpecOption] = useState(null);
  const fieldArrayMemo = useMemo(
    () => renderTableRows(),
    [fieldArray, activeSpecOption],
  );

  const fieldArrayWatch = errorForm?.watch(parent);
  const specType = errorForm?.watch('spec.type');

  useEffect(() => {
    if (errorForm) {
      if (isNumber) {
        const isNanIndex = fieldArray.fields.findIndex((field) =>
          isNaN(field.name),
        );
        if (isNanIndex !== -1) {
          errorForm.setError(parent, {
            type: 'manual',
            message: 'Это не число',
          });
        }
      } else {
        errorForm.clearErrors(parent);
        errorForm.trigger(parent);
      }
    }
  }, [fieldArrayWatch, specType]);

  const addAfterText = () => {
    fieldArray.append({
      _id: createObjectId(),
      [firstChild]: name,
      [secondChild]: slug,
      ...(activeSpec && {
        isNew: true,
      }),
    });
    setActiveSpecOption(null);
    setSlug('');
    setName('');
  };

  const addUpdateSpecOpt = () => {
    const indexUpdSpecOpt = fieldArray.fields.findIndex(
      (field) => field._id === activeSpecOption._id,
    );
    fieldArray.update(indexUpdSpecOpt, {
      ...activeSpecOption,
      ...(activeSpecOption.isNew
        ? { slug, name }
        : { newName: name, newSlug: slug }),
    });
    setActiveSpecOption(null);
    setName('');
    setSlug('');
  };

  const removeSpecOpt = (specId: string) => {
    setActiveSpecOption(null);
    setName('');
    setSlug('');
    const indexUpdSpecOpt = fieldArray.fields.findIndex(
      (field) => field._id === specId,
    );
    fieldArray.update(indexUpdSpecOpt, {
      ...fieldArray.fields[indexUpdSpecOpt],
      isDelete: true,
    });
  };
  const resetSpecOpt = (specId: string) => {
    setActiveSpecOption(null);
    setName('');
    setSlug('');
    const indexUpdSpecOpt = fieldArray.fields.findIndex(
      (field) => field._id === specId,
    );
    fieldArray.update(indexUpdSpecOpt, {
      ...fieldArray.fields[indexUpdSpecOpt],
      isDelete: false,
    });
  };

  useEffect(() => {
    setActiveSpecOption(null);
    setName('');
    setSlug('');
  }, [activeSpec]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (name) {
        setSlug(slugify(name, { lower: true }));
      } else {
        setSlug('');
      }

      setDisabledSlug(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  function removeAfterText(index: number) {
    fieldArray.remove(index);
  }

  function renderTableRows() {
    return fieldArray?.fields?.map((field, index) => {
      const isIntError = errorForm?.errors?.[parent] && isNaN(field.name);
      return (
        <>
          <TableRow
            key={field.id}
            onClick={() => {
              if (field._id !== activeSpecOption?._id && !field.isDelete) {
                setActiveSpecOption(field);
                if (field.newName && field.newSlug) {
                  setName(field.newName);
                  setSlug(field.newSlug);
                } else {
                  setName(field.name);
                  setSlug(field.slug);
                }
              }
            }}
            selected={activeSpecOption?._id === field?._id}
            sx={(theme) => ({
              ...(field.newName &&
                field.newSlug && {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }),
              ...(field.isNew && {
                backgroundColor: theme.palette.success.main,
                color: theme.palette.common.white,
              }),
              ...(field.isDelete && {
                backgroundColor: `${theme.palette.error.main}`,
                color: theme.palette.common.white,
              }),
            })}>
            <TableCell align="center" sx={{ color: 'inherit' }}>
              <Box sx={{ display: 'inline-block', position: 'relative' }}>
                <Typography
                  sx={(theme) => ({
                    ...(field?.['newSlug'] && {
                      textDecoration: 'line-through',
                      color: theme.palette.grey[300],
                    }),
                  })}
                  variant="t4">
                  {field?.[firstChild]}
                </Typography>
                {field?.['newSlug'] && <br />}
                <Typography variant="t4">{field?.['newName']}</Typography>
                {isIntError && (
                  <ReportGmailerrorredIcon
                    sx={{
                      position: 'absolute',
                      left: '105%',
                      bottom: '1px',
                      color: 'error.main',
                      width: '20px',
                      height: '20px',
                    }}
                  />
                )}
              </Box>
            </TableCell>
            <TableCell align="center" sx={{ color: 'inherit' }}>
              <Typography
                sx={(theme) => ({
                  ...(field?.['newSlug'] && {
                    textDecoration: 'line-through',
                    color: theme.palette.grey[300],
                  }),
                })}
                variant="t4">
                {field?.[secondChild]}
              </Typography>
              {field?.['newSlug'] && <br />}
              <Typography variant="t4">{field?.['newSlug']}</Typography>
            </TableCell>
            <TableCell align="center" sx={{ color: 'inherit' }}>
              {!field.isDelete ? (
                <IconButton
                  sx={{
                    p: 0,
                    color: 'inherit',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeSpec) {
                      removeSpecOpt(field._id);
                    }
                  }}>
                  <Delete
                    sx={{
                      ...(isIntError && {
                        color: 'error.main',
                      }),
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    p: 0,
                    color: 'inherit',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetSpecOpt(field._id);
                  }}>
                  <RestartAltOutlined />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        </>
      );
    });
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        gridGap: '10px',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography
          sx={{ textAlign: 'center', fontWeight: '600' }}
          variant="body1">
          {activeSpecOption
            ? `Изменить опцию "${
                activeSpecOption.newName ?? activeSpecOption.name
              }"`
            : title}
        </Typography>
        {activeSpecOption ? (
          <IconButton
            sx={{ p: 0 }}
            onClick={() => {
              setActiveSpecOption(null);
              setName('');
              setSlug('');
            }}>
            <Close />
          </IconButton>
        ) : (
          ''
        )}
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto',
          gridGap: '10px',
        }}>
        <TextField
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          label="Название"
          value={name}
          onChange={(e) => {
            setDisabledSlug(true);
            setName(e.target.value);
          }}
        />
        <TextField
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          disabled={disabledSlug}
          label="Слаг"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
          }}
        />
        {activeSpecOption ? (
          <IconButton
            sx={{ p: 0 }}
            onClick={addUpdateSpecOpt}
            disabled={!name || !slug}>
            <Save />
          </IconButton>
        ) : (
          <IconButton
            sx={{ p: 0 }}
            onClick={addAfterText}
            disabled={!name || !slug}>
            <Add />
          </IconButton>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Название</TableCell>
              <TableCell align="center">Слаг</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{fieldArrayMemo}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubTableModal;
