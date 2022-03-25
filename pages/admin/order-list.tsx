import React, { useEffect, useState } from 'react';

import MainWrapper from '../../component/admin/MainWrapper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_ORDERS } from '../../graphql/query/order';
import useAppConfig from '../../hooks/useAppConfig';
import { IconButton, useTheme } from '@mui/material';
import Link from 'next/link';
import { currencyFormat } from '../../utils/currencyFormat';
import { OpenInNew } from '@mui/icons-material';
import { phoneFormat } from '../../utils/phoneFormat';
import OrderModal from '../../component/admin/ProductAdd/OrderModal';

type Props = {};

const OrderListPage: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [getOrder, getAllOrders] = useLazyQuery(GET_ALL_ORDERS);
  const [openOrderModal, setOpenOrderModal] = useState(false);

  const [activeOrder, setActiveOrder] = useState(null);
  const { setAdminHeaderTitle } = useAppConfig();
  useEffect(() => {
    setAdminHeaderTitle('Список заказов');
    getOrder().catch((err) => console.log(JSON.stringify(err, null, 2)));
  }, []);

  const handlerClickOrder = (e, orderId: string) => {
    setActiveOrder(orderId);
    setOpenOrderModal(true);
  };

  const switchOrderModal = () => {
    setOpenOrderModal(!openOrderModal);
    setActiveOrder(null);
  };

  return (
    <MainWrapper>
      {!getAllOrders.loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Телефон
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Имя
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Фамилия
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Стоимость заказа
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left">
                  Город
                </TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getAllOrders.data?.getAllOrders?.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ whiteSpace: 'nowrap' }}>
                    {phoneFormat(order.phone)}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {order.name}
                  </TableCell>

                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {order.surname}
                  </TableCell>
                  <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                    {currencyFormat(order.total)}
                  </TableCell>
                  <TableCell align="left"> {order.city}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={(e) => handlerClickOrder(e, order._id)}>
                      <OpenInNew />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {openOrderModal ? (
        <OrderModal
          orderId={activeOrder}
          open={openOrderModal}
          handleClose={switchOrderModal}
        />
      ) : null}
    </MainWrapper>
  );
};

export default OrderListPage;
