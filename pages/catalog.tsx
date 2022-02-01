import React from 'react';
import { Container, styled } from '@mui/material';
import Catalog from '../component/common/Catalog';
import CatalogBanner from './components/Catalog/CatalogBanner';
import BreadcrumbsCustom from '../component/common/BreadcrumbsCustom';

type Props = {};

const CatalogPage: React.FC<Props> = ({}) => {
  return (
    <>
      <Container>
        <BreadcrumbsCustom />
      </Container>
      <Container maxWidth="xl" sx={{ mb: 25 }}>
        <CatalogBanner />
      </Container>
      <Container>
        <Catalog type="filter" />
      </Container>
    </>
  );
};

export default CatalogPage;
