import React, { useState } from 'react';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import InputText from '../InputText';
import FilterCheckbox from '../FilterCheckbox';
import TextInputForm from '../../admin/inputs/TextInputForm';
import { UseFormReturn } from 'react-hook-form';
import NumberInputForm from '../../admin/inputs/NumberInputForm';

type Props = { form: UseFormReturn };
const CartGridInput = styled(Grid)(({ theme }) => ({
  // display: 'grid',
  // gridTemplateColumns: 'repeat(2,1fr)',
  // gridGap: '20px',
}));
const InputBox = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const CartDeliveryInfo: React.FC<Props> = ({ form }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <CartGridInput container columnSpacing={10} rowSpacing={20}>
        <InputBox item xs={6} sx={{ gridColumn: '1/3' }}>
          <TextInputForm
            CustomTag={InputText}
            label={'Город/населенный пункт*'}
            inputProps={{
              placeholder: 'Например, Воронеж',
            }}
            name={`city`}
            rules={{
              required: {
                value: true,
                message: 'Обязательное поле',
              },
            }}
            form={form}
          />
        </InputBox>
        <InputBox item xs={6} sx={{ gridColumn: '3/5' }}>
          <TextInputForm
            CustomTag={InputText}
            label={'Название улицы*'}
            inputProps={{
              placeholder: 'Например, Сурганова',
            }}
            name={`street`}
            rules={{
              required: {
                value: true,
                message: 'Обязательное поле',
              },
            }}
            form={form}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '1/2' }}>
          <NumberInputForm
            CustomTag={InputText}
            label={'Номер дома*'}
            inputProps={{
              format: '###',
              placeholder: 'Введите число',
              onValueChange: (vals) => {
                form.setValue('buildingNumber', vals.floatValue);
              },
            }}
            name={`buildingNumber`}
            rules={{
              required: { value: true, message: 'Обязательное поле' },
            }}
            form={form}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '2/3' }}>
          <NumberInputForm
            CustomTag={InputText}
            label={'Квартира'}
            inputProps={{
              format: '###',
              placeholder: 'Введите число',
              onValueChange: (vals) => {
                form.setValue('buildingFlat', vals.floatValue);
              },
            }}
            name={`buildingFlat`}
            rules={{
              required: false,
            }}
            form={form}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '3/4' }}>
          <NumberInputForm
            CustomTag={InputText}
            label={'Корпус'}
            inputProps={{
              format: '###',
              placeholder: 'Введите число',
              onValueChange: (vals) => {
                form.setValue('buildingPart', vals.floatValue);
              },
            }}
            name={`buildingPart`}
            rules={{
              required: false,
            }}
            form={form}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '4/5' }}>
          <NumberInputForm
            CustomTag={InputText}
            label={'Индекс'}
            inputProps={{
              format: '#########',
              placeholder: 'Например, 00112233',
              onValueChange: (vals) => {
                form.setValue('buildingIndex', vals.value);
              },
            }}
            name={`buildingIndex`}
            rules={{
              required: false,
              pattern: {
                value: /[0-9]{9,}/,
                message: 'Не корректный индекс',
              },
            }}
            form={form}
          />
        </InputBox>
      </CartGridInput>
    </>
  );
};

export default CartDeliveryInfo;
