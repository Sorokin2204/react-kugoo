import React from 'react';
import { styled, TextField, TextFieldProps } from '@mui/material';
import {
  Controller,
  Control,
  FieldErrors,
  UseFormReturn,
} from 'react-hook-form';
import { InputFormType } from '../types/InputFormType';
import _ from 'lodash';
import { NumberFormatPropsBase } from 'react-number-format';
type Props = InputFormType & {
  inputProps?: NumberFormatPropsBase & TextFieldProps;
};

const TextInputForm: React.FC<Props> = ({
  label,
  name,
  rules,
  form,
  inputProps,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <>
            <TextField
              sx={{ width: '100%' }}
              error={
                _.get(form.formState, `errors.${name}.message`) !== undefined
              }
              helperText={_.get(form.formState, `errors.${name}.message`)}
              label={label}
              variant="outlined"
              {...field}
              {...form.register(name)}
              {...inputProps}
            />
          </>
        )}
      />
    </>
  );
};

export default TextInputForm;
