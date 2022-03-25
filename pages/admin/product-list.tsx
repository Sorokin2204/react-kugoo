import React, { useEffect, useState } from 'react';
import { Box, styled, useTheme } from '@mui/material';
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
import { Edit, OpenInNew } from '@mui/icons-material';
import Link from 'next/link';
import { currencyFormat } from '../../utils/currencyFormat';
import useAppConfig from '../../hooks/useAppConfig';

type Props = {};

const ProductListAdminPage: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [activeProduct, setActiveProduct] = useState(null);
  const [getProduct, getAllProduct] = useLazyQuery(GET_ALL_PRODUCTS);
  const { setAdminHeaderTitle } = useAppConfig();
  useEffect(() => {
    setAdminHeaderTitle('Список товаров');
    getProduct().catch((err) => console.log(err));
  }, []);

  return (
    <MainWrapper>
      {!getAllProduct.loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Название
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Слаг
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Цена
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Артикул
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left"></TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getAllProduct.data?.getAllProduct?.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="left">{product.slug}</TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {currencyFormat(product.price)}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {product.vendorCode}
                  </TableCell>
                  <TableCell align="left">
                    <Link href={`/${product.Category.slug}/${product.slug}`}>
                      <a style={{ color: theme.palette.primary.main }}>
                        <OpenInNew />
                      </a>
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    <Link href={`/admin/product-edit/${product.slug}`}>
                      <a style={{ color: theme.palette.primary.main }}>
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
