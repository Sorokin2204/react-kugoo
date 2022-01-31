import { Button, Typography, useTheme } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import Home from './Home';

type Props = {};

const Index: NextPage<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <Home />
    </>
  );
};

export default Index;
