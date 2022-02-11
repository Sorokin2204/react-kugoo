import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from '@mui/material';
import HeaderAdmin from '../../component/admin/HeaderAdmin';
import MainWrapper from '../../component/admin/MainWrapper';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/mutation/product';
import { Add, Category } from '@mui/icons-material';
import CategoryModal from '../../component/admin/ProductAdd/CategoryModal';
import { GET_ALL_CATEGORY } from '../../graphql/query/category';
import AttributeModal from '../../component/admin/ProductAdd/AttributeModal';
type Props = {};

interface IFormInput {
  name: string;
  price: number;
  discountPrice: number;
  // image: FileList;
}

const ProductAdmin: React.FC<Props> = ({}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });

  const [newProduct] = useMutation(CREATE_PRODUCT);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const handleSwithCategory = () => setOpenCategory(!openCategory);
  const handleSwithAttribute = () => setOpenAttribute(!openCategory);
  const {
    data: allCategoryData,
    loading: allCategoryLoading,
    error: allCategoryError,
    refetch: allCategoryRefetch,
  } = useQuery(GET_ALL_CATEGORY);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    newProduct({
      variables: {
        input: data,
      },
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <MainWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: 'Поле не должно быть пустым' },
              maxLength: { value: 40, message: 'Не более 40 символов' },
              minLength: { value: 5, message: 'Не менее 5 символов' },
            }}
            render={({ field }) => (
              <>
                <TextField
                  error={errors?.name?.message !== undefined}
                  helperText={errors?.name?.message}
                  label="Название"
                  variant="outlined"
                  {...field}
                />
              </>
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: { value: true, message: 'Поле не должно быть пустым' },
              min: { value: 1, message: 'Мин. цена - 1₽' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                error={errors?.price?.message !== undefined}
                helperText={errors?.price?.message}
                label="Цена"
                variant="outlined"
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
              />
            )}
          />
          <Controller
            name="discountPrice"
            control={control}
            rules={{
              required: false,
              min: { value: 1, message: 'Мин. цена - 1₽' },
              max: { value: 999999, message: 'Макс. цена - 999 999₽' },
            }}
            render={({ field }) => (
              <TextField
                type="number"
                error={errors?.discountPrice?.message !== undefined}
                helperText={errors?.discountPrice?.message}
                label="Акционная цена"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
              />
            )}
          />

          {/* <Controller
            name="image"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files);
                }}
                multiple
              />
            )}
          /> */}

          <Button type="submit" disabled={!isValid}>
            Сохранить
          </Button>
        </form>
        <FormControl fullWidth>
          <InputLabel id="category">Категория</InputLabel>
          <Select labelId="category" label="Категория">
            {!allCategoryLoading &&
              allCategoryData.getAllCategory.map((category) => (
                <MenuItem key={category.id} value={category.slug}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <IconButton
          onClick={handleSwithCategory}
          sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
          <Add />
        </IconButton>
        <IconButton
          onClick={handleSwithAttribute}
          sx={{ backgroundColor: 'primary.main', color: 'common.white' }}>
          <Add />
        </IconButton>
        <CategoryModal open={openCategory} handleClose={handleSwithCategory} />
        <AttributeModal
          open={openAttribute}
          handleClose={handleSwithAttribute}
        />
      </MainWrapper>
    </>
  );
};

export default ProductAdmin;
