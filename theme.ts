import { createTheme, Typography, useTheme } from '@mui/material';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1110,
      xl: 1440,
    },
  },

  spacing: 2,
  palette: {
    grey: {
      '100': '#f4f7fb',
      '200': '#eaebed',
      '300': '#f1f2f6',
      '600': '#5d6c7b',
    },
    text: {
      primary: '#282739',
    },
    background: {
      paper: '#f4f7fb',
      default: '#ffffff',
    },
    common: {
      white: '#ffffff',
      black: '#282739',
    },
    primary: {
      main: '#6f73ee',
    },
    error: {
      main: '#ee685f',
    },
    warning: {
      main: '#f3a712',
    },
    success: {
      main: '#75d14a',
    },
  },
  boxShadow: {
    primary: '0px 10px 30px rgba(111, 115, 238, 0.1);',
    secondary: '',
  },
  typography: {
    fontFamily: 'Jost',
    h1: {
      fontSize: '35px',
      lineHeight: '51px',
      fontWeight: '600',
    },
    h2: {
      fontWeight: '700',
      fontSize: '30px',
      lineHeight: '43px',
    },
    h3: {
      fontSize: '25px',
      lineHeight: '36px',
      fontWeight: '600',
    },
    h4: {
      fontSize: '20px',
      lineHeight: '29px',
      fontWeight: '600',
    },
    t1: {
      fontWeight: ' 400',
      fontSize: ' 18px',
      lineHeight: ' 26px',
    },
    t1b: {
      fontWeight: ' 500',
      fontSize: ' 18px',
      lineHeight: ' 26px',
    },
    t2: {
      fontWeight: '400',
      fontSize: ' 16px',
      lineHeight: '23px',
    },
    t2b: {
      fontWeight: ' 500',
      fontSize: ' 16px',
      lineHeight: ' 23px',
    },
    t3: {
      fontWeight: ' 400',
      fontSize: ' 14px',
      lineHeight: ' 20px',
    },
    t3b: {
      fontWeight: ' 500',
      fontSize: ' 14px',
      lineHeight: ' 20px',
    },
    t4: {
      fontWeight: ' 400',
      fontSize: ' 12px',
      lineHeight: ' 17px',
    },
    t5: {
      fontWeight: ' 400',
      fontSize: ' 10px',
      lineHeight: ' 14px',
    },
    t4b: {
      fontWeight: ' 500',
      fontSize: ' 12px',
      lineHeight: ' 17px',
    },
    t5b: {
      fontWeight: ' 500',
      fontSize: ' 10px',
      lineHeight: ' 14px',
    },

    // body1: {
    //   // lineHeight: '20px',
    //   fontSize: '16px',
    // },
    // subtitle1: {
    //   lineHeight: '20px',
    //   fontSize: '14px',
    // },
    // button: {
    //   fontSize: '16px',
    // },
    // overline: {
    //   fontSize: '12px',
    // },
    // caption: { fontSize: '12px ', lineHeight: '17px', fontWeight: '400' },
    // link: {
    //   fontSize: '12px',
    //   fontWeight: '400',
    //   lineHeight: '17px',
    // },
  },
});

// theme.typography.link = {
//   fontSize: '12px',
//   fontWeight: '400',
//   lineHeight: '17px',
// };

theme = createTheme(theme, {
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '5px',
          boxShadow: theme.boxShadow.primary,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        paddingTop: '0',
      },
    },
    MuiContainer: {
      defaultProps: {},
      styleOverrides: {
        root: {
          padding: '0px !important',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        text: {
          ...theme.typography.t4b,
          padding: 0,
        },
        contained: {
          textTransform: 'none',
        },
        containedSmall: {
          '&, &:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: `${theme.spacing(5)}`,
            ...theme.typography.t4,
          },
        },
        containedReverse: {
          '&, &:hover': {
            border: `1px solid ${theme.palette.common.white}`,
            backgroundColor: theme.palette.common.white,
            color: theme.palette.primary.main,
            padding: `${theme.spacing(7.5)} ${theme.spacing(12.5)}`,
            ...theme.typography.t2,
          },
        },
        outlined: {
          '&, &:hover': {
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.common.white,
            color: theme.palette.primary.main,
            padding: `${theme.spacing(7.5)} ${theme.spacing(12.5)}`,
            ...theme.typography.t2,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          display: 'none',
        },
        outlined: {
          // padding: `${theme.spacing(5)} ${theme.spacing(10)}`,
          // color: theme.palette.primary.main,
          // paddingRight: '20px !important',
          // ...theme.typography.t4,
          // display: 'flex',
          // alignItems: 'center',
          // '&::after': {
          //   content: '""',
          //   display: 'block',
          //   marginLeft: theme.spacing(5),
          //   mask: `url(/static/icons/arrow-down.svg) no-repeat 0 0`,
          //   width: '9px',
          //   height: '5px',
          //   maskSize: 'contain',
          //   backgroundColor: theme.palette.primary.main,
          // },
          // '& .Mui-focused': {
          //   padding: '0',
          // },
          // '& .MuiOutlinedInput-notchedOutline': {
          //   border: `2px solid ${theme.palette.primary.main} !important`,
          // },
          // // '&.Mui-focused fieldset': {
          // //   border: `2px solid ${theme.palette.primary.main} !important`,
          // // },
          // // '&::hover fieldset': {
          // //   border: `2px solid ${theme.palette.primary.main} !important`,
          // // },
        },
      },
    },

    MuiIconButton: {
      defaultProps: {
        disableTouchRipple: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '0px',
          maring: '0px',
        },
        contained: {
          fontWeight: '400',

          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '0px',
          maring: '0px',
        },
      },
    },
    MuiDivider: {
      defaultProps: {},
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[600],
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {},
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(4),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.t3,
          paddingTop: theme.spacing(1.5),
          paddingBottom: theme.spacing(1.5),
          paddingLeft: theme.spacing(7),
          paddingRight: theme.spacing(15),
          '&.Mui-selected': {
            color: theme.palette.primary.main,
            backgroundColor: '#F4F7FB',
            '&:hover': {
              backgroundColor: '#F4F7FB',
            },
          },
          '&:hover': {
            backgroundColor: '#F4F7FB',
          },
        },
      },
    },
  },
});

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    t1: true;
    t2: true;
    t3: true;
    t4: true;
    t5: true;
    t1b: true;
    t2b: true;
    t3b: true;
    t4b: true;
    t5b: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    t1: React.CSSProperties;
    t2: React.CSSProperties;
    t3: React.CSSProperties;
    t4: React.CSSProperties;
    t5: React.CSSProperties;
    t1b: React.CSSProperties;
    t2b: React.CSSProperties;
    t3b: React.CSSProperties;
    t4b: React.CSSProperties;
    t5b: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    t1?: React.CSSProperties;
    t2?: React.CSSProperties;
    t3?: React.CSSProperties;
    t4?: React.CSSProperties;
    t5?: React.CSSProperties;
    t1b?: React.CSSProperties;
    t2b?: React.CSSProperties;
    t3b?: React.CSSProperties;
    t4b?: React.CSSProperties;
    t5b?: React.CSSProperties;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    containedSmall: true;
    containedReverse: true;
    outlineSmall: true;
  }
}
export default theme;
