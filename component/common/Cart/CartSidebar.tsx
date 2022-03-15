import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Button, styled, Typography, useTheme } from '@mui/material';
import FilterCheckbox from '../FilterCheckbox';
import useAppConfig from '../../../hooks/useAppConfig';
import { currencyFormat } from '../../../utils/currencyFormat';
import _ from 'lodash';
import { CREATE_ORDER } from '../../../graphql/mutation/order';
import { useMutation } from '@apollo/client';

type Props = {
  setStepCheckout: Dispatch<SetStateAction<boolean>>;
  stepCheckout: boolean;
  form: UseFormReturn;
};
const TotalConfirm = styled(Box)(({ theme }) => ({}));

const CartSidebarBox = styled(Box)(({ theme }) => ({
  maxWidth: '285px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    justifySelf: 'flex-end',
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: 'none',
  },
}));

const Total = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
}));
const TotalText = styled(Typography)(({ theme }) => ({}));
const TotalPrice = styled(Typography)(({ theme }) => ({}));
const TotalList = styled(Box)(({ theme }) => ({
  borderTop: '1px solid rgba(40, 39, 57, 0.1)',
  borderBottom: '1px solid rgba(40, 39, 57, 0.1)',
}));
const TotalItem = styled(Box)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(5),
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
const TotalItemName = styled(Typography)(({ theme }) => ({}));
const TotalItemPrice = styled(Typography)(({ theme }) => ({}));
const TotalBtnOrder = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(7.5),

  width: '100%',
}));
const CartSidebar: React.FC<Props> = ({
  setStepCheckout,
  stepCheckout,
  form,
}) => {
  const theme = useTheme();
  const { cartProducts } = useAppConfig();
  const [totalPrice, setTotalPrice] = useState<number | null>();
  const [confirm, setConfirm] = useState(false);
  const [newOrder] = useMutation(CREATE_ORDER);
  useEffect(() => {
    // let total = cartProducts.map(
    //   (cartProd) => cartProd.totalPrice * cartProd.pieces,
    // );
    let total = _.sumBy(cartProducts, (item) => item.totalPrice * item.pieces);
    setTotalPrice(total);
  }, [cartProducts]);

  const onSubmit = (data) => {
    console.log(data);
    newOrder({
      variables: {
        orderInfo: {
          ...data,
          phone: parseInt(data.phone),
          buildingIndex: parseInt(data.buildingIndex),
        },
        productsInfo: cartProducts,
      },
    }).catch((err) => console.log(JSON.stringify(err, 2, null)));
  };

  return (
    <CartSidebarBox>
      <Total sx={{ px: 13, pb: 13, pt: 9 }}>
        <TotalText variant="t4">Итого</TotalText>
        <TotalPrice variant="h3">{currencyFormat(totalPrice)}</TotalPrice>
        <TotalList sx={{ pt: 7, pb: 10, mt: 5, mb: 10 }}>
          <TotalItem>
            <TotalItemName variant="t4">Стоимость товаров</TotalItemName>
            <TotalItemPrice variant="t2b">
              {currencyFormat(totalPrice)}
            </TotalItemPrice>
          </TotalItem>
          {/* <TotalItem>
            <TotalItemName variant="t4">Сумма скидки</TotalItemName>
            <TotalItemPrice variant="t2b">8 000 ₽</TotalItemPrice>
          </TotalItem>
          <TotalItem>
            <TotalItemName variant="t4">Итого без учета доставки</TotalItemName>
            <TotalItemPrice variant="t2b">50 800 ₽</TotalItemPrice>
          </TotalItem> */}
        </TotalList>
        {!stepCheckout ? (
          <TotalBtnOrder
            onClick={() => {
              setStepCheckout(true);
            }}
            variant="contained">
            Оформить заказ
          </TotalBtnOrder>
        ) : (
          <TotalBtnOrder
            {...(confirm && { onClick: form.handleSubmit(onSubmit) })}
            variant="contained">
            Подтвердить заказ
          </TotalBtnOrder>
        )}

        <FilterCheckbox
          sx={{
            '& .MuiTypography-root': {
              ...theme.typography.t4,
              lineHeight: '14px',
              userSelect: 'none',
            },
            '& .MuiCheckbox-root': {
              '& span:before': {
                marginTop: '2px',
                marginRight: '12px',
              },
              alignSelf: 'flex-start',
            },
          }}
          onChange={() => {
            setConfirm(!confirm);
          }}
          data={[
            {
              value: 'confirm',
              label:
                'Нажимая на кнопку, вы соглашаетесь на обработку персональных данных и политикой конфиденциальности',
            },
          ]}
        />
      </Total>
    </CartSidebarBox>
  );
};

export default CartSidebar;
