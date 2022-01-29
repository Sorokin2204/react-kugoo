import React from 'react';
import { IconButton, IconButtonProps, styled } from '@mui/material';

type ButtonIconStyleProps = {
  icon: string;
  iconW: string;
  iconH: string;
  padding: string;
};

type ButtonIconProps = IconButtonProps & ButtonIconStyleProps;

const ButtonIconStyle = styled(IconButton)<ButtonIconStyleProps>(
  ({ theme, icon, iconW, iconH, padding }) => ({
    padding: padding,
    borderRadius: '50%',
    '&::after': {
      display: 'block',
      content: '""',
      width: iconW,
      height: iconH,

      background: `url(${icon}) no-repeat 0 0/contain`,
    },
  }),
);

const ButtonIcon = (props: ButtonIconProps) => {
  return <ButtonIconStyle {...props}></ButtonIconStyle>;
};

export default ButtonIcon;
