import { createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';

let themeAdmin = createTheme({
  zIndex: {
    modal: 1300,
    snackbar: 1400,
  },
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
          '& .MuiTableRow-root.Mui-selected': {
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
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
        // root: {
        //   boxShadow: 'none',
        //   '&:hover': {
        //     backgroundColor: `${themeAdmin.palette.primary.main} !important`,
        //     boxShadow: 'none',
        //   },
        // },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: `${themeAdmin.palette.primary.main} !important`,
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08) !important',
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
        root: {
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08) !important',
          },
        },
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
