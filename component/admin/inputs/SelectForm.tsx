import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { Controller } from 'react-hook-form';
import { InputFormType } from '../types/InputFormType';
type Props = InputFormType & {
  selectProps?: SelectProps;
  onChange?: (e: SelectChangeEvent<any>) => {};
};

const SelectForm: React.FC<Props> = ({
  label,
  name,
  rules,
  form,
  selectProps,
  children,
  onChange,
}) => {
  const id = _.uniqueId('select-');
  return (
    <>
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        defaultValue={''}
        render={({ field }) => (
          <>
            <FormControl
              sx={{ width: '100%' }}
              fullWidth
              error={
                _.get(form.formState, `errors.${name}.message`) !== undefined
              }>
              <InputLabel id={id}>{label}</InputLabel>
              <Select labelId={id} {...field} {...selectProps}>
                {children}
              </Select>
              {_.get(form.formState, `errors.${name}.message`) && (
                <FormHelperText>
                  {_.get(form.formState, `errors.${name}.message`)}
                </FormHelperText>
              )}
            </FormControl>
          </>
        )}
      />
    </>
  );
};

export default SelectForm;
