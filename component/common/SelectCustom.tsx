import React from 'react';
import { Select, SelectProps, styled } from '@mui/material';

type Props = {};

const SelectCustom: React.FC<SelectProps> = (props) => {
  return (
    <>
      <SelectStyled {...props}>{props.children}</SelectStyled>
    </>
  );
};
const SelectStyled = styled(Select)(({ theme }) => ({
  //
  padding: '0',
  color: theme.palette.primary.main,

  ...theme.typography.t4,
  display: 'flex',
  alignItems: 'center',

  '& .MuiOutlinedInput-notchedOutline': {
    border: `1.5px solid ${theme.palette.primary.main} !important`,
  },
  '& .MuiSelect-select': {
    padding: `${theme.spacing(5)} ${theme.spacing(10)}`,
    paddingRight: '40px !important',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      marginLeft: theme.spacing(5),
      mask: `url(/static/icons/arrow-down.svg) no-repeat 0 0`,
      width: '9px',
      height: '5px',
      maskSize: 'contain',
      backgroundColor: theme.palette.primary.main,
      userSelect: 'none',
      pointerEvents: 'none',
      position: 'absolute',
      right: '10px',
      top: '48%',
      transform: 'translate(-50%,-50%)',
    },
  },
  // '&.Mui-focused fieldset': {
  //   border: `2px solid ${theme.palette.primary.main} !important`,
  // },
  // '&::hover fieldset': {
  //   border: `2px solid ${theme.palette.primary.main} !important`,
  // },
}));
export default SelectCustom;
