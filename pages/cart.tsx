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

type Props = {};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0)];
const CartGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 285px',
  columnGap: theme.spacing(30),
}));
const CartContent = styled(Box)(({ theme }) => ({}));
const TableContainerCustom = styled(TableContainer)(({ theme }) => ({}));
const TableCustom = styled(Table)(({ theme }) => ({}));
const TableHeadCustom = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  '& .MuiTableCell-root ': {
    padding: `${theme.spacing(6)} ${theme.spacing(10)} !important`,
    textAlign: 'center',
    '&:first-child': {
      borderRadius: '5px 0 0 5px',
      textAlign: 'left',
    },
    '&:last-child': {
      borderRadius: '0 5px 5px 0',
    },
    ...theme.typography.t4b,
  },
}));
const TableRowCustom = styled(TableRow)(({ theme }) => ({}));
const TableCellCustom = styled(TableCell)(({ theme }) => ({
  width: '1px',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  padding: `${theme.spacing(20)} 0 ${theme.spacing(17)} 0`,
}));
const TableBodyCustom = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root:nth-child(odd)': {
    borderTop: '1px solid rgba(93, 108, 123, 0.2) !important',
  },

  '& .MuiTableRow-root:first-child': {
    borderTop: 'none !important',
  },

  '& .MuiTableCell-root ': {
    // display: 'flex',

    '&:first-child': {
      textAlign: 'left',
    },
    '&:last-child': {
      borderRadius: '0 5px 5px 0',
    },
  },
}));
const CartSidebar = styled(Box)(({ theme }) => ({}));

const CartItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
const CartItemImage = styled('img')(({ theme }) => ({
  minWidth: '75px',
  width: '75px',
  maxWidth: '75px',
  minHeight: '75px',
  height: 'auto',
  maxHeight: '75px',
  borderRadius: '10px',
  objectFit: 'cover',
  marginRight: theme.spacing(10),
}));
const CartItemContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
}));
const CartItemTitle = styled(Typography)(({ theme }) => ({
  flexBasis: '100%',
  marginBottom: theme.spacing(2.5),
}));
const CartItemStock = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(8),
  color: theme.palette.grey[600],
  '&::before': {
    content: '""',
    display: 'block',
    background: theme.palette.success.main,
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    marginRight: '10px',
  },
}));
const CartItemText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

const SpecList = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  flexWrap: 'wrap',
  columnGap: '15px',
  rowGap: '10px',
}));
const SpecItem = styled(Box)(({ theme }) => ({}));
const SpecBox = styled(Box)(({ theme }) => ({
  border: '1px solid rgba(93, 108, 123, 0.1)',
  borderRadius: '5px',
}));
const SpecSelect = styled(SelectCustom)(({ theme }) => ({}));

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
const TotalConfirm = styled(Box)(({ theme }) => ({}));

const CartPage: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [sortCommon, setSortCommon] = useState('price');
  const handleChangeSortCommon = (event) => {
    setSortCommon(event.target.value);
  };

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
            <TableContainerCustom>
              <TableCustom aria-label="simple table">
                <TableHeadCustom>
                  <TableRowCustom>
                    <TableCellCustom width="25%" sx={{ minWidth: 100 }}>
                      Товар
                    </TableCellCustom>
                    <TableCellCustom align="right" width="25%">
                      Количество
                    </TableCellCustom>
                    <TableCellCustom align="right" width="25%">
                      Сумма
                    </TableCellCustom>
                    <TableCellCustom align="right" width="25%">
                      Удалить все
                    </TableCellCustom>
                  </TableRowCustom>
                </TableHeadCustom>
                <TableBodyCustom>
                  {rows.map((row) => (
                    <>
                      <TableRowCustom key={row.name} sx={{}}>
                        <TableCellCustom scope="row" width="25%">
                          <CartItem>
                            <CartItemImage src="/static/product-full.png" />
                            <CartItemContent>
                              <CartItemTitle variant="h4b">
                                {productData[0].title}
                              </CartItemTitle>
                              <CartItemStock variant="t4">
                                В наличии
                              </CartItemStock>
                              <CartItemText variant="t4">
                                + 2 подарка
                              </CartItemText>
                            </CartItemContent>
                          </CartItem>
                        </TableCellCustom>
                        <TableCellCustom align="right" width="25%">
                          <Box
                            sx={{ display: 'flex', justifyContent: 'center' }}>
                            <QuantityInput />
                          </Box>
                        </TableCellCustom>
                        <TableCellCustom align="right" width="25%">
                          <Typography variant="h4b">
                            {currencyFormat(productData[0].newPrice)}
                          </Typography>
                        </TableCellCustom>
                        <TableCellCustom align="right" width="25%">
                          <ButtonIcon
                            icon="/static/icons/delete.svg"
                            iconW="15px"
                            iconH="16px"
                            padding="0"
                            iconColor={theme.palette.grey[600]}></ButtonIcon>
                        </TableCellCustom>
                      </TableRowCustom>
                      <TableRowCustom>
                        <TableCellCustom colSpan={4} sx={{ p: 0 }}>
                          <SpecBox sx={{ px: 5, py: 8, mb: 20 }}>
                            <SpecList>
                              {specData.map((el, i) => (
                                <SpecItem key={i}>
                                  <SpecSelect
                                    typeSelect="rounded"
                                    beforeText={`${el.title}:`}
                                    data={{ list: el.list }}></SpecSelect>
                                </SpecItem>
                              ))}
                            </SpecList>
                          </SpecBox>
                        </TableCellCustom>
                      </TableRowCustom>
                    </>
                  ))}
                </TableBodyCustom>
              </TableCustom>
            </TableContainerCustom>
          </CartContent>
          <CartSidebar>
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
                  <TotalItemName variant="t4">
                    Итого без учета доставки
                  </TotalItemName>
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
          </CartSidebar>
        </CartGrid>
      </Container>
      <Box sx={{ mb: 50 }}>
        <ProductCarusel />
      </Box>
    </>
  );
};

export default CartPage;
