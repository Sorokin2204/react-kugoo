import React from 'react';
import { Container, Divider, styled, useTheme } from '@mui/material';
import HeaderTop from './components/HeaderTop';
import HeaderBottom from './components/HeaderBottom';
import Nav from './components/Nav';
import MobileNavigation from './components/MobileNavigation';
type Props = {};

const Header: React.FC<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <Container>
        <HeaderTop />{' '}
      </Container>
      <Divider sx={{ backgroundColor: '#ECF3FF' }} />
      <Container
        sx={{
          [theme.breakpoints.down('md')]: {
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.common.white,
            zIndex: 10000,
          },
        }}>
        <HeaderBottom />
      </Container>
      <Nav
        sx={{
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      />
      <MobileNavigation />
    </>
  );
};

export default Header;
