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
import { CREATE_CATEGORY } from '../../../graphql/mutation/spec';
import { GET_ALL_CATEGORY, GET_CATEGORY } from '../../../graphql/query/spec';
import { ModalBox } from '../ModalBox';

type Props = {
  open: boolean;
  handleClose();
};

type IFormType = {
  name: string;
  slug: string;
};

const SpecModal: React.FC<Props> = ({ open, handleClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isValid, errors },
    setValue,
  } = useForm<IFormType>({ mode: 'onBlur' });
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  const [newSpec] = useMutation(CREATE_SPEC);
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
  ] = useLazyQuery(GET_CATEGORY);

  useEffect(() => {}, []);

  const handleTableRowClick = (event, specId) => {
    if (specId !== activeSpec) {
      setActiveSpec(specId);
      getSpec({
        variables: {
          id: specId,
        },
      }).then((resault) => {
        setValue('name', resault.data.getSpec.name, {
          shouldValidate: true,
        });
        setValue('slug', resault.data.getSpec.slug, {
          shouldValidate: true,
        });
      });
    }
  };

  const onSubmit = (data: IFormType) => {
    newSpec({
      variables: {
        input: data,
      },
    }).then(() => {
      allSpecRefetch();
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
        </ModalBox>
      </Modal>
    </>
  );
};

export default SpecModal;
