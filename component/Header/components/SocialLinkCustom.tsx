import Link from 'next/link';
import React from 'react';

import { Button, Link as LinkMUI, styled } from '@mui/material';

type Props = {
  href: string;
  icon: string;
  sizeIcon: string;
};

const SocialLinkStyle = styled(LinkMUI)<{ icon: string; sizeIcon: string }>(
  ({ theme, icon, sizeIcon }) => ({
    display: 'block',
    width: theme.spacing(6),
    height: theme.spacing(6),
    '&::after': {
      display: 'block',
      content: `""`,
      background: `url(${icon}) no-repeat 0 0/ contain`,
      width: sizeIcon,
      height: sizeIcon,
    },
  }),
);

function SocialLinkCustom({ href, icon, sizeIcon }: Props) {
  return (
    <>
      <Link href={href}>
        <SocialLinkStyle
          href={href}
          icon={icon}
          sizeIcon={sizeIcon}></SocialLinkStyle>
      </Link>
    </>
  );
}

export default SocialLinkCustom;
