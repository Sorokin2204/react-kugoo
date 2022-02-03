import React from 'react';
import {
  Box,
  Button,
  Grid,
  Popover,
  PopoverProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import styledComp from 'styled-components';
import ButtonIcon from '../../ButtonIcon';
type Props = {};

type CartDataType = {
  image: string;
  name: string;
  price: number;
  piece: number;
};

const cartData: CartDataType[] = [
  {
    image: '/static/product-full.png',
    name: 'Kugoo Kirin M4',
    price: 29.9,
    piece: 1,
  },
  {
    image: '/static/product-full.png',
    name: 'Kugoo Kirin M4',
    price: 29.9,
    piece: 1,
  },
  {
    image: '/static/product-full.png',
    name: 'Kugoo Kirin M4',
    price: 29.9,
    piece: 1,
  },
];

const CartPopoverStyled = styled(Popover)(({ theme }) => ({}));
const CartHead = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
const CartWrapper = styled(Box)(({ theme }) => ({
  minWidth: theme.spacing(150),
}));
const CartTitle = styled(Typography)(({ theme }) => ({}));
const CartCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));
const CartList = styled(Grid)(({ theme }) => ({
  zIndex: 1,
  position: 'relative',
  maxHeight: theme.spacing(100),
  overflow: 'scroll',
  backgroundColor: theme.palette.common.white,
}));
const CartItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& + &': {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
}));
const CartItemImage = styledComp.img`
    
`;
const CartItemBody = styled(Grid)(({ theme }) => ({}));
const CartItemImageBox = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[300],
  minWidth: theme.spacing(25),
  minHeight: theme.spacing(25),
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const CartItemTitle = styled(Typography)(({ theme }) => ({
  flexBasis: '100%',
}));
const CartItemPrice = styled(Typography)(({ theme }) => ({}));
const CartItemPiece = styled(Typography)(({ theme }) => ({}));
const CartItemDelete = styled(ButtonIcon)(({ theme }) => ({}));
const CartFooter = styled(Box)(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  boxShadow: '0px -4px 50px rgba(0, 0, 0, 0.1)',
  display: 'flex',
}));

const CartTotalText = styled(Typography)(({ theme }) => ({}));
const CartTotalBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const CartTotalPrice = styled(Typography)(({ theme }) => ({}));
const CartButton = styled(Button)(({ theme }) => ({
  flexGrow: '1',
}));

export const currencyFormat = (price: number) =>
  `${price.toFixed(3).replace('.', ' ')} ₽`;

const CartPopover: React.FC<PopoverProps> = (props) => {
  const theme = useTheme();
  return (
    <CartPopoverStyled {...props}>
      <CartWrapper>
        <CartHead sx={{ px: 10, py: 8 }}>
          <CartTitle variant="t2b">В вашей корзине</CartTitle>
          <CartCount variant="t3">2 товара</CartCount>
        </CartHead>
        <CartList>
          {cartData.map((el, i) => (
            <CartItem key={i} sx={{ px: 9, py: 8 }}>
              <CartItemImageBox sx={{ mr: 8 }}>
                <CartItemImage src={el.image} width={54} height={40} />
              </CartItemImageBox>

              <CartItemBody container>
                <CartItemTitle variant="t3b" sx={{ mb: 1 }}>
                  {el.name}
                </CartItemTitle>
                <CartItemPrice variant="t4" sx={{ mr: 8 }}>
                  {currencyFormat(el.price)}
                </CartItemPrice>
                <CartItemPiece variant="t4">{`${el.piece} шт.`}</CartItemPiece>
              </CartItemBody>
              <CartItemDelete
                icon="/static/icons/delete.svg"
                iconW="15px"
                iconH="16px"
                padding="0"></CartItemDelete>
            </CartItem>
          ))}
        </CartList>
        <CartFooter sx={{ px: 10, py: 8 }}>
          <CartTotalBox>
            <CartTotalText sx={{ fontSize: theme.typography.t4 }}>
              Сумма:
            </CartTotalText>
            <CartTotalPrice sx={{ fontSize: theme.typography.t1b }}>
              59 800 ₽
            </CartTotalPrice>
          </CartTotalBox>

          <CartButton variant="containedSmall" sx={{ ml: 20 }}>
            Оформить заказ
          </CartButton>
        </CartFooter>
      </CartWrapper>
    </CartPopoverStyled>
  );
};

export default CartPopover;