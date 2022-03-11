import React from 'react';
import { Container, styled } from '@mui/material';
import Catalog from '../../component/common/Catalog';
import CatalogBanner from '../../component/common/Catalog/CatalogBanner';
import BreadcrumbsCustom from '../../component/common/BreadcrumbsCustom';
import { useRouter } from 'next/router';

type Props = {};

const CatalogPage: React.FC<Props> = ({}) => {
  const roter = useRouter();
  return (
    <>
      <Container>
        <BreadcrumbsCustom />
      </Container>
      <Container>
        <Catalog type="filter" category={roter.query.categorySlug} />
      </Container>
    </>
  );
};

export default CatalogPage;
