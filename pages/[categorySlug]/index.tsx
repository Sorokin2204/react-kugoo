import React, { useEffect } from 'react';
import { Container, styled } from '@mui/material';
import Catalog from '../../component/common/Catalog';
import CatalogBanner from '../../component/common/Catalog/CatalogBanner';
import BreadcrumbsCustom from '../../component/common/BreadcrumbsCustom';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { CHECK_EXIST_CATEGORY } from '../../graphql/query/category';
import NotFoundPage from './../404';

type Props = {};

const CatalogPage: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [checkCategory, { data, loading }] = useLazyQuery(CHECK_EXIST_CATEGORY);

  useEffect(() => {
    if (!router.isReady) return;

    checkCategory({
      variables: {
        categorySlug: router.query.categorySlug,
      },
    });
  }, [router]);

  if (router.isFallback) {
    return <></>;
  }

  if (!loading) {
    if (data?.checkExistCategory) {
      return (
        <>
          <Container>
            <Catalog type="filter" category={router.query.categorySlug} />
          </Container>
        </>
      );
    } else {
      return (
        <>
          <NotFoundPage />
        </>
      );
    }
  }
  return <></>;
};

export default CatalogPage;
