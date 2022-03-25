import {
  Box,
  Button,
  Container,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const BannerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',

  background:
    'radial-gradient(58.73% 541.94% at 75.14% 62.23%, #A6A9FF 0%, #6F73EE 100%)',
  borderRadius: '10px',

  [theme.breakpoints.down('md')]: {},
}));
const BannerWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
}));

const BannerBadge = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  color: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: '5px',
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.t5,
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: '3px',
  },
}));
const BannerTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  maxWidth: '18em',
  [theme.breakpoints.down('lg')]: {
    ...theme.typography.h2,
    fontWeight: '600',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '14em',
  },
  '@media(max-width: 840px)': {
    ...theme.typography.h3,
  },
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.t1bb,
  },
  [theme.breakpoints.down('xs')]: {
    ...theme.typography.t3b,
    marginBottom: '5px',
  },
}));
const BannerSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  [theme.breakpoints.down('md')]: {
    marginBottom: '0',
  },
  '@media(max-width: 840px)': {
    ...theme.typography.t3,
  },
  [theme.breakpoints.down('xs')]: {
    ...theme.typography.t4,
  },
}));
const BannerBtn = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
const BannerImage = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: 'auto',
}));

const ImageFragment = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '11%',
  bottom: '30%',

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));
const BannerImageBox = styled(Box)(({ theme }) => ({
  display: 'block',
  position: 'absolute',
  bottom: 0,
  right: 0,
  [theme.breakpoints.down('lg')]: {
    width: '40%',
    right: '4vw',
  },
  [theme.breakpoints.down('md')]: {
    width: '350px',
    right: '40px',
  },
  '@media(max-width: 840px)': {
    width: '300px',
    right: '-80px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '230px',
    right: '-60px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '200px',
  },
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

  width: '58%',
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
    [theme.breakpoints.down('lg')]: {
      width: '12px',
      height: '12px',
    },
  },
  '&::after': {
    transform: 'translateY(-1px)',
  },
}));

const Banner: React.FC<Props> = ({}) => {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <BannerWrapper>
      <BannerBox
        sx={() => ({
          pt: 20,
          pb: 50,
          mt: 15,
          [theme.breakpoints.down('lg')]: { pb: 20, pt: 10 },
          [theme.breakpoints.down('md')]: { mt: 15, mt: 0 },
          [theme.breakpoints.down('sm')]: {
            pb: 7.5,
          },
        })}>
        <Container>
          <BannerBadge
            variant="t4"
            sx={() => ({
              px: 5,
              py: 2,
              mb: 18,
              [theme.breakpoints.down('lg')]: {
                mb: 9,
              },
              [theme.breakpoints.down('md')]: {
                mb: 5,
              },
              [theme.breakpoints.down('xs')]: {
                px: 3,
                py: 1,
              },
            })}>
            Новинка
          </BannerBadge>
          <BannerTitle variant="h1" sx={{ mb: 3.5 }}>
            Электросамокаты Kugoo Kirin от официального дилера
          </BannerTitle>
          <BannerSubtitle
            variant="h4"
            sx={{
              mb: 12.5,
            }}>
            с бесплатной доставкой по РФ от 1 дня
          </BannerSubtitle>
          <BannerBtn
            variant="containedReverse"
            onClick={() => {
              router.push('/electric-scooters');
            }}>
            Перейти в католог
          </BannerBtn>
        </Container>

        <BannerImageBox>
          {matches ? (
            <BannerImage src="/static/banner-home-no-text.png" />
          ) : (
            <BannerImage src="/static/banner-home.png" />
          )}
          <ImageFragment>
            <ImageTest
              sx={{
                py: 6.5,
                pl: 6.5,
                pr: 8,
              }}>
              Тест-драйв и обучение
            </ImageTest>
            <ImageFree
              sx={{
                px: 5,
                py: 2,
              }}>
              Бесплатно
            </ImageFree>
            <ImageLine></ImageLine>
          </ImageFragment>
        </BannerImageBox>
      </BannerBox>
    </BannerWrapper>
  );
};

export default Banner;
