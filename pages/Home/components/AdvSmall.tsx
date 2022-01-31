import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import Image from 'next/image';

type Props = {};

type AdvData = {
  title: string;
  subtitle: string;
};

const advData: AdvData[] = [
  {
    title: 'Гарантия 1 год',
    subtitle: 'на весь ассортимент',
  },
  {
    title: 'Рассрочка',
    subtitle: 'от 6 месяцев',
  },
  {
    title: 'Подарки',
    subtitle: 'и бонусам к покупкам ',
  },
];

const AdvSmall: React.FC<Props> = ({}) => {
  return (
    <AdvBox sx={{ pt: 20, pb: 40 }}>
      <AdvList>
        {advData.map((el, i) => (
          <AdvItem key={i}>
            <AdvTitle variant="h3">{el.title}</AdvTitle>
            <AdvSubtitle variant="t2">{el.subtitle}</AdvSubtitle>
          </AdvItem>
        ))}
      </AdvList>
      <AdvReview>
        <AdvReviewBox>
          <AdvReviewImgBox>
            <AdvReviewImg
              sx={{ px: 9, py: 7 }}
              src="/static/icons/yandex-word.svg"
              width="19"
              height="29"
            />
          </AdvReviewImgBox>
          <AdvReviewBodyBox>
            <AdvReviewTitle variant="t4">Яндекс отзывы</AdvReviewTitle>
            <AdvReviewNumber variant="h3">4,9</AdvReviewNumber>
          </AdvReviewBodyBox>
        </AdvReviewBox>
      </AdvReview>
    </AdvBox>
  );
};

export default AdvSmall;
const AdvBox = styled(Box)(({ theme }) => ({
  display: 'flex',
}));
const AdvList = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexBasis: '60%',
}));
const AdvItem = styled(Box)(({ theme }) => ({}));
const AdvTitle = styled(Typography)(({ theme }) => ({}));
const AdvSubtitle = styled(Typography)(({ theme }) => ({}));
const AdvReview = styled(Box)(({ theme }) => ({
  flexGrow: '1',
}));
const AdvReviewBox = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  padding: theme.spacing(5),
  paddingRight: theme.spacing(13),

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: theme.spacing(95),
  marginLeft: 'auto',
  border: `1px solid rgba(93, 108, 123, 0.1);`,
}));
const AdvReviewImgBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#FC3F1D',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: `${theme.spacing(28)}`,
  height: `${theme.spacing(28)}`,
  borderRadius: '5px',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    background: '#FC3F1D',
    opacity: '0.5',
    filter: 'blur(15px)',
    width: '48px',
    height: '48px',
    zIndex: '-1',
    bottom: '-10%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '5px',
  },
}));
const AdvReviewImg = styled(Image)``;
const AdvReviewTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));
const AdvReviewNumber = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    display: 'block',
    background: `url(static/icons/star.svg) no-repeat 0 0/contain`,
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: '5px',
  },
}));
const AdvReviewBodyBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));
