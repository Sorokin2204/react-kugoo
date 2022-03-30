import { useLazyQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Catalog from '../../component/common/Catalog';
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

  // if (router.isFallback) {
  //   return <></>;
  // }

  // if (!loading) {
  //   if (data?.checkExistCategory) {
  //     return (
  //       <>
  //         <Container>
  //           <Catalog type="filter" category={router.query.categorySlug} />
  //         </Container>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <NotFoundPage />
  //       </>
  //     );
  //   }
  // }
  return (
    <>
      {!loading && data ? (
        data?.checkExistCategory ? (
          <Container>
            <Box sx={{ py: 20 }}>
              {' '}
              <Catalog type="filter" category={router.query.categorySlug} />
            </Box>
          </Container>
        ) : (
          <NotFoundPage />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default CatalogPage;
