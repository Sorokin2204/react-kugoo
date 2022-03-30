import { Link as LinkMUI, styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  icon: string;
  sizeicon: string;
};

const SocialLinkStyle = styled(LinkMUI)<{ icon: string; sizeicon: string }>(
  ({ theme, icon, sizeicon }) => ({
    display: 'block',
    width: theme.spacing(6),
    height: theme.spacing(6),
    '&::after': {
      display: 'block',
      content: `""`,
      background: `url(${icon}) no-repeat 0 0/ contain`,
      width: sizeicon,
      height: sizeicon,
    },
  }),
);

function SocialLinkCustom({ href, icon, sizeicon }: Props) {
  return (
    <>
      <Link href={href}>
        <SocialLinkStyle
          href={href}
          icon={icon}
          sizeicon={sizeicon}></SocialLinkStyle>
      </Link>
    </>
  );
}

export default SocialLinkCustom;
