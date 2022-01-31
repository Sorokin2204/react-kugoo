import React from 'react';
import { Container, styled } from '@mui/material';
import AdvSmall from './components/AdvSmall';
import Catalog from '../../component/common/Catalog';
import Footer from '../../component/Footer.tsx';

type Props = {};

const Home: React.FC<Props> = ({}) => {
  return (
    <>
      <Container>
        <AdvSmall></AdvSmall>
        <Catalog type="full"></Catalog>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
