import React from 'react';
import { IconButton, IconButtonProps, styled } from '@mui/material';

type ButtonIconStyleProps = {
  icon: string;
  iconW: string;
  iconH: string;
  sizeBtn: string;
  iconColor?: string;
  variant?: 'border' | 'fill';
};

type ButtonIconProps = IconButtonProps & ButtonIconStyleProps;

const ButtonIconStyle = styled(IconButton)<ButtonIconStyleProps>(
  ({ theme, icon, iconW, iconH, sizeBtn, iconColor, variant }) => ({
    width: sizeBtn,
    height: sizeBtn,
    borderRadius: '50%',
    '&::after': {
      display: 'block',
      content: '""',
      width: iconW,
      height: iconH,
      mask: `url(${icon}) no-repeat`,
      maskSize: 'contain',
      backgroundColor: iconColor ? iconColor : theme.palette.common.black,
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
