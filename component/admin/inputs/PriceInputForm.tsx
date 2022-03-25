import React from 'react';
import { InputFormType } from '../types/InputFormType';
import NumberInputForm from './NumberInputForm';

type Props = InputFormType;

const PriceInputForm: React.FC<Props> = ({ label, name, form, rules }) => {
  return (
    <>
      <NumberInputForm
        label={label}
        name={name}
        {...(rules
          ? rules
          : {
              rules: {
                required: {
                  value: true,
                  message: 'Поле не должно быть пустым',
                },
                min: { value: 1, message: 'Мин. цена - 1₽' },
              },
            })}
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
