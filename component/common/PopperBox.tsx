import { Box, Popper, PopperProps, styled } from '@mui/material';
import React from 'react';

const PopperBox = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  boxShadow: theme.boxShadow.primary,
}));

const PopperCustom: React.FC<PopperProps> = ({ children, ...props }) => {
  return (
    <Popper {...props}>
      <PopperBox>{children}</PopperBox>
    </Popper>
  );
};

export default PopperCustom;
