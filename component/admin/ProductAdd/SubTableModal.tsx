import React, { useEffect, useMemo, useState } from 'react';
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
import { FieldArray } from 'react-hook-form';
import { Add, Delete } from '@mui/icons-material';
import slugify from 'slugify';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
type Props = {
  firstChild: string;
  secondChild: string;
  fieldArray: FieldArray;
  title: string;
  isNumber?: boolean;
  parent: string;
  errorForm?: object;
};

const SubTableModal: React.FC<Props> = ({
  parent,
  firstChild,
  secondChild,
  fieldArray,
  title,
  isNumber = false,

  errorForm,
}) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [disabledSlug, setDisabledSlug] = useState(false);
  const fieldArrayMemo = useMemo(() => renderTableRows(), [fieldArray]);

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
      [firstChild]: name,
      [secondChild]: slug,
    });
    setSlug('');
    setName('');
  };

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
          <TableRow key={field.id}>
            <TableCell align="center">
              <Box sx={{ display: 'inline-block', position: 'relative' }}>
                {field?.[firstChild]}
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
            <TableCell align="center">{field?.[secondChild]}</TableCell>
            <TableCell align="center">
              <IconButton
                sx={{
                  p: 0,
                }}
                onClick={() => removeAfterText(index)}>
                <Delete
                  sx={{
                    ...(isIntError && {
                      color: 'error.main',
                    }),
                  }}
                />
              </IconButton>
            </TableCell>
          </TableRow>
        </>
      );
    });
  }

  return (
    <Box>
      <Typography
        sx={{ mb: 2, textAlign: 'center', fontWeight: '600' }}
        variant="body1">
        {title}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto' }}>
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

        <IconButton
          sx={{ p: 0 }}
          onClick={addAfterText}
          disabled={!name || !slug}>
          <Add />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
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
