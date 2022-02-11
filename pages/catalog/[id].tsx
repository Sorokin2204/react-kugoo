import React, { useState } from 'react';
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
import { currencyFormat } from '../../component/common/Header/components/CartPopover';
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

const ProductPage: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
            <SwiperSlide>
              <img src="/static/product-full-with-bg.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
            </SwiperSlide>
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
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
            </SwiperSlide>
          </Swiper>

          <Content>
            <Title variant="h1">{productData[0].title}</Title>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 10,
              }}>
              <Views sx={{ mr: 10 }} variant="t4">
                Просмотров {productData[0].views}
              </Views>
              <Buyers sx={{ mr: 10 }} variant="t4">
                Купили {productData[0].buyers} раз
              </Buyers>
              <VendorCode sx={{ mr: 10 }} variant="t4">
                Артикул: {productData[0].vendorCode}
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
              <BtnCompare
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
              </BtnShare>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 15,
              }}>
              <PriceBox>
                <OldPrice variant="t4">
                  {currencyFormat(productData[0].oldPrice)}
                </OldPrice>
                <NewPrice variant="h3">
                  {currencyFormat(productData[0].newPrice)}
                </NewPrice>
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
            {specData.map((el, i) => (
              <Box
                key={i}
                sx={{
                  '& + &': {
                    mt: 15,
                    pt: 15,
                    borderTop: `1px solid ${theme.palette.grey[200]}`,
                  },
                }}>
                <RadioBlock key={i} data={el} />
              </Box>
            ))}
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
                <TotalPrice variant="h1">45 900 руб.</TotalPrice>
                <TotalBtnFavorite
                  variant="border"
                  iconW={theme.spacing(8.5)}
                  iconH={theme.spacing(7.5)}
                  icon={'/static/icons/favorite.svg'}
                  iconColor={theme.palette.primary.main}
                  sizeBtn={theme.spacing(20)}></TotalBtnFavorite>
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
                <TotalBtnCart variant="outlined">
                  Добавить в корзину
                </TotalBtnCart>
              </Box>
            </Total>
          </Content>
        </ProductWrapper>

        <ProductInfo />
      </Container>
      <Box sx={{ mb: 50 }}>
        <ProductCarusel />
      </Box>
    </>
  );
};

export default ProductPage;
