import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import MainWrapper from '../../component/admin/MainWrapper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_ADMIN,
} from '../../graphql/query/product';
import { Edit } from '@mui/icons-material';
import Link from 'next/link';

type Props = {};

const ProductListAdminPage: React.FC<Props> = ({}) => {
  const [activeProduct, setActiveProduct] = useState(null);
  const [getProduct, getAllProduct] = useLazyQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    getProduct()
      .then((data) => {
        console.log('SUCCES', data.getAllProduct);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainWrapper>
      {/* {!loading && data.getAllProducts.map((el, i) => <div>{el.name}</div>)} */}

      {!getAllProduct.loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Название</TableCell>
                <TableCell align="right">Слаг</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getAllProduct.data?.getAllProduct?.map((product) => (
                <TableRow
                  // onClick={(event) => handleTableRowClick(event, product)}
                  // selected={product._id === activeProduct}
                  key={product._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">
                    <Link href={`/admin/product-edit/${product.slug}`}>
                      <a>
                        <Edit />
                      </a>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </MainWrapper>
  );
};

export default ProductListAdminPage;
