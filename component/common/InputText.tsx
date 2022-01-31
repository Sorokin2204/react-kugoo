import React from 'react';
import { InputBase, styled } from '@mui/material';

type Props = {
  small?: boolean;
  type: 'reverse';
};

const InputText = styled(InputBase)<Props>(({ theme, small, type }) => ({
  borderRadius: '5px',
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.common.white,
  padding: `${theme.spacing(7.5)} ${theme.spacing(12.5)}`,
  minWidth: '0px',
  width: 'auto',
  '&.Mui-focused': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  '& 	.MuiInputBase-input::placeholder': {
    ...theme.typography.t2,
    color: theme.palette.grey[600],
    opacity: 1,
  },
  '& 	.MuiInputBase-input': {
    width: 'auto',
    minWidth: '0px',
    padding: '0',
    color: theme.palette.common.black,
  },

  ...(small && {
    padding: `${theme.spacing(4)} ${theme.spacing(5)}`,
  }),

  ...(type === 'reverse' && {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: `1px solid transparent`,
    '& 	.MuiInputBase-input::placeholder': {
      ...theme.typography.t2,
      color: theme.palette.common.white,
      opacity: 1,
    },
  }),
}));

export default InputText;