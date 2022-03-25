import { Container, Typography } from '@mui/material';
import React from 'react';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { productData } from './Catalog';
import Product from './Product';

type Props = {};

const ProductCarusel: React.FC<Props> = ({}) => {
  return (
    <>
      <Container>
        <Typography variant="h1" sx={{ mb: 25 }}>
          Рекомендуем вам
        </Typography>
      </Container>
      <Swiper
        spaceBetween={30}
        slidesPerView={4.5}
        centeredSlides={true}
        loop={true}>
        {[...Array(6)].map((el, i) => (
          <SwiperSlide key={i}>
            <Product data={productData[0]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarusel;
