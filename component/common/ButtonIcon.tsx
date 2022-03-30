import { IconButton, IconButtonProps, styled } from '@mui/material';
import React from 'react';

type ButtonIconStyleProps = {
  icon: string;
  iconactive?: string;
  active: boolean;
  iconw: string;
  iconh: string;
  sizebtn: string;
  iconcolor?: string;
  variant?: 'border' | 'fill' | 'text';
  reverse?: boolean;
};

type ButtonIconProps = IconButtonProps & ButtonIconStyleProps;

const ButtonIconStyle = styled(IconButton)<ButtonIconProps>(
  ({
    theme,
    icon,
    iconw,
    iconh,
    sizebtn,
    iconcolor,
    variant,
    children,
    active = false,
    iconactive,
    reverse = false,
  }) => ({
    ...(children
      ? {
          ...theme.typography.t3,
          color: theme.palette.common.black,
          display: 'flex',
          flexDirection: 'row-reverse',
        }
      : { width: sizebtn, height: sizebtn, borderRadius: '50%' }),
    [reverse ? '&::before' : '&::after']: {
      display: 'block',
      content: '""',
      width: iconw,
      height: iconh,
      mask: `url(${icon}) no-repeat`,
      ...(active &&
        iconactive && {
          mask: `url(${iconactive}) no-repeat`,
        }),
      maskSize: 'contain',
      backgroundColor: iconcolor ? iconcolor : theme.palette.common.black,
      ...(children && {
        [reverse ? 'marginLeft' : 'marginRight']: theme.spacing(5),
      }),
    },
    ...(variant === 'border' && {
      border: `1px solid #eaebed`,
    }),
  }),
);

const ButtonIcon: React.FC<ButtonIconProps> = (props: ButtonIconProps) => {
  return <ButtonIconStyle {...props}></ButtonIconStyle>;
};

export default ButtonIcon;
