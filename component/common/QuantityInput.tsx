import React from 'react';
import { Box, Button, ButtonBase, InputBase, styled } from '@mui/material';
import ButtonIcon from './ButtonIcon';

type Props = {};

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
const InputCustom = styled(InputBase)(({ theme }) => ({
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

const QuantityInput: React.FC<Props> = ({}) => {
  return (
    <>
      <BoxInput>
        <DecrimentButton></DecrimentButton>
        <InputCustom type="number" defaultValue={1} />
        <IncrimentButton></IncrimentButton>
      </BoxInput>
    </>
  );
};

export default QuantityInput;
