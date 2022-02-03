import React from 'react';
import { Container, styled } from '@mui/material';
import HeaderTop from './components/HeaderTop';
import HeaderBottom from './components/HeaderBottom';
import Nav from './components/Nav';
type Props = {};

const Header: React.FC<Props> = ({}) => {
  return (
    <>
      <Container>
        <HeaderTop />
        <HeaderBottom />
      </Container>
      <Nav />
    </>
  );
};

export default Header;
