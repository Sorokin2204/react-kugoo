import { useLazyQuery } from '@apollo/client';
import { Delete } from '@mui/icons-material';
import {
  Box,
  Link as LinkMUI,
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
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS_FORM_CART } from '../../../graphql/query/product';
import { withSnackbar } from '../../../hooks/useAlert';
import useAppConfig from '../../../hooks/useAppConfig';
import { Product } from '../../../types/graphql';
import { currencyFormat } from '../../../utils/currencyFormat';
import { groupBy } from '../../../utils/groupBy';
import ButtonIcon from '../ButtonIcon';
import QuantityInput from '../QuantityInput';
import SelectCustom from '../SelectCustom';

type Props = {};
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0)];

const TableContainerCustom = styled(TableContainer)(({ theme }) => ({}));
const TableCustom = styled(Table)(({ theme }) => ({}));
const TableHeadCustom = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  '& .MuiTableCell-root ': {
    padding: `${theme.spacing(6)} ${theme.spacing(0)} !important`,
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

  textAlign: 'center',
  padding: `${theme.spacing(20)} 0 ${theme.spacing(17)} 0`,
  [theme.breakpoints.down('xs')]: {
    padding: `${theme.spacing(15)} 0 ${theme.spacing(15)} 0`,
  },
}));
const TableBodyCustom = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root:nth-child(odd)': {
    borderTop: '1px solid rgba(93, 108, 123, 0.2) !important',
  },

  '& .MuiTableRow-root:first-child': {
    borderTop: 'none !important',
  },

  '& .MuiTableCell-root ': {
    '&:first-child': {
      textAlign: 'left',
    },
    '&:last-child': {
      borderRadius: '0 5px 5px 0',
    },
  },
}));

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
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
const CartItemContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
}));
const CartItemTitle = styled(LinkMUI)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.black,
  flexBasis: '100%',
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('xs')]: {
    ...theme.typography.t3b,
  },
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

const CartProducts: React.FC<Props> = ({ snackbarShowMessage }) => {
  const theme = useTheme();
  const { cartProducts, updateInCart, deleteInCart } = useAppConfig();
  const [groupAttributes, setGroupAttributes] = useState([]);
  const [cartProductPrice, setCartProductPrice] = useState<
    Array<{ _id: string; totalPrice: number }>
  >([]);
  const [getAllProductsFromCart, { data, loading }] = useLazyQuery(
    GET_ALL_PRODUCTS_FORM_CART,
  );

  function refreshTotalPrice(cartProduct) {
    if (data) {
      let totalPrice = 0;
      const product = data?.getAllProductFromCart.find(
        (prod) => prod._id === cartProduct.productId,
      );
      product.AttributeOptions.edges.map((attrOpt) => {
        const priceAttrOpt = cartProduct.attributes.find(
          (attr) => attr.attrOpt === attrOpt.node._id,
        );
        if (priceAttrOpt) {
          totalPrice += attrOpt.node.defaultPrice;
        }
      });
      return totalPrice + product.price;
    }
  }

  useEffect(() => {
    getAllProductsFromCart({
      variables: {
        productsFromCart: cartProducts,
      },
    }).catch((err) => console.log(JSON.stringify(err, null, 2)));
  }, []);

  return (
    <>
      <TableContainerCustom>
        <TableCustom aria-label="simple table">
          <TableHeadCustom>
            <TableRowCustom>
              <TableCellCustom
                sx={{
                  width: '100%',
                  '&.MuiTableCell-root': { paddingLeft: '20px !important' },
                }}>
                Товар
              </TableCellCustom>
              <TableCellCustom
                align="right"
                sx={{ maxWidth: theme.spacing(55) }}>
                Количество
              </TableCellCustom>
              <TableCellCustom
                align="right"
                sx={{ maxWidth: theme.spacing(50) }}>
                Сумма
              </TableCellCustom>
              <TableCellCustom
                align="right"
                sx={{ maxWidth: 10 }}></TableCellCustom>
            </TableRowCustom>
          </TableHeadCustom>
          <TableBodyCustom>
            {!loading &&
              cartProducts &&
              data?.getAllProductFromCart &&
              cartProducts?.map((cartProduct) => {
                const product: Product = data?.getAllProductFromCart.find(
                  (prod) => prod._id === cartProduct.productId,
                );
                return (
                  <>
                    <TableRowCustom key={product._id} sx={{ width: '100%' }}>
                      <TableCellCustom scope="row">
                        <CartItem>
                          <CartItemImage
                            src={
                              product.images.length !== 0
                                ? `/static/products/${product.images[0].name}`
                                : '/static/preview-product.jpg'
                            }
                          />
                          <CartItemContent>
                            <Link
                              href={`/${product.Category.slug}/${product.slug}`}>
                              <CartItemTitle
                                href={`/${product.Category.slug}/${product.slug}`}
                                variant="h4b">
                                {product.name}
                              </CartItemTitle>
                            </Link>

                            <CartItemStock variant="t4">
                              В наличии
                            </CartItemStock>
                          </CartItemContent>
                        </CartItem>
                      </TableCellCustom>
                      <TableCellCustom
                        align="right"
                        sx={{
                          px: 10,
                          [theme.breakpoints.down('sm')]: {
                            px: 5,
                          },
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            minWidth: '100px',
                          }}>
                          <QuantityInput
                            onChangeNumber={(value) => {
                              updateInCart({ ...cartProduct, pieces: value });
                            }}
                            defaultValue={cartProduct.pieces}
                          />
                        </Box>
                      </TableCellCustom>
                      <TableCellCustom
                        align="right"
                        sx={{
                          px: 10,
                          [theme.breakpoints.down('sm')]: {
                            px: 5,
                          },
                        }}>
                        <Typography
                          variant="h4b"
                          sx={{
                            whiteSpace: 'nowrap',
                            [theme.breakpoints.down('xs')]: {
                              ...theme.typography.t3b,
                            },
                          }}>
                          {currencyFormat(
                            cartProduct.totalPrice * cartProduct.pieces,
                          )}
                        </Typography>
                      </TableCellCustom>
                      <TableCellCustom
                        align="right"
                        sx={{
                          px: 10,
                          [theme.breakpoints.down('sm')]: {
                            px: 5,
                          },
                        }}>
                        <ButtonIcon
                          onClick={() => {
                            deleteInCart(cartProduct._id);
                            snackbarShowMessage(
                              `Товар удален из корзины`,
                              'error',
                              2000,
                              <Delete />,
                            );
                          }}
                          icon="/static/icons/delete.svg"
                          iconW="15px"
                          iconH="16px"
                          padding="0"
                          iconColor={theme.palette.grey[600]}></ButtonIcon>
                      </TableCellCustom>
                    </TableRowCustom>
                    <TableRowCustom>
                      <TableCellCustom
                        colSpan={4}
                        sx={{
                          p: 0,
                          [theme.breakpoints.down('sm')]: {
                            p: 0,
                          },
                        }}>
                        <SpecBox
                          sx={{
                            px: 5,
                            py: 8,
                            mb: 20,
                            [theme.breakpoints.down('sm')]: {
                              mb: 15,
                            },
                          }}>
                          <SpecList>
                            {groupBy(product?.AttributeOptions?.edges).map(
                              (attr, attrIndex) => {
                                const defaultOption =
                                  cartProduct.attributes.find(
                                    (cartAttr) => cartAttr.attr === attr._id,
                                  );

                                return (
                                  <SpecItem key={attr._id}>
                                    <SpecSelect
                                      sx={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'pre',
                                      }}
                                      typeSelect="rounded"
                                      beforeText={`${attr.name}:`}
                                      defaultValue={defaultOption?.attrOpt}
                                      attrId={attr._id}
                                      onChange={(event) => {
                                        let totalPrice;
                                        const updatedProduct = {
                                          ...cartProduct,
                                          attributes:
                                            cartProduct.attributes.map(
                                              (cartAttr) =>
                                                cartAttr.attr === attr._id
                                                  ? {
                                                      ...cartAttr,
                                                      attrOpt:
                                                        event.target.value,
                                                    }
                                                  : cartAttr,
                                            ),
                                        };
                                        updatedProduct.totalPrice =
                                          refreshTotalPrice(updatedProduct);

                                        updateInCart(updatedProduct);
                                      }}>
                                      {attr.attrOpts.map((attrOpt, i) => (
                                        <MenuItem
                                          key={attrOpt._id}
                                          value={attrOpt._id}>
                                          {attrOpt.label}
                                        </MenuItem>
                                      ))}
                                    </SpecSelect>
                                  </SpecItem>
                                );
                              },
                            )}
                          </SpecList>
                        </SpecBox>
                      </TableCellCustom>
                    </TableRowCustom>
                  </>
                );
              })}
          </TableBodyCustom>
        </TableCustom>
      </TableContainerCustom>
    </>
  );
};

export default withSnackbar(CartProducts);
