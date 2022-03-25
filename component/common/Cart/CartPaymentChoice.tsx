import { styled, Typography } from '@mui/material';
import React from 'react';
import RadioBlock from '../Catalog/RadioBlock';
import {
  PayImage,
  PayItem,
  PayList,
} from '../Footer.tsx/components/FooterBottom';

type Props = {};

const RadioText = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginTop: '6px',
}));

const deliveryChoiceData = [
  {
    list: [
      {
        label: 'Картой',
        value: 'credit-cart',
        content: (
          <>
            <PayList sx={{ marginTop: '10px' }}>
              <PayItem>
                <PayImage src="/static/icons/google-pay.svg" />
              </PayItem>
              <PayItem>
                <PayImage src="/static/icons/apple-pay.svg" />
              </PayItem>
              <PayItem>
                <PayImage src="/static/icons/visa.svg" />
              </PayItem>
              <PayItem>
                <PayImage src="/static/icons/mastercard.svg" />
              </PayItem>
              <PayItem>
                <PayImage src="/static/icons/maestro.svg" />
              </PayItem>
            </PayList>
          </>
        ),
      },
      {
        label: 'Наличными',
        value: 'cash',
        content: (
          <>
            <RadioText variant="t4">
              Курьеру, в магазине или
              <br />
              при доставке CDEK
            </RadioText>
          </>
        ),
      },
      {
        label: 'Через интернет-банкинг по счету',
        value: 'self-deliveee',
        content: (
          <>
            <RadioText variant="t4">
              Менеджер свяжется с вами, чтобы выставить счет
            </RadioText>
          </>
        ),
      },
      {
        label: 'Онлайн на сайте',
        value: 'self-deliveeee',
        content: (
          <>
            <RadioText variant="t4">
              После оформления заказа вы будете перенаправлены на страницу
              оплаты
            </RadioText>
          </>
        ),
      },
      {
        label: 'В рассрочку',
        value: 'self-deliveeee',
        content: (
          <>
            <RadioText variant="t4">
              После оформления заказа c вами свяжется менеджер.
            </RadioText>
          </>
        ),
      },
      {
        label: 'В кредит от «Сбербанка»',
        value: 'self-deliveeee',
        content: (
          <>
            <RadioText variant="t4">
              С условиями можно ознакомиться на сайте банка
            </RadioText>
          </>
        ),
      },
    ],
  },
];

const CartPaymentChoice: React.FC<Props> = ({}) => {
  return (
    <>
      <RadioBlock data={deliveryChoiceData[0]} />
    </>
  );
};

export default CartPaymentChoice;
