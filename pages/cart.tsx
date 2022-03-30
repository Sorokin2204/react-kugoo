import { Box, Container, styled, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BreadcrumbsCustom from '../component/common/BreadcrumbsCustom';
import CartClientInfo from '../component/common/Cart/CartClientInfo';
import CartDeliveryInfo from '../component/common/Cart/CartDeliveryInfo';
import CartProducts from '../component/common/Cart/CartProducts';
import CartSidebar from '../component/common/Cart/CartSidebar';
import useAppConfig from '../hooks/useAppConfig';

type Props = {};

const CartGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 285px',
  columnGap: theme.spacing(30),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr ',
  },
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

type IFormType = {
  city: string;
  street: string;
  buildingNumber: number;
  buildingPart: number;
  buildingFlat: number;
  buildingIndex: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  comment: string;
};

const CartPage: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const { cartProducts } = useAppConfig();
  const [stepCheckout, setStepCheckout] = useState(false);
  const formCheckout = useForm<IFormType>({
    mode: 'onChange',
    defaultValues: {
      city: '',
      street: '',
      buildingNumber: undefined,
      buildingPart: undefined,
      buildingFlat: undefined,
      buildingIndex: undefined,
      name: '',
      surname: '',
      phone: '',
      email: '',
      comment: '',
    },
  });

  return (
    <Container>
      {cartProducts.length === 0 ? (
        <Typography
          variant="h2"
          sx={(theme) => ({
            py: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.grey[600],
            [theme.breakpoints.down('md')]: {
              py: 100,
            },
          })}>
          Корзина пуста
        </Typography>
      ) : (
        <>
          <BreadcrumbsCustom
            data={[
              { url: '/', name: 'Главная' },
              { url: '/cart', name: 'Корзина' },
            ]}
          />
          <Typography
            variant="h1"
            sx={{ textTransform: 'uppercase', mb: 2.5, mt: 25 }}>
            Моя корзина
          </Typography>
          <Typography
            variant="t3"
            sx={{ display: 'block', color: theme.palette.grey[600], mb: 20 }}>
            {`${_.sumBy(cartProducts, 'pieces')} товаров`}
          </Typography>
          <CartGrid sx={{ mb: 50 }}>
            <CartContent>
              {!stepCheckout ? (
                <CartProducts />
              ) : (
                <form autoComplete="off">
                  <CartStep>
                    <CartStepTitle variant="h4b">
                      <span>Шаг 1.</span> Укажите адрес доставки
                    </CartStepTitle>
                    <CartDeliveryInfo form={formCheckout} />
                  </CartStep>
                  <CartStep>
                    <CartStepTitle variant="h4b">
                      <span>Шаг 2.</span> Укажите данные получателя
                    </CartStepTitle>
                    <CartClientInfo form={formCheckout} />
                  </CartStep>
                </form>
              )}
            </CartContent>
            <CartSidebar
              form={formCheckout}
              setStepCheckout={setStepCheckout}
              stepCheckout={stepCheckout}
            />
          </CartGrid>
        </>
      )}
    </Container>
  );
};

export default CartPage;
