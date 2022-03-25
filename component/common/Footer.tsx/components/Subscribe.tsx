import { Box, Button, Container, styled, Typography } from '@mui/material';
import React from 'react';
import InputText from '../../InputText';

type Props = {};

const SubscribeWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
const SubscribeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    paddingBottom: theme.spacing(14),
  },
}));
const SubscribeTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  flexGrow: '1',
  [theme.breakpoints.down('md')]: {
    maxWidth: theme.spacing(160),

    marginBottom: theme.spacing(10),
    textAlign: 'center',
  },
}));
const SubscribeInput = styled(InputText)(({ theme }) => ({
  maxWidth: theme.spacing(200),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(10),
    padding: `${theme.spacing(5)} ${theme.spacing(7.5)}`,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 'none',
    marginRight: '0',
  },
}));
const SubscribeButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: 'none',
    marginRight: '0',
  },
}));

const Subscribe: React.FC<Props> = ({}) => {
  return (
    <SubscribeWrapper>
      <Container>
        <SubscribeBox sx={{ py: 11 }}>
          <SubscribeTitle variant="t1b" sx={{ mr: 10 }}>
            Оставьте свою почту и станьте первым, кто получит скидку на новые
            самокаты
          </SubscribeTitle>
          <SubscribeInput
            sx={{ mr: 10 }}
            variant="reverse"
            placeholder="Введите Ваш email"
          />
          <SubscribeButton variant="containedReverse">
            Подписаться
          </SubscribeButton>
        </SubscribeBox>
      </Container>
    </SubscribeWrapper>
  );
};

export default Subscribe;
