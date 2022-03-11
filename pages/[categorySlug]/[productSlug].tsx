import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import BreadcrumbsCustom from '../../component/common/BreadcrumbsCustom';
import ButtonIcon from '../../component/common/ButtonIcon';
import { productData } from '../../component/common/Catalog';
import { currencyFormat } from '../../utils/currencyFormat';
import RadioBlock, {
  SpecType,
} from '../../component/common/Catalog/RadioBlock';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper';
import ProductInfo from '../../component/common/ProductSingle/ProductInfo';
import ProductCarusel from '../../component/common/ProductCarusel';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_PRODUCT, GET_PRODUCT_ADMIN } from '../../graphql/query/product';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useFieldArray, useForm } from 'react-hook-form';
import useAppConfig from '../../hooks/useAppConfig';
import _ from 'lodash';
import { groupBy } from '../../utils/groupBy';
import { withSnackbar } from '../../hooks/useAlert';
type Props = {};

const Content = styled(Box)(({ theme }) => ({
  gridColumn: '2/3',
  gridRow: '1/3',
  display: 'flex',
  flexDirection: 'column',
  width: '475px',
  maxWidth: '475px',
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
const NewPrice = styled(Typography)(({ theme }) => ({ display: 'block' }));
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
}));
const ProductImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
export const specData: SpecType[] = [
  {
    title: 'Комплектация',
    list: [
      {
        defaultChecked: true,
        label: 'Базовая',
        value: 'basic',
      },
      {
        label: 'Версия MAX',
        value: 'verison-max',
      },
      {
        label: 'VIP-версия',
        value: 'verison-vip',
      },
    ],
  },
  {
    title: 'Гарантия',
    list: [
      {
        defaultChecked: true,
        label: 'Стандартная 1 год',
        subLabel: 'Бесплатно',
        value: 'standart',
      },
      {
        label: 'Расширенная 2 года',
        subLabel: '2 990 руб.',
        value: 'verison-max',
      },
    ],
  },
  {
    title: 'Дополнительные услуги',
    list: [
      {
        defaultChecked: true,
        label: 'Нет',
        value: 'standart',
      },
      {
        label: 'Настройка',
        subLabel: '1 520 руб.',
        value: 'setting',
      },
      {
        label: 'Гидроизоляция',
        subLabel: '3 850 руб.',
        value: 'hydro',
      },
      {
        label: 'Гидроизоляция\n и настройка',
        subLabel: '3 409 руб. (-30%)',
        value: 'hydro-setting',
      },
    ],
  },

  {
    title: 'Тип покрышки',
    list: [
      {
        defaultChecked: true,
        label: 'Шоссейная (базовая)',
        value: 'base',
      },
      {
        label: 'Внедорожная',
        subLabel: '4 000 руб.',
        value: 'setting',
      },
      {
        label: 'Внедорожная\n с установкой',
        subLabel: '4 000 руб.',
        value: 'hydro',
      },
      {
        label: 'Внедорожная\n шипированная',
        subLabel: '7 600 руб.',
        value: 'hydro-setting',
      },
    ],
  },
];

type IFormType = {
  attributes: Array<{ attr: string; attrOpt: string; price: number }>;
};

const ProductPage: React.FC<Props> = ({ snackbarShowMessage }) => {
  const theme = useTheme();
  const router = useRouter();
  const [getProduct, { data, loading }] = useLazyQuery(GET_PRODUCT);
  const [groupAttributes, setGroupAttributes] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cartProducts, addingInCart } = useAppConfig();
  const [inCart, setInCart] = useState(false);
  const productForm = useForm<IFormType>({
    mode: 'onBlur',
    defaultValues: {
      attributes: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: productForm.control,
      name: 'attributes', // unique name for your Field Array
    },
  );
  React.useEffect(() => {
    // const subscription = watch((value, { name, type }) =>
    //   console.log(value, name, type),
    // );
    // return () => subscription.unsubscribe();
  }, [productForm.getValues('attributes')]);
  useEffect(() => {
    console.log('Selected attribute', totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    if (!router.isReady) return;
    getProduct({
      variables: {
        productSlug: router.query.productSlug,
      },
    }).then((dataSuccess) => {
      console.log('Cache Data ', cartProducts);
      const indexInCart = cartProducts.findIndex(
        (productInCart) =>
          productInCart.productId === dataSuccess.data.getProduct._id,
      );
      setGroupAttributes(
        groupBy(dataSuccess?.data?.getProduct?.AttributeOptions?.edges),
      );
      setInCart(indexInCart !== -1);
      setTotalPrice(dataSuccess.data.getProduct.price);
    });
  }, [router]);

  useEffect(() => {
    if (groupAttributes.length !== 0) {
      groupAttributes.map((attr, i) => {
        productForm.setValue(`attributes[${i}]`, {
          attr: attr._id,
          attrOpt: attr.attrOpts[0]._id,
          price: attr.attrOpts[0].defaultPrice,
        });
      });
    }
  }, [groupAttributes]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const onSubmit = (dataForm: IFormType) => {
    console.log('Prod form data', dataForm);
    console.log('CART PRODUCT', cartProducts);

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
      <Container sx={{ mb: 50 }}>
        <BreadcrumbsCustom />

        <ProductWrapper sx={{ mb: 70 }}>
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
                <SwiperSlide>
                  <img src={`/static/products/${image.name}`} />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            style={{
              gridColumn: '1/2',
              gridRow: '2/3',
              alignSelf: 'flex-start',
            }}
            onSwiper={setThumbsSwiper}
            slidesPerView={7}
            modules={[FreeMode, Navigation, Thumbs]}
            allowSlideNext={false}
            allowSlidePrev={false}
            className="mySwiper">
            {!data?.loading &&
              data?.getProduct?.images?.map((image) => (
                <SwiperSlide>
                  <img src={`/static/products/${image.name}`} />
                </SwiperSlide>
              ))}
          </Swiper>

          <Content>
            <Title variant="h1">{data?.getProduct.name}</Title>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 10,
              }}>
              {/* <Views sx={{ mr: 10 }} variant="t4">
                Просмотров {data?.getProduct.viewsCounter}
              </Views>
              <Buyers sx={{ mr: 10 }} variant="t4">
                Купили {productData[0].buyers} раз
              </Buyers> */}
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
              {/* <BtnCompare
                sx={{ mr: 15 }}
                icon="/static/icons/compare.svg"
                iconH={theme.spacing(5.5)}
                iconW={theme.spacing(10)}>
                Сравнить
              </BtnCompare>
              <BtnShare
                icon="/static/icons/share.svg"
                iconH={theme.spacing(10)}
                iconW={theme.spacing(10)}>
                Поделиться
              </BtnShare> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 15,
              }}>
              <PriceBox>
                {data?.getProduct?.discountPrice && (
                  <OldPrice variant="t4">
                    {currencyFormat(data?.getProduct?.discountPrice)}
                  </OldPrice>
                )}
                {data?.getProduct?.price && (
                  <NewPrice variant="h3">{currencyFormat(totalPrice)}</NewPrice>
                )}
              </PriceBox>
              <Installment sx={{ px: 7, py: 3.5 }}>
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
                            price: value.defaultPrice,
                          });
                          console.log();
                          let price = productForm
                            .getValues('attributes')
                            .map((a) => a.price)
                            .reduce((aa, bb) => aa + bb, 0);
                          setTotalPrice(price + data?.getProduct.price);

                          // setSelectedAttribute((prev) => {
                          //   prev?.[i] = prev?.[i] ?? {};
                          //   prev?.[i] = { attr: attr._id, attrOpt: value };
                          // });
                        }}
                        // selectedAttribute={selectedAttribute[i]}
                      />
                    </Box>
                  );
                })}
              <Total sx={{ px: 15, py: 14, mt: 15 }}>
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
                  {/* <TotalBtnFavorite
                    variant="border"
                    iconW={theme.spacing(8.5)}
                    iconH={theme.spacing(7.5)}
                    icon={'/static/icons/favorite.svg'}
                    iconColor={theme.palette.primary.main}
                    sizeBtn={theme.spacing(20)}></TotalBtnFavorite> */}
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
                  {/* {inCart ? (
                    <TotalBtnCart
                      sx={{
                        backgroundColor: 'success.main',
                        border: '1px solid transparent !important',
                        color: 'white !important',
                      }}
                      variant="outlined"
                      onClick={() => router.push('/cart')}>
                      В корзине
                    </TotalBtnCart>
                  ) : (
                   
                  )} */}
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
      p<Box sx={{ mb: 50 }}>{/* <ProductCarusel /> */}</Box>
    </>
  );
};

export default withSnackbar(ProductPage);
