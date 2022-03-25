import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import ButtonIcon from './ButtonIcon';
import Image from 'next/image';
import { currencyFormat } from '../../utils/currencyFormat';
import { AttributeOption, Product } from '../../types/graphql';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLazyQuery } from '@apollo/client';
import { GET_DEFAULT_PRODUCT_ATTRIBUTES } from '../../graphql/query/attribute';
import useAppConfig from '../../hooks/useAppConfig';
import { withSnackbar } from '../../hooks/useAlert';
import { Add, Delete } from '@mui/icons-material';
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
    }).then((dataDefault) => {
      let total: number = price;
      let attributes = [];
      dataDefault.data.getDefaultProductAttributes.map(
        (defaultAttrOpt: AttributeOption) => {
          console.log(defaultAttrOpt?.defaultPrice);
          total += parseInt(defaultAttrOpt?.defaultPrice);
          attributes.push({
            attr: defaultAttrOpt.Attribute._id,
            attrOpt: defaultAttrOpt._id,
          });
        },
      );
      console.log(total);

      addingInCart({
        totalPrice: total,
        productId: productId,
        attributes: attributes,
        pieces: 1,
      });
      callback();
    });
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
          src={`/static/products/${data.images[data.images.length - 1]?.name}`}
          width={'242px'}
        />
        {/* <MainMedia
          sx={{}}
          src={`/static/products/${data.images[data.images.length - 1]?.name}`}
          width="242"
          height="182"
        /> */}
        {/* <Tag sx={{ backgroundColor: data.tag.color, px: 4.5, py: 2 }}>
          {data.tag.name}
        </Tag> */}
        {/* 
        <BtnCompare
          iconW={theme.spacing(10)}
          iconH={theme.spacing(6)}
          icon={'/static/icons/compare.svg'}
          iconColor={theme.palette.grey[600]}
          sizeBtn={theme.spacing(20)}></BtnCompare> */}
      </Header>
      <Content sx={{ pt: 10, px: 12, pb: 0 }}>
        <Title variant="t1bb" sx={{ mb: 10 }}>
          {data.name}
        </Title>{' '}
        <SpecList container spacing={9} sx={{ mb: 13 }}>
          {data.SpecOptions.edges.map((specOpt, i) => (
            <SpecItem
              item
              xs={6}
              key={i}
              icon={specIcons[i]}
              iconSize={theme.spacing(9)}>
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
        <BtnCart
          active={inCart}
          variant="border"
          iconW={theme.spacing(9)}
          iconH={theme.spacing(9)}
          icon={'/static/icons/cart.svg'}
          iconActive={'/static/icons/cart-fill.svg'}
          iconColor={theme.palette.primary.main}
          sizeBtn={theme.spacing(20)}
          onClick={(e) => {
            e.stopPropagation();
            inCart
              ? handleDeleteFromCart(data._id)
              : handleAddToCart(e, data._id, data.price, () => {
                  snackbarShowMessage(`Товар добавлен в корзину`);
                });
          }}></BtnCart>
        {/* <BtnFavorite
          variant="border"
          iconW={theme.spacing(8.5)}
          iconH={theme.spacing(7.5)}
          icon={'/static/icons/favorite.svg'}
          iconColor={theme.palette.primary.main}
          sizeBtn={theme.spacing(20)}></BtnFavorite> */}

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
  borderRadius: '10px',
}));
const Header = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxHeight: '230px',
  // background: '#F0F1F5',
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
}));
const SpecList = styled(Grid)(({ theme }) => ({
  justifyContent: 'space-between',
}));
export const SpecItem = styled(Grid)<{ icon: string; iconSize: string }>(
  ({ theme, icon, iconSize }) => ({
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
      width: iconSize,
      height: iconSize,
      minWidth: iconSize,
      minHeight: iconSize,
      marginRight: theme.spacing(5),
    },
  }),
);
const Actions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
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
