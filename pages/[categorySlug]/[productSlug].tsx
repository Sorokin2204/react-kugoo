import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FreeMode, Navigation, Thumbs } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import BreadcrumbsCustom from '../../component/common/BreadcrumbsCustom';
import ButtonIcon from '../../component/common/ButtonIcon';
import RadioBlock from '../../component/common/Catalog/RadioBlock';
import ProductInfo from '../../component/common/ProductSingle/ProductInfo';
import { GET_PRODUCT } from '../../graphql/query/product';
import { withSnackbar } from '../../hooks/useAlert';
import useAppConfig from '../../hooks/useAppConfig';
import { currencyFormat } from '../../utils/currencyFormat';
import { groupBy } from '../../utils/groupBy';
import NotFoundPage from '../404';

type Props = {};

const Content = styled(Box)(({ theme }) => ({
  gridColumn: '2/3',
  gridRow: '1/4',
  display: 'flex',
  flexDirection: 'column',
  width: '475px',
  maxWidth: '475px',
  [theme.breakpoints.down('md')]: {
    width: 'auto',
    maxWidth: 'none',
  },
  [theme.breakpoints.down('smd')]: {
    gridColumn: '1/3',
    gridRow: '3/4',
    // marginTop: '10px',
  },
}));
const Title = styled(Typography)(({ theme }) => ({
  display: 'block',

  textTransform: 'uppercase',
}));
const Views = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',

  color: theme.palette.grey[600],
}));
const Buyers = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',

  color: theme.palette.grey[600],
}));
const VendorCode = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',

  color: theme.palette.grey[600],
  opacity: 0.7,
}));
const InStock = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
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
const BtnCompare = styled(ButtonIcon)(({ theme }) => ({}));
const BtnShare = styled(ButtonIcon)(({ theme }) => ({}));
const PriceBox = styled(Box)(({ theme }) => ({}));
const OldPrice = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.grey[600],
  textDecoration: 'line-through',
}));
const NewPrice = styled(Typography)(({ theme }) => ({
  display: 'block',
  whiteSpace: 'nowrap',
  fontSize: '25px !important',
}));
const Installment = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
}));
const InstallmentImage = styled('img')(({ theme }) => ({
  marginRight: theme.spacing(7.5),
}));
const InstallmentSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));
const InstallmentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const InstallmentConditions = styled(Typography)(({ theme }) => ({}));

const Total = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
}));
const TotalPrice = styled(Typography)(({ theme }) => ({}));
const TotalBtnFavorite = styled(ButtonIcon)(({ theme }) => ({}));
const TotalDelivary = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(20),
  '&::before': {
    content: '""',
    display: 'block',
    background: `url(/static/icons/truck.svg) no-repeat 0 0/contain`,
    width: '22px',
    height: '15px',
    position: 'absolute',
    top: '4px',
    left: 0,
  },
}));
const TotalDelivaryTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
}));
const TotalDelivarySubtitle = styled(Typography)(({ theme }) => ({
  display: 'block',
}));
const TotalBtnClick = styled(Button)(({ theme }) => ({
  flexBasis: '50%',
  marginRight: theme.spacing(10),
}));
const TotalBtnCart = styled(Button)(({ theme }) => ({ flexBasis: '50%' }));

const ProductWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 475px',
  gridTemplateRows: '500px auto',
  columnGap: theme.spacing(30),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '50% 46%',
    columnGap: theme.spacing(15),
    gridTemplateRows: '400px auto',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateRows: '300px auto',
  },
  [theme.breakpoints.down('smd')]: {
    gridTemplateColumns: '1fr ',
    columnGap: theme.spacing(0),
    rowGap: theme.spacing(5),
  },
  [theme.breakpoints.down('xs')]: {
    gridTemplateRows: '300px auto',
  },
}));
const ProductImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

type IFormType = {
  attributes: Array<{ attr: string; attrOpt: string; price: number }>;
};

const ProductPage: React.FC<Props> = ({ snackbarShowMessage }) => {
  const theme = useTheme();
  const router = useRouter();
  const [getProduct, { data, loading }] = useLazyQuery(GET_PRODUCT);
  const [groupAttributes, setGroupAttributes] = useState([]);
  const [thumbsInit, setThumbsInit] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cartProducts, addingInCart } = useAppConfig();
  const [inCart, setInCart] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const productForm = useForm<IFormType>({
    mode: 'onBlur',
    defaultValues: {
      attributes: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: productForm.control,
      name: 'attributes',
    },
  );

  useEffect(() => {
    setThumbsInit(false);
    if (!router.isReady) return;
    getProduct({
      variables: {
        productSlug: router.query.productSlug,
      },
    }).then((dataSuccess) => {
      const indexInCart = cartProducts.findIndex(
        (productInCart) =>
          productInCart.productId === dataSuccess.data.getProduct._id,
      );
      setGroupAttributes(
        groupBy(dataSuccess?.data?.getProduct?.AttributeOptions?.edges),
      );
      setInCart(indexInCart !== -1);
      setTotalPrice((prevPrice) =>
        prevPrice === 0 ? dataSuccess.data.getProduct.price : prevPrice,
      );
    });
  }, [router]);

  useEffect(() => {
    if (groupAttributes.length !== 0) {
      groupAttributes.map((attr, i) => {
        productForm.setValue(`attributes[${i}]`, {
          attr: attr._id,
          attrOpt: attr.attrOpts[0]._id,
          price:
            attr.attrOpts[0].customPrice === null
              ? attr.attrOpts[0].defaultPrice
              : attr.attrOpts[0].customPrice,
        });
      });
    }
  }, [groupAttributes]);

  const onSubmit = (dataForm: IFormType) => {
    if (typeof window !== 'undefined') {
      addingInCart({
        totalPrice: totalPrice,
        productId: data?.getProduct._id,
        attributes: dataForm.attributes.map((attr) => _.omit(attr, ['price'])),
        pieces: 1,
      });
      snackbarShowMessage('Товар добавлен в корзину');
    }
  };
  return (
    <>
      {!loading && data?.getProduct ? (
        data?.getProduct ? (
          <Container
            sx={{
              mb: 0,
              [theme.breakpoints.down('md')]: {
                mb: 0,
              },
            }}>
            {data && !loading && (
              <BreadcrumbsCustom
                data={[
                  { url: '/', name: 'Главная' },
                  {
                    name: `${data?.getProduct?.Category?.name}`,
                    url: `/${data?.getProduct?.Category?.slug}`,
                  },
                  {
                    name: `${data?.getProduct?.name}`,
                    url: `/${data?.getProduct?.Category?.slug}/${data?.getProduct?.slug}`,
                  },
                ]}
              />
            )}

            <ProductWrapper
              sx={{
                mb: 70,
                [theme.breakpoints.down('md')]: {
                  mb: 35,
                },
                [theme.breakpoints.down('smd')]: {
                  mb: 25,
                },
                [theme.breakpoints.down('smd')]: {
                  mb: 15,
                },
              }}>
              {!data?.loading && data?.getProduct?.images.length !== 0 ? (
                <>
                  {thumbsInit && thumbsSwiper && (
                    <Swiper
                      style={{
                        gridColumn: '1/2',
                        gridRow: '1/2',
                        alignSelf: 'flex-start',
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                      }}
                      spaceBetween={10}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2">
                      {!data?.loading &&
                        data?.getProduct?.images?.map((image) => (
                          <SwiperSlide key={image.name}>
                            <img src={`/static/products/${image.name}`} />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  )}
                  {!loading && data?.getProduct?.images && (
                    <Swiper
                      style={{
                        gridColumn: '1/2',
                        gridRow: '2/3',
                        alignSelf: 'flex-start',
                      }}
                      onSwiper={setThumbsSwiper}
                      onAfterInit={() => setThumbsInit(true)}
                      modules={[FreeMode, Navigation, Thumbs]}
                      allowSlideNext={false}
                      allowSlidePrev={false}
                      allowTouchMove={false}
                      className="mySwiper">
                      {data?.getProduct?.images?.map((image, i) => (
                        <SwiperSlide
                          key={image.name}
                          className={
                            i === 0 ? 'swiper-slide-thumb-active' : ''
                          }>
                          <img src={`/static/products/${image.name}`} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    gridColumn: '1/2',
                    gridRow: '1/2',
                    margin: '0 auto',
                    '& img': {
                      width: '100%',
                      height: 'auto',
                    },
                    [theme.breakpoints.down('md')]: {
                      gridRow: '1/3',
                      maxHeight: '400px',
                      '& img': {
                        width: 'auto',
                        height: '100%',
                      },
                    },
                    [theme.breakpoints.down('sm')]: {
                      maxHeight: '300px',
                    },
                  }}>
                  <img style={{}} src="/static/preview-product.jpg" />
                </Box>
              )}

              <Content>
                <Title variant="h1">{data?.getProduct.name}</Title>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 10,
                  }}>
                  <VendorCode sx={{ mr: 10 }} variant="t4">
                    Артикул: {data?.getProduct.vendorCode}
                  </VendorCode>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 15,
                  }}>
                  <InStock sx={{ mr: 21 }} variant="t3">
                    В наличии
                  </InStock>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 15,
                    [theme.breakpoints.down('xs')]: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    },
                  }}>
                  <PriceBox>
                    {data?.getProduct?.discountPrice && (
                      <OldPrice variant="t4">
                        {currencyFormat(data?.getProduct?.discountPrice)}
                      </OldPrice>
                    )}
                    {data?.getProduct?.price && (
                      <NewPrice variant="h3">
                        {currencyFormat(totalPrice)}
                      </NewPrice>
                    )}
                  </PriceBox>
                  <Installment
                    sx={{
                      px: 7,
                      py: 3.5,
                      [theme.breakpoints.down('xs')]: {
                        mt: 7.5,
                      },
                    }}>
                    <InstallmentImage
                      src="/static/cart.png"
                      width="24"
                      height="24"
                    />
                    <InstallmentBox>
                      <InstallmentSubtitle variant="t4">
                        Рассрочка:
                      </InstallmentSubtitle>
                      <InstallmentConditions variant="t3b">
                        1 760 ₽ в месяц / 24 месяца
                      </InstallmentConditions>
                    </InstallmentBox>
                  </Installment>
                </Box>
                <form
                  onSubmit={productForm.handleSubmit(onSubmit)}
                  autoComplete="off">
                  {!loading &&
                    data?.getProduct?.AttributeOptions?.edges &&
                    groupAttributes.map((attr, i) => {
                      return (
                        <Box
                          key={i}
                          sx={{
                            [theme.breakpoints.down('smd')]: {
                              width: '100%',
                            },
                            '& + &': {
                              mt: 15,
                              pt: 15,
                              borderTop: `1px solid ${theme.palette.grey[200]}`,
                            },
                          }}>
                          <RadioBlock
                            key={i}
                            defaultValue={attr.attrOpts[0]}
                            radioName={attr.name}
                            radioList={attr.attrOpts}
                            onChange={(value) => {
                              productForm.setValue(`attributes[${i}]`, {
                                attr: attr._id,
                                attrOpt: value._id,
                                price:
                                  value.customPrice === null
                                    ? value.defaultPrice
                                    : value.customPrice,
                              });

                              let price = productForm
                                .getValues('attributes')
                                .map((a) => a.price)
                                .reduce((aa, bb) => aa + bb, 0);

                              setTotalPrice(price + data?.getProduct.price);
                            }}
                          />
                        </Box>
                      );
                    })}
                  <Total
                    sx={{
                      px: 15,
                      py: 14,
                      mt: 15,
                      [theme.breakpoints.down('md')]: {
                        px: 13,
                        py: 12,
                      },
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pb: 10,
                        mb: 15,
                        borderBottom: `1px solid ${theme.palette.grey[200]}`,
                      }}>
                      <TotalPrice variant="h1">
                        {currencyFormat(totalPrice)}
                      </TotalPrice>
                    </Box>

                    <TotalDelivary sx={{ mb: 15 }}>
                      <TotalDelivaryTitle variant="t2b">
                        Бесплатная доставка по РФ
                      </TotalDelivaryTitle>
                      <TotalDelivarySubtitle variant="t2">
                        от 1 дня при заказе до 01.09
                      </TotalDelivarySubtitle>
                    </TotalDelivary>
                    <Box sx={{ display: 'flex' }}>
                      <TotalBtnClick variant="contained">
                        Купить в 1 клик
                      </TotalBtnClick>

                      <TotalBtnCart variant="outlined" type="submit">
                        Добавить в корзину
                      </TotalBtnCart>
                    </Box>
                  </Total>
                </form>
              </Content>
            </ProductWrapper>

            <ProductInfo data={data?.getProduct?.SpecOptions?.edges} />
          </Container>
        ) : (
          <NotFoundPage />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default withSnackbar(ProductPage);
