import React, { useEffect } from 'react';
import {
  Box,
  ButtonBase,
  ButtonUnstyled,
  Link as LinkMUI,
  styled,
} from '@mui/material';
import { mobileNavData } from '../../../../data/mobileNavData';
import Link from 'next/link';
import LinkCustom from './LinkCustom';
import { useRouter } from 'next/router';

type Props = {};

const MobileNav = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  padding: '8px 0',
  backgroundColor: theme.palette.common.white,
  zIndex: 100000,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
const MobileList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  width: '100vw',
}));
const MobileItem = styled(Box)(({ theme }) => ({}));
const MobileLink = styled(LinkCustom)<{ icon: string; active: boolean }>(
  ({ theme, icon, active }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...(active && {
      color: theme.palette.primary.main,
    }),
    ...(icon && {
      '&::before': {
        content: '""',
        display: 'block',
        mask: `url(${icon}) no-repeat`,
        backgroundColor: theme.palette.grey[600],
        ...(active && {
          backgroundColor: theme.palette.primary.main,
        }),
        maskSize: 'contain',
        width: '20px',
        height: '20px',
        marginBottom: '2px',
      },
    }),
  }),
);

const MobileNavigation: React.FC<Props> = ({}) => {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  }, [router]);

  return (
    <MobileNav>
      <MobileList>
        {mobileNavData.map((navData) => (
          <MobileItem key={navData.name}>
            <MobileLink
              href={navData.url}
              icon={navData.icon}
              active={router.asPath === navData.url}>
              {navData.name}
            </MobileLink>
          </MobileItem>
        ))}
      </MobileList>
    </MobileNav>
  );
};

export default MobileNavigation;
