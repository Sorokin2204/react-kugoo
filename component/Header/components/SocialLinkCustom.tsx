import Link from 'next/link';
import React from 'react';

import { Button, Link as LinkMUI, styled } from '@mui/material';

type Props = {
  href: string;
  icon: string;
};

const SocialLinkStyle = styled(LinkMUI)<{ icon: string }>(
  ({ theme, icon }) => ({
    display: 'block',
    width: theme.spacing(6),
    height: theme.spacing(6),
    '&::after': {
      display: 'block',
      content: `""`,
      background: `url(${icon}) no-repeat 0 0/ contain`,
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }),
);

function SocialLinkCustom({ href, icon }: Props) {
  return (
    <>
      <Link href={href}>
        <SocialLinkStyle href={href} icon={icon}></SocialLinkStyle>
      </Link>
    </>
  );
}

export default SocialLinkCustom;
