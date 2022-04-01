import { Box, Button, Container, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useAppConfig from '../hooks/useAppConfig';

type Props = {};

const ThanksWrapper = styled(Box)(({ theme }) => ({}));
const ThanksContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '740px',
  justifyContent: 'space-between',
  margin: '0 auto',
  color: theme.palette.common.white,
  padding: '55px 0',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '45px 0',
  },
}));
const ThanksBody = styled(Box)(({ theme }) => ({
  maxWidth: '350px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginRight: '60px',
  [theme.breakpoints.down('sm')]: { marginRight: '30px' },
}));
const ThanksTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  marginBottom: '13px',
}));
const ThanksText = styled(Typography)(({ theme }) => ({
  marginBottom: '27px',
}));
const ThanksButton = styled(Button)(({ theme }) => ({
  color: `${theme.palette.success.main} !important`,
}));
const ThanksImage = styled('img')(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.down('md')]: {
    maxWidth: '200px',
    height: 'auto',
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '150px',
    height: 'auto',
  },
}));
const ThanksBoxImage = styled(Box)(({ theme }) => ({
  maxHeight: '350px',

  [theme.breakpoints.down('md')]: { maxHeight: '280px' },
  [theme.breakpoints.down('sm')]: { maxHeight: '200px' },
  [theme.breakpoints.down('smd')]: {
    display: 'none',
  },
}));

const ThanksInner = styled(Box)(({ theme }) => ({
  background:
    'radial-gradient(82.68% 234.06% at 85.58% 87.89%, #9DF474 0%, #75D14A 100%)',
  borderRadius: '10px',
  marginTop: '30px',
  marginBottom: '30px',
  padding: '0 30px ',
  [theme.breakpoints.down('sm')]: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}));

const ThanksPage: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { resetCart } = useAppConfig();
  useEffect(() => {
    resetCart();
  }, []);

  return (
    <>
      <ThanksWrapper>
        <Container maxWidth="xl">
          <ThanksInner>
            <ThanksContent>
              <ThanksBody>
                <ThanksTitle variant="h1">Мы получили вашу заявку!</ThanksTitle>
                <ThanksText variant="t2">
                  Менеджер свяжется с Вами в течение 5 минут в рабочее время.
                  Если Вы оставили заявку в нерабочее время — начнем следующий
                  день со звонка Вам. <br /> <br />А пока ожидаете —
                  присоединяйтесь к сообществу Kugoo в Instagram.
                </ThanksText>
                <ThanksButton
                  variant="containedReverse"
                  onClick={() => router.push('/electric-scooters')}>
                  Перейти в каталог
                </ThanksButton>
              </ThanksBody>
              <ThanksBoxImage>
                <ThanksImage
                  src="/static/common/thanks-img.png"
                  width={'270'}
                  height={'557'}
                />
              </ThanksBoxImage>
            </ThanksContent>
          </ThanksInner>
        </Container>
      </ThanksWrapper>
    </>
  );
};

export default ThanksPage;
