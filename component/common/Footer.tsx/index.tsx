import React from 'react';
import { Box, Container, styled } from '@mui/material';
import Subscribe from './components/Subscribe';
import FooterTop from './components/FooterTop';
import FooterBottom from './components/FooterBottom';
import FooterMiddle from './components/FooterMiddle';

type Props = {};

const Footer: React.FC<Props> = ({}) => {
  return (
    <>
      <Box sx={{ backgroundColor: '#F4F7FB' }}>
        <Subscribe />
        <Container>
          <FooterTop />
          <FooterMiddle />
          <FooterBottom />
        </Container>
      </Box>
    </>
  );
};

export default Footer;
