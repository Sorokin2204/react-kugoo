import { InputBase, InputBaseProps, styled } from '@mui/material';

type Props = {
  small?: boolean;
  variant?: 'reverse';
};

const InputText = styled(InputBase)<InputBaseProps & Props>(
  ({ theme, small, variant, error, helperText, label }) => ({
    borderRadius: '5px',
    border: `1px solid ${theme.palette.grey[200]}`,
    ...(error && {
      border: `1px solid ${theme.palette.error.main} !important`,
    }),
    backgroundColor: theme.palette.common.white,
    padding: `${theme.spacing(7.5)} ${theme.spacing(12.5)}`,

    minWidth: '0px',
    width: 'auto',
    ...(error && {
      '&::after': {
        ...theme.typography.t4,
        position: 'absolute',
        content: `"${helperText}"`,
        display: 'block',
        top: '100%',
        left: 0,
        marginTop: '4px',
        marginLeft: '8px',
        color: `${theme.palette.error.main} !important`,
      },
    }),
    ...(label && {
      '&::before': {
        ...theme.typography.t3,
        position: 'absolute',
        content: `"${label}"`,
        display: 'block',
        bottom: '100%',
        left: 0,
        marginBottom: theme.spacing(3.5),
      },
    }),

    '&.Mui-focused': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    '& 	.MuiInputBase-input::placeholder': {
      ...theme.typography.t2,
      color: theme.palette.grey[600],
      ...(error && {
        color: `${theme.palette.error.main} !important`,
      }),
      opacity: 1,
    },
    '& 	.MuiInputBase-input': {
      width: '100%',
      minWidth: '0px',
      padding: '0',
      color: theme.palette.common.black,
    },

    ...(small && {
      padding: `${theme.spacing(4)} ${theme.spacing(5)}`,
    }),

    ...(variant === 'reverse' && {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: `1px solid transparent`,
      '& 	.MuiInputBase-input::placeholder': {
        ...theme.typography.t2,
        color: theme.palette.common.white,
        opacity: 1,
      },
    }),
  }),
);

export default InputText;
