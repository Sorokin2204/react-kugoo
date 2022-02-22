import React from 'react';
import { styled } from '@mui/material';
import NumberInputCustom from './NumberInputForm';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';
import NumberInputForm from './NumberInputForm';
import { InputFormType } from '../types/InputFormType';

type Props = InputFormType;

const PriceInputForm: React.FC<Props> = ({ label, name, form }) => {
  return (
    <>
      <NumberInputForm
        label={label}
        name={name}
        rules={{
          required: { value: true, message: 'Поле не должно быть пустым' },
          min: { value: 1, message: 'Мин. цена - 1₽' },
        }}
        inputProps={{
          suffix: ' ₽',
          thousandSeparator: ' ',

          onValueChange: (v) => {
            form.setValue(name, v.floatValue);
          },
        }}
        form={form}
      />
    </>
  );
};

export default PriceInputForm;
