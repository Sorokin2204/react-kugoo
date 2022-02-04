import React from 'react';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import InputText from '../../InputText';

type Props = {};

const SubscribeWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
const SubscribeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
const SubscribeTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  flexGrow: '1',
}));
const SubscribeInput = styled(InputText)(({ theme }) => ({
  maxWidth: theme.spacing(200),
  width: '100%',
}));
const SubscribeButton = styled(Button)(({ theme }) => ({}));

const Subscribe: React.FC<Props> = ({}) => {
  return (
    <SubscribeWrapper>
      <Container>
        <SubscribeBox sx={{ py: 11 }}>
          <SubscribeTitle variant="t1b">
            Оставьте свою почту и станьте первым,
            <br /> кто получит скидку на новые самокаты
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
