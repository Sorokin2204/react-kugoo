import React, { useEffect } from 'react';
import { styled } from '@mui/material';
import AddEditProduct from '../../component/admin/ProductAdd/AddEditProduct';
import useAppConfig from '../../hooks/useAppConfig';

type Props = {};

const ProductAdd: React.FC<Props> = ({}) => {
  const { setAdminHeaderTitle } = useAppConfig();
  useEffect(() => {
    setAdminHeaderTitle(`Новый товар`);
  }, []);

  return (
    <>
      <AddEditProduct />
    </>
  );
};

export default ProductAdd;
