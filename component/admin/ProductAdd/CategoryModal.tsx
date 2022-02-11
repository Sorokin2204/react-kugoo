import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
import { CREATE_CATEGORY } from '../../../graphql/mutation/category';
import {
  GET_ALL_CATEGORY,
  GET_CATEGORY,
} from '../../../graphql/query/category';
import { ModalBox } from '../ModalBox';

type Props = {
  open: boolean;
  handleClose();
};

const style = {};

type IFormType = {
  name: string;
  slug: string;
};

const CategoryModal: React.FC<Props> = ({ open, handleClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isValid, errors },
    setValue,
  } = useForm<IFormType>({ mode: 'onBlur' });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newCategory] = useMutation(CREATE_CATEGORY);
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

  useEffect(() => {}, []);

  const handleTableRowClick = (event, categoryId) => {
    if (categoryId !== activeCategory) {
      setActiveCategory(categoryId);
      getCategory({
        variables: {
          id: categoryId,
        },
      }).then((resault) => {
        setValue('name', resault.data.getCategory.name, {
          shouldValidate: true,
        });
        setValue('slug', resault.data.getCategory.slug, {
          shouldValidate: true,
        });
      });
    }
  };

  const onSubmit = (data: IFormType) => {
    newCategory({
      variables: {
        input: data,
      },
    }).then(() => {
      allCategoryRefetch();
    });

    reset();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <ModalBox>
          <Typography variant="h6" component="h2">
            Добавить категорию
          </Typography>
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
                    {...field}
                    {...register('slug')}
                  />
                </>
              )}
            />
            <Button type="submit" disabled={!isValid}>
              Добавить
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
                  {allCategoryData.getAllCategory.map((category) => (
                    <TableRow
                      onClick={(event) =>
                        handleTableRowClick(event, category.id)
                      }
                      selected={category.id === activeCategory}
                      key={category.id}
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
