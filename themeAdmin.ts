import { createTheme, Typography, useTheme } from '@mui/material';
import { teal } from '@mui/material/colors';

let themeAdmin = createTheme({
  palette: {
    success: {
      main: teal[400],
    },
  },
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
      defaultProps: {
        size: 'small',
      },
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
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        '& .MuiPaper-root': { transition: 'none !important' },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableHead-root': {
            padding: 0,
          },
          '& .MuiTableCell-root': {
            padding: '4px',
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
    MuiMenu: {
      styleOverrides: {
        paper: {
          transitionDuration: '0s !important',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {},
      styleOverrides: {
        paper: {
          transitionDuration: '0s !important',
        },
      },
    },
  },
});

export default themeAdmin;
