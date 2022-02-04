import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import BreadcrumbsCustom from '../component/common/BreadcrumbsCustom';
import { currencyFormat } from '../component/common/Header/components/CartPopover';
import ButtonIcon from '../component/common/ButtonIcon';
import QuantityInput from '../component/common/QuantityInput';
import { productData } from '../component/common/Catalog';
import SelectCustom from '../component/common/SelectCustom';
import { specData } from './catalog/[id]';
import FilterCheckbox from '../component/common/FilterCheckbox';
import ProductCarusel from '../component/common/ProductCarusel';
import CartProducts from '../component/common/Cart/CartProducts';
import CartClientInfo from '../component/common/Cart/CartClientInfo';
import CartSidebar from '../component/common/Cart/CartSidebar';
import CartDeliveryInfo from '../component/common/Cart/CartDeliveryInfo';
import CartDeliveryChoice from '../component/common/Cart/CartDeliveryChoice';
import CartPaymentChoice from '../component/common/Cart/CartPaymentChoice';

type Props = {};

const CartGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 285px',
  columnGap: theme.spacing(30),
}));
const CartContent = styled(Box)(({ theme }) => ({}));

const CartStep = styled(Box)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(25),
  },
}));
const CartStepTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(15),
  '& span': {
    color: theme.palette.primary.main,
  },
}));

const CartPage: React.FC<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <Container>
        <BreadcrumbsCustom />
        <Typography
          variant="h1"
          sx={{ textTransform: 'uppercase', mb: 2.5, mt: 25 }}>
          Моя корзина
        </Typography>
        <Typography
          variant="t3"
          sx={{ display: 'block', color: theme.palette.grey[600], mb: 20 }}>
          2 товара
        </Typography>
        <CartGrid sx={{ mb: 50 }}>
          <CartContent>
            <CartStep>
              <CartStepTitle variant="h4b">
                <span>Шаг 1.</span> Выберите способ доставки
              </CartStepTitle>
              <CartDeliveryChoice />
            </CartStep>
            <CartStep>
              <CartStepTitle variant="h4b">
                <span>Шаг 2.</span> Укажите адрес доставки
              </CartStepTitle>
              <CartDeliveryInfo />
            </CartStep>
            <CartStep>
              <CartStepTitle variant="h4b">
                <span>Шаг 3.</span> Укажите данные получателя
              </CartStepTitle>{' '}
              <CartClientInfo />
            </CartStep>
            <CartStep>
              <CartStepTitle variant="h4b">
                <span>Шаг 4.</span> Выберите способ оплаты
              </CartStepTitle>
              <CartPaymentChoice />
            </CartStep>
          </CartContent>
          <CartSidebar />
        </CartGrid>
      </Container>
      <Box sx={{ mb: 50 }}>
        <ProductCarusel />
      </Box>
    </>
  );
};

export default CartPage;
