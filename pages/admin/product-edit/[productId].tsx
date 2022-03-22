import React, { useEffect } from 'react';
import { CircularProgress, styled } from '@mui/material';
import { useRouter } from 'next/router';
import AddEditProduct from '../../../component/admin/ProductAdd/AddEditProduct';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_PRODUCT_ADMIN } from '../../../graphql/query/product';
import useAppConfig from '../../../hooks/useAppConfig';

type Props = {};

const ProductEdit: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [getProduct, getProductData] = useLazyQuery(GET_PRODUCT_ADMIN);
  const { setAdminHeaderTitle } = useAppConfig();
  useEffect(() => {
    if (!router.isReady) return;
    console.log(router.query.productId);
    getProduct({
      variables: {
        productSlug: router.query.productId,
      },
    })
      .then((prod) => {
        setAdminHeaderTitle(
          `Редактирование товара - "${prod.data.getProduct.name}"`,
        );
        console.log('SUCC', prod);
      })
      .catch((err) => console.error(JSON.stringify(err, null, 2)));
  }, [router]);

  return (
    <>
      {!getProductData.loading && getProductData.data ? (
        <AddEditProduct product={getProductData.data.getProduct} />
      ) : (
        <CircularProgress />
      )}
      {/* {!getProduct.loading && 
        getProduct.data.getProduct.Spec
     } */}
    </>
  );
};

export default ProductEdit;
