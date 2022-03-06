import React from 'react';
import { styled, TextField, TextFieldProps } from '@mui/material';
import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormReturn,
} from 'react-hook-form';
import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';
import { InputFormType } from '../types/InputFormType';
import _ from 'lodash';
type Props = InputFormType & {
  inputProps?: NumberFormatPropsBase & TextFieldProps;
  CustomTag?: React.ComponentType;
};

const NumberInputForm: React.FC<Props> = ({
  label,
  name,
  rules,
  inputProps,
  form,
  CustomTag = TextField,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <>
            <NumberFormat
              sx={{ width: '100%' }}
              customInput={CustomTag}
              {...field}
              error={
                _.get(form.formState, `errors.${name}.message`) !== undefined
              }
              helperText={_.get(form.formState, `errors.${name}.message`)}
              label={label}
              {...form.register(name)}
              {...inputProps}
            />
          </>
        )}
      />
    </>
  );
};

export default NumberInputForm;
