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
      sm: 840,
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
        autoComplete: 'off',
      },
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
            {
              appearance: 'none',
              margin: 0,
            },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {},
            '&:hover fieldset': {
              borderColor: themeAdmin.palette.grey[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: themeAdmin.palette.primary.main,
            },
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
            [themeAdmin.breakpoints.down('sm')]: {
              padding: '10px',
            },
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
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: `${themeAdmin.palette.primary.main} !important`,
            boxShadow: 'none',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
        },
      },
      MuiIconButton: {},
    },
    MuiMenuItem: {
      styleOverrides: {
        paper: {
          transitionDuration: '0s !important',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
  },
});

export default themeAdmin;
