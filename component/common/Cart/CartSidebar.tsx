import React from 'react';
import { Box, Button, styled, Typography, useTheme } from '@mui/material';
import FilterCheckbox from '../FilterCheckbox';

type Props = {};
const TotalConfirm = styled(Box)(({ theme }) => ({}));

const CartSidebarBox = styled(Box)(({ theme }) => ({}));

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
const CartSidebar: React.FC<Props> = ({}) => {
  const theme = useTheme();
  return (
    <CartSidebarBox>
      <Total sx={{ px: 13, pb: 13, pt: 9 }}>
        <TotalText variant="t4">Итого</TotalText>
        <TotalPrice variant="h3">58 800 ₽</TotalPrice>
        <TotalList sx={{ pt: 7, pb: 10, mt: 5, mb: 10 }}>
          <TotalItem>
            <TotalItemName variant="t4">Стоимость товаров</TotalItemName>
            <TotalItemPrice variant="t2b">58 800 ₽</TotalItemPrice>
          </TotalItem>
          <TotalItem>
            <TotalItemName variant="t4">Сумма скидки</TotalItemName>
            <TotalItemPrice variant="t2b">8 000 ₽</TotalItemPrice>
          </TotalItem>
          <TotalItem>
            <TotalItemName variant="t4">Итого без учета доставки</TotalItemName>
            <TotalItemPrice variant="t2b">50 800 ₽</TotalItemPrice>
          </TotalItem>
        </TotalList>
        <TotalBtnOrder variant="contained">Оформить заказ</TotalBtnOrder>
        <FilterCheckbox
          sx={{
            '& .MuiTypography-root': {
              ...theme.typography.t4,
              lineHeight: '14px',
            },
            '& .MuiCheckbox-root': {
              '& span:before': {
                marginTop: '2px',
                marginRight: '12px',
              },
              alignSelf: 'flex-start',
            },
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
