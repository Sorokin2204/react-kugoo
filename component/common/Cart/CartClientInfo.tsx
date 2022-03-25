import { Box, styled, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import NumberInputForm from '../../admin/inputs/NumberInputForm';
import TextInputForm from '../../admin/inputs/TextInputForm';
import InputText from '../InputText';

type Props = {
  form: UseFormReturn;
};

const CartGridInput = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gridGap: '20px',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
  rowGap: theme.spacing(20),
}));
const InputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const CartClientInfo: React.FC<Props> = ({ form }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <CartGridInput>
        <TextInputForm
          CustomTag={InputText}
          label={'Ваша фамилия*'}
          inputProps={{
            placeholder: 'Введите фамилия',
          }}
          name={`surname`}
          rules={{
            required: {
              value: true,
              message: 'Обязательное поле',
            },
          }}
          form={form}
        />
        <TextInputForm
          CustomTag={InputText}
          label={'Ваша имя*'}
          inputProps={{
            placeholder: 'Введите имя',
          }}
          name={`name`}
          rules={{
            required: {
              value: true,
              message: 'Обязательное поле',
            },
          }}
          form={form}
        />
        <NumberInputForm
          CustomTag={InputText}
          label={' Ваш телефон*'}
          inputProps={{
            format: '+375 (##) ### ## ##',
            placeholder: '+375 (__) ___ __ __',
            onValueChange: (vals) => {
              form.setValue('phone', vals.value);
            },
          }}
          name={`phone`}
          rules={{
            required: { value: true, message: 'Обязательное поле' },
            pattern: {
              value: /[0-9]{9,}/,
              message: 'Номер не полный',
            },
          }}
          form={form}
        />
        <TextInputForm
          CustomTag={InputText}
          label={'Ваш email'}
          inputProps={{
            placeholder: 'Введите email',
          }}
          name={`email`}
          rules={{
            required: false,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректная почта',
            },
          }}
          form={form}
        />
        <InputBox
          sx={{
            gridColumn: '1/3',
            mb: 15,
            [theme.breakpoints.down('sm')]: {
              gridColumn: '1/2',
            },
          }}>
          <TextInputForm
            CustomTag={InputText}
            label={'Комментрий'}
            inputProps={{
              multiline: true,
              minRows: 4,
              maxRows: 4,
              placeholder: 'Оставьте пожелание или комментарий к заказу',
            }}
            name={`comment`}
            rules={{
              required: false,
            }}
            form={form}
          />
        </InputBox>
      </CartGridInput>
    </>
  );
};

export default CartClientInfo;
