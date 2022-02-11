import { createTheme, Typography, useTheme } from '@mui/material';

let themeAdmin = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1170,
      xl: 1440,
    },
  },
});

themeAdmin = createTheme(themeAdmin, {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
            {
              appearance: 'none',
              margin: 0,
            },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableHead-root': {
            p: 0,
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            transition: 'none !important',
          },
        },
      },
    },
  },
});

export default themeAdmin;
