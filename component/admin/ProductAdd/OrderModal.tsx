import { useLazyQuery } from '@apollo/client';
import { Close } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { GET_ORDER } from '../../../graphql/query/order';
import { currencyFormat } from '../../../utils/currencyFormat';
import { ModalBox } from '../ModalBox';

const OrderProduct = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',

  gap: '10px',
}));
const OrderProductImg = styled('img')(({ theme }) => ({
  gridRow: '1/3',
  maxWidth: '80px',
  height: '80px',
  width: 'auto',
  borderRadius: '5px',
  objectFit: 'cover',
}));
const OrderProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '600',
  alignSelf: 'flex-end',
}));
const OrderProductAttrBox = styled(Box)(({ theme }) => ({
  alignSelf: 'flex-start',
  display: 'inline-flex',
  flexWrap: 'wrap',
  gridGap: '10px',
}));
const OrderProductAttr = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  whiteSpace: 'nowrap',
  color: theme.palette.grey[600],
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '30px',
  padding: '3px 10px',
}));
const OrderInfo = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
}));

const OrderClient = styled(Box)(({ theme }) => ({}));
const ClientItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 0',
  '& + &': {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
}));
const ClientTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  marginBottom: '10px',
}));
const ClientLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[500],
}));
const ClientData = styled(Box)(({ theme }) => ({}));

type Props = {
  orderId?: string;
  open: boolean;
  handleClose: () => {};
};

const OrderModal: React.FC<Props> = ({ open, handleClose, orderId }) => {
  const [
    getOrder,
    { data: { getOrder: orderData } = {}, loading: getOrderLoading },
  ] = useLazyQuery(GET_ORDER);

  useEffect(() => {
    if (orderId) {
      getOrder({
        variables: {
          orderId: orderId,
        },
      })
        .then((dt) => console.log('order data ', dt))
        .catch((err) => console.log(JSON.stringify(err, null, 2)));
    }
  }, [orderId]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <ModalBox>
          <IconButton
            sx={{ p: 0, position: 'absolute', top: 15, right: 15 }}
            onClick={handleClose}>
            <Close sx={{ fontSize: '30px' }} />
          </IconButton>
          <OrderInfo>
            <OrderClient>
              <ClientTitle>Информация о клиенте</ClientTitle>
              <ClientItem>
                <ClientLabel>Имя</ClientLabel>
                <ClientData>{orderData?.name}</ClientData>
              </ClientItem>
              <ClientItem>
                <ClientLabel>Фамилия</ClientLabel>
                <ClientData>{orderData?.surname}</ClientData>
              </ClientItem>
              <ClientItem>
                <ClientLabel>Телефон</ClientLabel>
                <ClientData>{orderData?.phone}</ClientData>
              </ClientItem>
              <ClientItem>
                <ClientLabel>Почта</ClientLabel>
                <ClientData>{orderData?.email || '-'}</ClientData>
              </ClientItem>
              <ClientItem>
                <ClientLabel>Адрес</ClientLabel>
                <ClientData>{`г.${orderData?.city} ул.${orderData?.street}, д.${
                  orderData?.buildingNumber
                } ${
                  orderData?.buildingFlat ? `кв.${orderData?.buildingFlat}` : ''
                } ${
                  orderData?.buildingPart ? `к.${orderData?.buildingPart}` : ''
                } ${
                  orderData?.buildingIndex ? `${orderData?.buildingIndex}` : ''
                }`}</ClientData>
              </ClientItem>
              <ClientItem>
                <ClientLabel>Комментарий</ClientLabel>
                <ClientData>{orderData?.comment || '-'}</ClientData>
              </ClientItem>
            </OrderClient>
          </OrderInfo>
          {!getOrderLoading && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Товар</TableCell>
                    <TableCell align="center">Цена</TableCell>
                    <TableCell align="center">Количество</TableCell>
                    <TableCell align="center">Итог</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData?.OrderProducts?.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        <OrderProduct>
                          <OrderProductImg
                            src={
                              order?.Product?.images?.length !== 0
                                ? `/static/products/${order?.Product?.images[0]?.name}`
                                : '/static/preview-product.jpg'
                            }
                          />
                          <OrderProductTitle>
                            {order.Product.name}
                          </OrderProductTitle>
                          <OrderProductAttrBox>
                            {order.AttributeOptions.map((attrOpt) => (
                              <OrderProductAttr key={attrOpt.label}>
                                {attrOpt.label}
                              </OrderProductAttr>
                            ))}
                          </OrderProductAttrBox>
                        </OrderProduct>
                        {order.name}
                      </TableCell>
                      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                        {currencyFormat(order.totalPrice)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          whiteSpace: 'nowrap',
                        }}>{`x${order.pieces}`}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {currencyFormat(order.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell
                      sx={{
                        fontSize: '18px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                      }}>
                      {currencyFormat(orderData?.total)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </ModalBox>
      </Modal>
    </>
  );
};

export default OrderModal;
