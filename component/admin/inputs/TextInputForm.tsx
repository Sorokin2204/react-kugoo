import { TextField, TextFieldProps } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { Controller } from 'react-hook-form';
import { NumberFormatPropsBase } from 'react-number-format';
import { InputFormType } from '../types/InputFormType';
type Props = InputFormType & {
  inputProps?: NumberFormatPropsBase & TextFieldProps;
  CustomTag?: React.ComponentType;
};

const TextInputForm: React.FC<Props> = ({
  label,
  name,
  rules,
  form,
  inputProps,
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
            <CustomTag
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
