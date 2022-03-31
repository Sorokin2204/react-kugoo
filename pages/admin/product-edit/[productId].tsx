import { useLazyQuery } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MainWrapper from '../../../component/admin/MainWrapper';
import AddEditProduct from '../../../component/admin/ProductAdd/AddEditProduct';
import { GET_PRODUCT_ADMIN } from '../../../graphql/query/product';
import useAppConfig from '../../../hooks/useAppConfig';

type Props = {};

const ProductEdit: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [getProduct, getProductData] = useLazyQuery(GET_PRODUCT_ADMIN);
  const { setAdminHeaderTitle } = useAppConfig();
  useEffect(() => {
    if (!router.isReady) return;

    getProduct({
      variables: {
        productSlug: router.query.productId,
      },
    })
      .then((prod) => {
        setAdminHeaderTitle(
          `Редактирование товара - "${prod.data.getProduct.name}"`,
        );
      })
      .catch((err) => console.error(JSON.stringify(err, null, 2)));
  }, [router]);

  return (
    <>
      {!getProductData.loading && getProductData ? (
        getProductData?.data?.getProduct ? (
          <AddEditProduct product={getProductData.data.getProduct} />
        ) : (
          <MainWrapper>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 110px)',
              }}>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Страница не найдена
              </Typography>
            </Box>
          </MainWrapper>
        )
      ) : (
        <CircularProgress
          sx={{
            position: 'fixed',
            left: '49%',
            top: '44%',
            transform: 'translate(-50%,-50%)',
          }}
        />
      )}
    </>
  );
};

export default ProductEdit;
