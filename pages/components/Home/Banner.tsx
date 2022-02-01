import React from 'react';
import { Box, Button, Container, styled, Typography } from '@mui/material';

type Props = {};

const BannerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  position: 'relative',
  background:
    'radial-gradient(58.73% 541.94% at 75.14% 62.23%, #A6A9FF 0%, #6F73EE 100%)',
  borderRadius: '10px',
}));
const BannerBadge = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  color: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: '5px',
}));
const BannerTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  textTransform: 'uppercase',
  color: theme.palette.common.white,
}));
const BannerSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));
const BannerBtn = styled(Button)(({ theme }) => ({}));
const BannerImage = styled('img')(({ theme }) => ({
  display: 'block',
}));

const ImageFragment = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '11%',
  bottom: '30%',
}));
const BannerImageBox = styled(Box)(({ theme }) => ({
  display: 'block',
  position: 'absolute',
  bottom: 0,
  right: 0,
}));
const ImageTest = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  ...theme.typography.t3b,
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(5px)',
  color: theme.palette.common.white,
  borderRadius: '5px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  whiteSpace: 'nowrap',
  '&::before': {
    content: '""',
    display: 'block',
    background: `url(/static/lightning.png) no-repeat 0 0/contain`,
    width: '22px',
    height: '22px',
    marginRight: '10px',
  },
}));
const ImageFree = styled(Box)(({ theme }) => ({
  textTransform: 'uppercase',
  ...theme.typography.t4b,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.primary.main,
  borderRadius: '5px',
  position: 'absolute',
  bottom: '-35%',
  right: theme.spacing(8),
}));

const ImageLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '-54%',
  top: '56%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: theme.spacing(60),
  height: '1px',
  transform: 'rotate(4deg)',
  borderTop: `1.5px dashed  ${theme.palette.common.white}`,
  '&::after, &::before': {
    content: '""',
    display: 'block',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    border: `3px solid ${theme.palette.common.white}`,
    transform: 'translateY(-1.5px)',
  },
  '&::after': {
    transform: 'translateY(-1px)',
  },
}));

const Banner: React.FC<Props> = ({}) => {
  return (
    <BannerBox sx={{ pt: 20, pb: 50, mt: 15 }}>
      <Container>
        <BannerBadge variant="t4" sx={{ px: 5, py: 2, mb: 18 }}>
          Новинка
        </BannerBadge>
        <BannerTitle variant="h1" sx={{ mb: 3.5 }}>
          Электросамокаты Kugoo Kirin <br /> от официального дилера
        </BannerTitle>
        <BannerSubtitle variant="h4" sx={{ mb: 12.5 }}>
          с бесплатной доставкой по РФ от 1 дня
        </BannerSubtitle>
        <BannerBtn variant="containedReverse">Перейти в католог</BannerBtn>
      </Container>

      <BannerImageBox>
        <BannerImage src="/static/banner-home.png" />
        <ImageFragment>
          <ImageTest sx={{ py: 6.5, pl: 6.5, pr: 8 }}>
            Тест-драйв и обучение
          </ImageTest>
          <ImageFree sx={{ px: 5, py: 2 }}>Бесплатно</ImageFree>
          <ImageLine></ImageLine>
        </ImageFragment>
      </BannerImageBox>
    </BannerBox>
  );
};

export default Banner;
