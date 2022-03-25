import { Box, styled, useTheme } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { mobileNavData } from '../../../../data/mobileNavData';
import useAppConfig from '../../../../hooks/useAppConfig';
import { BadgeRounded } from './HeaderBottom';
import LinkCustom from './LinkCustom';

type Props = {};

const MobileNav = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  padding: '8px 0',
  backgroundColor: theme.palette.common.white,
  zIndex: 10000000,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
const MobileList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  width: '100vw',
  position: 'relative',
  zIndex: 10000000,
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
  const theme = useTheme();
  const { cartProducts } = useAppConfig();
  const [cartCount, setCartCount] = useState(null);

  useEffect(() => {
    setCartCount(_.sumBy(cartProducts, 'pieces'));
  }, [cartProducts]);

  return (
    <MobileNav>
      <MobileList>
        {mobileNavData.map((navData) => (
          <MobileItem
            key={navData.name}
            sx={{
              ...(navData.url === '/cart' && {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }),
            }}>
            {navData.url === '/cart' ? (
              <BadgeRounded
                badgeContent={cartCount}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiBadge-badge': {
                    pointerEvents: 'none',
                    left: 'auto',
                    top: '10%',
                    right: '25%',
                  },
                }}>
                <MobileLink
                  href={navData.url}
                  icon={navData.icon}
                  active={router.asPath === navData.url}>
                  {navData.name}
                </MobileLink>
              </BadgeRounded>
            ) : (
              <MobileLink
                href={navData.url}
                icon={navData.icon}
                active={router.asPath === navData.url}>
                {navData.name}
              </MobileLink>
            )}
          </MobileItem>
        ))}
      </MobileList>
    </MobileNav>
  );
};

export default MobileNavigation;
