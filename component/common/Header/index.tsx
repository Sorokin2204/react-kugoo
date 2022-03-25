import { Container, Divider, useTheme } from '@mui/material';
import React from 'react';
import HeaderBottom from './components/HeaderBottom';
import HeaderTop from './components/HeaderTop';
import MobileNavigation from './components/MobileNavigation';
import Nav from './components/Nav';
type Props = {};

const Header: React.FC<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <Container>
        <HeaderTop />
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
