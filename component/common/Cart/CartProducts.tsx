import React, { useEffect, useState } from 'react';
import {
  Box,
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
  Link as LinkMUI,
} from '@mui/material';
import SelectCustom from '../SelectCustom';
import { productData } from '../Catalog';
import QuantityInput from '../QuantityInput';
import ButtonIcon from '../ButtonIcon';
import { specData } from '../../../pages/[categorySlug]/[productSlug]';
import { currencyFormat } from '../../../utils/currencyFormat';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_FORM_CART } from '../../../graphql/query/product';
import useAppConfig from '../../../hooks/useAppConfig';
import { groupBy } from '../../../utils/groupBy';
import { withSnackbar } from '../../../hooks/useAlert';
import { Delete } from '@mui/icons-material';
import Link from 'next/link';
import { Product } from '../../../types/graphql';

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
const CartItemTitle = styled(LinkMUI)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.black,
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

  useEffect(() => {
    console.log('PRICES', cartProductPrice);
  }, [cartProductPrice]);

  function refreshTotalPrice(cartProduct) {
    // setCartProductPrice([]);
    if (data) {
      // cartProducts?.map((cartProduct) => {
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
      // setCartProductPrice((prev) => {
      //   return [
      //     ...prev,
      //     {
      //       _id: cartProduct._id,
      //       totalPrice: (totalPrice + product.price) * cartProduct.pieces,
      //     },
      //   ];
      // });
      // });
    }
  }

  // useEffect(() => {
  //   refreshTotalPrice();
  // }, [cartProducts, data]);

  useEffect(() => {
    console.log('CART CACHE IN CART POPOVER', cartProducts);

    getAllProductsFromCart({
      variables: {
        productsFromCart: cartProducts,
      },
    })
      .then((dataSuccess) => {
        console.log('Cart data', dataSuccess);
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  }, []);

  return (
    <>
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
            {!loading &&
              cartProducts &&
              data?.getAllProductFromCart &&
              cartProducts?.map((cartProduct) => {
                const product: Product = data?.getAllProductFromCart.find(
                  (prod) => prod._id === cartProduct.productId,
                );
                return (
                  <>
                    <TableRowCustom key={product._id} sx={{}}>
                      <TableCellCustom scope="row" width="25%">
                        <CartItem>
                          <CartItemImage
                            src={`/static/products/${product.images[0].name}`}
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
                            {/* <CartItemText variant="t4">+ 2 подарка</CartItemText> */}
                          </CartItemContent>
                        </CartItem>
                      </TableCellCustom>
                      <TableCellCustom align="right" width="25%">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <QuantityInput
                            onChangeNumber={(value) => {
                              console.log('QUENTIY', value);
                              updateInCart({ ...cartProduct, pieces: value });
                            }}
                            defaultValue={cartProduct.pieces}
                          />
                        </Box>
                      </TableCellCustom>
                      <TableCellCustom align="right" width="25%">
                        <Typography variant="h4b">
                          {currencyFormat(
                            cartProduct.totalPrice * cartProduct.pieces,
                            // cartProductPrice.find(
                            //   (prod) => prod._id === cartProduct._id,
                            // )?.totalPrice ?? 0,
                          )}
                        </Typography>
                      </TableCellCustom>
                      <TableCellCustom align="right" width="25%">
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
                      <TableCellCustom colSpan={4} sx={{ p: 0 }}>
                        <SpecBox sx={{ px: 5, py: 8, mb: 20 }}>
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
                                      typeSelect="rounded"
                                      beforeText={`${attr.name}:`}
                                      defaultValue={defaultOption.attrOpt}
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
                                        // attr.attrOpts.map((attrOpt, i) => {
                                        //   const priceAttrOpt =
                                        //     updatedProduct.attributes.find(
                                        //       (attrr) =>
                                        //         attrr.attrOpt === attrOpt._id,
                                        //     );
                                        //   if (priceAttrOpt) {
                                        //     totalPrice += attrOpt.defaultPrice;
                                        //     console.log(
                                        //       'JSX',
                                        //       attrOpt.defaultPrice,
                                        //     );
                                        //   }
                                        // });
                                        console.log(attr.attrOpts);

                                        updateInCart(updatedProduct);
                                        console.log('Selected', updatedProduct);
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
