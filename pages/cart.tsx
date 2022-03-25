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
import { currencyFormat } from '../utils/currencyFormat';
import ButtonIcon from '../component/common/ButtonIcon';
import QuantityInput from '../component/common/QuantityInput';
import { productData } from '../component/common/Catalog';
import SelectCustom from '../component/common/SelectCustom';
import { specData } from './[categorySlug]/[productSlug]';
import FilterCheckbox from '../component/common/FilterCheckbox';
import ProductCarusel from '../component/common/ProductCarusel';
import CartProducts from '../component/common/Cart/CartProducts';
import CartClientInfo from '../component/common/Cart/CartClientInfo';
import CartSidebar from '../component/common/Cart/CartSidebar';
import CartDeliveryInfo from '../component/common/Cart/CartDeliveryInfo';
import CartDeliveryChoice from '../component/common/Cart/CartDeliveryChoice';
import CartPaymentChoice from '../component/common/Cart/CartPaymentChoice';
import { useForm } from 'react-hook-form';
import useAppConfig from '../hooks/useAppConfig';
import _ from 'lodash';

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

  const onSubmit = (dataSubmit) => {
    console.log('Submit Data', dataSubmit);
  };
  if (cartProducts.length === 0) {
    return (
      <>
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
      </>
    );
  }
  return (
    <>
      <Container>
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
              <form
                onSubmit={formCheckout.handleSubmit(onSubmit)}
                autoComplete="off">
                {/* <CartStep>
                  <CartStepTitle variant="h4b">
                    <span>Шаг 1.</span> Выберите способ доставки
                  </CartStepTitle>
                  <CartDeliveryChoice />
                </CartStep> */}
                <CartStep>
                  <CartStepTitle variant="h4b">
                    <span>Шаг 2.</span> Укажите адрес доставки
                  </CartStepTitle>
                  <CartDeliveryInfo form={formCheckout} />
                </CartStep>
                <CartStep>
                  <CartStepTitle variant="h4b">
                    <span>Шаг 3.</span> Укажите данные получателя
                  </CartStepTitle>{' '}
                  <CartClientInfo form={formCheckout} />
                </CartStep>
                {/* <CartStep>
                  <CartStepTitle variant="h4b">
                    <span>Шаг 4.</span> Выберите способ оплаты
                  </CartStepTitle>
                  <CartPaymentChoice />
                </CartStep> */}
              </form>
            )}
          </CartContent>
          <CartSidebar
            form={formCheckout}
            setStepCheckout={setStepCheckout}
            stepCheckout={stepCheckout}
          />
        </CartGrid>
      </Container>
      <Box sx={{ mb: 50 }}>{/* <ProductCarusel /> */}</Box>
    </>
  );
};

export default CartPage;
