import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  InputBase,
  InputBaseProps,
  styled,
} from '@mui/material';
import ButtonIcon from './ButtonIcon';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

type Props = {
  onChangeNumber: (value: number) => {};
} & InputBaseProps &
  NumberFormatProps;

const BoxInput = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  maxWidth: theme.spacing(53),
}));
const DecrimentButton = styled(ButtonBase)(({ theme }) => ({
  //   border: '1px solid red',
  '&::after': {
    content: '""',
    display: 'block',
    background: theme.palette.grey[600],
    width: theme.spacing(5),
    height: '1px',
  },
}));
const InputCustom = styled(NumberFormat)(({ theme }) => ({
  //   border: '1px solid red',

  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
}));
const IncrimentButton = styled(ButtonBase)(({ theme }) => ({
  //   border: '1px solid red',
  '&::after,&::before': {
    content: '""',
    display: 'block',
    background: theme.palette.grey[600],
    width: theme.spacing(5),
    height: '1px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  '&::before': {
    transform: ' translate(-50%,-50%) rotate(90deg)',
  },
}));

const QuantityInput: React.FC<Props> = (props) => {
  const [value, setValue] = useState<number>(props.defaultValue ?? 0);
  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <BoxInput>
        <DecrimentButton
          onClick={() => {
            if (value > 1) {
              props.onChangeNumber(value - 1);
              setValue(value - 1);
            }
          }}></DecrimentButton>
        <InputCustom
          customInput={InputBase}
          value={value}
          min={1}
          max={9999}
          isAllowed={(value) => {
            return !value.value || value.floatValue > 100 ? false : true;
          }}
          allowEmptyFormatting={false}
          {...props}
          onChange={(event) => {
            props.onChangeNumber(parseInt(event.target.value));
            setValue(parseInt(event.target.value));
          }}
        />
        <IncrimentButton
          onClick={() => {
            if (value < 99) {
              props.onChangeNumber(value + 1);
              setValue(value + 1);
            }
          }}></IncrimentButton>
      </BoxInput>
    </>
  );
};

export default QuantityInput;
