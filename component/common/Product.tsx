import { useLazyQuery } from '@apollo/client';
import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { GET_DEFAULT_PRODUCT_ATTRIBUTES } from '../../graphql/query/attribute';
import { withSnackbar } from '../../hooks/useAlert';
import useAppConfig from '../../hooks/useAppConfig';
import { Product } from '../../types/graphql';
import { currencyFormat } from '../../utils/currencyFormat';
import ButtonIcon from './ButtonIcon';
type Props = {
  data: Product;
  inCart: boolean;
};

export const specIcons = [
  '/static/icons/spec-1.svg',
  '/static/icons/spec-2.svg',
  '/static/icons/spec-3.svg',
  '/static/icons/spec-4.svg',
];

export type ProductType = {
  title: string;
  oldPrice: number;
  newPrice: number;
  spec: Array<{ name: string; icon: string }>;
  image: string;
  views: number;
  buyers: number;
  vendorCode: string;
  tag: {
    name: string;
    color: string;
  };
};

const Product: React.FC<Props> = ({ data, snackbarShowMessage, inCart }) => {
  const theme = useTheme();
  const router = useRouter();
  const { addingInCart, cartProducts, deleteInCart } = useAppConfig();
  const [getDefaultProductAttributes, { data: defaultProductAttrs }] =
    useLazyQuery(GET_DEFAULT_PRODUCT_ATTRIBUTES);

  const handleDeleteFromCart = (productId: string) => {
    let cartIds: string[] = [];
    cartProducts.map((cartProd) => {
      if (cartProd.productId === productId) {
        cartIds.push(cartProd._id);
      }
    });
    deleteInCart(cartIds);
    snackbarShowMessage(`Товар удален из корзины`, 'error', 2000, <Delete />);
  };

  const handleAddToCart = (
    event: MouseEvent,
    productId: string,
    price: number,
    callback: () => {},
  ) => {
    getDefaultProductAttributes({
      variables: {
        productId,
      },
    })
      .then((dataDefault) => {
        let total: number = price;
        let attributes = [];
        dataDefault.data.getDefaultProductAttributes.map(
          (defaultAttrOpt: AttributeOption) => {
            total += parseInt(
              defaultAttrOpt?.customPrice ?? defaultAttrOpt?.node?.defaultPrice,
            );
            attributes.push({
              attr: defaultAttrOpt.node.Attribute._id,
              attrOpt: defaultAttrOpt.node._id,
            });
          },
        );

        addingInCart({
          totalPrice: total,
          productId: productId,
          attributes: attributes,
          pieces: 1,
        });
        callback();
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  };
  return (
    <ProductCard
      sx={{ cursor: 'pointer' }}
      onClick={() => router.push(`/catalog/${data.slug}`)}>
      <Header
        sx={{
          '& .lazy-load-image-background': {
            display: 'block !important',
            margin: '0 auto',
            '& img': {
              width: '100%',
              objectFit: 'contain',
            },
          },
        }}>
        <LazyLoadImage
          style={{
            img: {
              display: 'block',
              background: '#F0F1F5',
              maxWidth: '100% ',
              width: '100% ',
              height: 'auto',
              margin: '0 auto',
            },
          }}
          effect="blur"
          alt={data.slug}
          height={'182px'}
          src={
            data.images?.length !== 0
              ? `/static/products/${data.images[data.images.length - 1]?.name}`
              : '/static/common/preview-product.jpg'
          }
          // width={'256px'}
        />
      </Header>
      <Content sx={{ pt: 0, px: 12, pb: 0 }}>
        <Title variant="t1bb">{data.name}</Title>
        <SpecList container spacing={9} sx={{ mb: 13, mt: 'auto' }}>
          {data.SpecOptions.edges.map((specOpt, i) => (
            <SpecItem
              item
              xs={6}
              key={i}
              icon={specIcons[i]}
              iconsize={theme.spacing(9)}>
              {specOpt.node.name.replace('*', '').replace('до', '')}
            </SpecItem>
          ))}
        </SpecList>
      </Content>
      <Actions sx={{ pb: 10, px: 12, pt: 0 }}>
        <PriceBox>
          {data?.discountPrice ? (
            <>
              <OldPrice variant="t4b">{currencyFormat(data.price)}</OldPrice>
              <NewPrice variant="h4bb">
                {currencyFormat(data?.discountPrice)}
              </NewPrice>
            </>
          ) : (
            <>
              <NewPrice variant="h4bb">{currencyFormat(data.price)}</NewPrice>
            </>
          )}
        </PriceBox>
        <ButtonIcon
          active={inCart}
          variant="border"
          iconw={theme.spacing(9)}
          iconh={theme.spacing(9)}
          icon={'/static/icons/cart.svg'}
          iconactive={'/static/icons/cart-fill.svg'}
          iconcolor={theme.palette.primary.main}
          sizebtn={theme.spacing(20)}
          onClick={(e) => {
            e.stopPropagation();
            inCart
              ? handleDeleteFromCart(data._id)
              : handleAddToCart(e, data._id, data.price, () => {
                  snackbarShowMessage(`Товар добавлен в корзину`);
                });
          }}></ButtonIcon>

        <BtnBuy
          variant="containedSmall"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(e, data._id, data.price, () => {
              router.push('/cart');
            });
          }}>
          Купить в 1 клик
        </BtnBuy>
      </Actions>
    </ProductCard>
  );
};

export default withSnackbar(Product);
const ProductCard = styled(Card)(({ theme }) => ({
  border: `1.5px solid #EAEBED`,
  boxShadow: 'none',
  backgroundColor: theme.palette.common.white,
  maxWidth: '300px',
  width: '100%',
  // height: '100vh',
  // maxHeight: '472px',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));
const Header = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxHeight: '230px',
}));
const Tag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(5),
  left: theme.spacing(5),
  ...theme.typography.t4b,
  color: theme.palette.common.white,
  borderRadius: '5px',
}));
const BtnCompare = styled(ButtonIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(5),
}));
const Content = styled(CardContent)(({ theme }) => ({}));
const Title = styled(Typography)(({ theme }) => ({
  display: 'block',
  textAlign: 'left',
  marginTop: theme.spacing(10),
}));
const SpecList = styled(Grid)(({ theme }) => ({
  justifyContent: 'space-between',
}));
export const SpecItem = styled(Grid)<{ icon: string; iconsize: string }>(
  ({ theme, icon, iconsize }) => ({
    ...theme.typography.t3,
    color: theme.palette.grey[600],
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      display: 'block',
      background: `url(${icon}) no-repeat 0 0/contain`,
      width: iconsize,
      height: iconsize,
      minWidth: iconsize,
      minHeight: iconsize,
      marginRight: theme.spacing(5),
    },
  }),
);
const Actions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 'auto',
}));
const PriceBox = styled(Box)(({ theme }) => ({
  flexGrow: '1',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
}));
const OldPrice = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  textDecoration: 'line-through',
  textAlign: 'left',
}));
const NewPrice = styled(Typography)(({ theme }) => ({}));
const BtnCart = styled(ButtonIcon)(({ theme }) => ({}));
const BtnFavorite = styled(ButtonIcon)(({ theme }) => ({
  marginLeft: theme.spacing(5) + '!important',
}));
const BtnBuy = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(8),

  marginLeft: '0 !important',
  flexBasis: '100%',
}));
const MainMedia = styled(Image)(({ theme }) => ({
  background: '#F0F1F5',
  maxWidth: '100% ',
  width: '100% ',
  height: 'auto',
}));
