import { UseFormReturn } from 'react-hook-form';

export type InputFormType = {
  name: string;
  label: string;
  rules?: object;
  form: UseFormReturn;
};
