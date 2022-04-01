import { alpha, Box, BoxProps, CircularProgress, styled } from '@mui/material';
import React from 'react';

type Props = {};

const Overlay: React.FC<BoxProps> = (props) => {
  const OverlayStyled = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: alpha(theme.palette.common.black, 0.2),
    width: '100%',
    height: '100%',
    zIndex: '100000000',
  }));

  return (
    <OverlayStyled {...props}>
      <CircularProgress
        sx={{
          position: 'fixed',
          left: '49%',
          top: '44%',
          transform: 'translate(-50%,-50%)',
        }}
      />
    </OverlayStyled>
  );
};

export default Overlay;
