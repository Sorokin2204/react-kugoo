import React from 'react';
import { IconButton, IconButtonProps, styled } from '@mui/material';

type ButtonIconStyleProps = {
  icon: string;
  iconActive?: string;
  active: boolean;
  iconW: string;
  iconH: string;
  sizeBtn: string;
  iconColor?: string;
  variant?: 'border' | 'fill' | 'text';
  reverse?: boolean;
};

type ButtonIconProps = IconButtonProps & ButtonIconStyleProps;

const ButtonIconStyle = styled(IconButton)<ButtonIconStyleProps>(
  ({
    theme,
    icon,
    iconW,
    iconH,
    sizeBtn,
    iconColor,
    variant,
    children,
    active = false,
    iconActive,
    reverse = false,
  }) => ({
    ...(children
      ? {
          ...theme.typography.t3,
          color: theme.palette.common.black,
          display: 'flex',
          flexDirection: 'row-reverse',
        }
      : { width: sizeBtn, height: sizeBtn, borderRadius: '50%' }),
    [reverse ? '&::before' : '&::after']: {
      display: 'block',
      content: '""',
      width: iconW,
      height: iconH,
      mask: `url(${icon}) no-repeat`,
      ...(active &&
        iconActive && {
          mask: `url(${iconActive}) no-repeat`,
        }),
      maskSize: 'contain',
      backgroundColor: iconColor ? iconColor : theme.palette.common.black,
      ...(children && {
        [reverse ? 'marginLeft' : 'marginRight']: theme.spacing(5),
      }),
    },
    ...(variant === 'border' && {
      border: `1px solid #eaebed`,
    }),
  }),
);

const ButtonIcon = (props: ButtonIconProps) => {
  return <ButtonIconStyle {...props}></ButtonIconStyle>;
};

export default ButtonIcon;
