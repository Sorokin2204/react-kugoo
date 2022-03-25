import React, { useState } from 'react';
import { Box, FormLabel, styled, Typography, useTheme } from '@mui/material';
import InputText from '../InputText';
import FilterCheckbox from '../FilterCheckbox';
import { UseFormReturn } from 'react-hook-form';
import TextInputForm from '../../admin/inputs/TextInputForm';
import NumberInputForm from '../../admin/inputs/NumberInputForm';

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
          {/* <Typography variant="t4" sx={{ mb: 3.5 }}>
            Комментрий
          </Typography>
          <InputText
            multiline
            
            value={inputValue}
            placeholder={'Оставьте пожелание или комментарий к заказу '}
            onInput={(event) => setInputValue(event.target.value)}
          /> */}

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
        {/* <InputBox>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Ваше имя
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите имя'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Ваш телефона*
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'+7 (___) __ - __ - __'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Ваш email
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите email'}
            onInput={(event) => setInputValue(event.target.value)}
          />
          <FilterCheckbox
            sx={{
              marginTop: theme.spacing(5),
              '& .MuiTypography-root': {
                ...theme.typography.t4,
              },
              '& .MuiCheckbox-root': {
                '& span:before': {
                  marginRight: '12px',
                },
              },
            }}
            data={[
              {
                value: 'discount',
                label: 'Сообщать мне об акциях и скидках',
              },
            ]}
          />
        </InputBox> */}
      </CartGridInput>
    </>
  );
};

export default CartClientInfo;
