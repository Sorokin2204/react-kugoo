import { Box, styled } from '@mui/material';

export const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 40px)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
}));
