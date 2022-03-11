import React from 'react';
import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { advData } from '../../../data/advData';

const AdvBox = styled(Box)(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.down('smd')]: {
    flexDirection: 'column',
  },
}));
const AdvList = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexBasis: '60%',
  [theme.breakpoints.down('smd')]: {
    justifyContent: 'space-around',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
const AdvItem = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& + &': {
      marginTop: theme.spacing(10),
    },
  },
}));
const AdvTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
}));
const AdvSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
}));
const AdvReview = styled(Box)(({ theme }) => ({
  flexGrow: '1',
  [theme.breakpoints.down('smd')]: {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    margin: '0 auto',
    marginTop: theme.spacing(10),
  },
}));
const AdvReviewBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: `1px solid rgba(93, 108, 123, 0.1);`,
  borderRadius: '5px',
  marginLeft: 'auto',
  maxWidth: theme.spacing(95),
  padding: theme.spacing(5),
  paddingRight: theme.spacing(13),

  [theme.breakpoints.down('md')]: {
    maxWidth: theme.spacing(90),
    padding: theme.spacing(4),
    paddingRight: theme.spacing(10),
  },
  [theme.breakpoints.down('smd')]: {
    maxWidth: theme.spacing(80),
    padding: theme.spacing(3),
    paddingRight: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {},
}));
const AdvReviewImgBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#FC3F1D',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  width: `${theme.spacing(28)}`,
  height: `${theme.spacing(28)}`,
  [theme.breakpoints.down('md')]: {
    width: `${theme.spacing(24)}`,
    height: `${theme.spacing(24)}`,
  },
  [theme.breakpoints.down('smd')]: {
    width: `${theme.spacing(20)}`,
    height: `${theme.spacing(20)}`,
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '10px',
  
  },
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    background: '#FC3F1D',
    opacity: '0.5',
    filter: 'blur(15px)',
    zIndex: '-1',
    bottom: '0%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '5px',
    width: '48px',
    height: '48px',
    [theme.breakpoints.down('md')]: {
      filter: 'blur(10px)',
      width: '44px',
      height: '44px',
    },
    [theme.breakpoints.down('smd')]: {
      filter: 'blur(10px)',
      width: '40px',
      height: '40px',
    },
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

type Props = {};

const AdvSmall: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchSmd = useMediaQuery(theme.breakpoints.down('smd'));

  return (
    <AdvBox
      sx={{
        pt: 20,
        pb: 40,
        [theme.breakpoints.down('md')]: {
          pt: 10,
          pb: 20,
        },
      }}>
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
              width={matchSmd ? '14' : matchMd ? '15' : '19'}
              height={matchSmd ? '22' : matchMd ? '25' : '29'}
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
