import { Button, Container, Typography, useTheme } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import Catalog from '../component/common/Catalog';
import Footer from '../component/Footer.tsx';
import AdvSmall from './components/Home/AdvSmall';
import Banner from './components/Home/Banner';

type Props = {};

const Index: NextPage<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <Container maxWidth="xl">
        <Banner />
      </Container>
      <Container>
        <AdvSmall></AdvSmall>
        <Catalog type="full"></Catalog>
      </Container>
    </>
  );
};

export default Index;
