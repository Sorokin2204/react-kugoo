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
      <Container>
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
