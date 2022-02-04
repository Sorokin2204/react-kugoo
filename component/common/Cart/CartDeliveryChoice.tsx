import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import RadioBlock from '../Catalog/RadioBlock';

type Props = {};

const CityList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));
const CityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    display: 'block',
    width: '5px',
    height: '5px',
    marginRight: '10px',
    backgroundColor: theme.palette.warning.main,
    borderRadius: '50%',
  },

  ...theme.typography.t4,
}));
const CityFree = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.success.main,
  padding: `${theme.spacing(1.5)}  ${theme.spacing(4.5)}`,
  borderRadius: '5px',
  marginTop: '17px',
  display: 'inline-block',
  alignSelf: 'flex-start',
}));

const CityBox = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));
const CitySingle = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(5),
}));
const CityText = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.grey[600],
}));
const CityPhone = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.grey[600],
}));

const deliveryChoiceData = [
  {
    list: [
      {
        label: 'Самовывоз из магазина',
        value: 'self-deliv',
        content: <></>,
      },
      {
        label: 'Доставка курьером',
        value: 'self-delivee',
        content: (
          <>
            <CityBox>
              <CityList>
                <CityItem>Москва</CityItem>
                <CityItem>Санкт-Петербург</CityItem>
                <CityItem>Краснодар</CityItem>
              </CityList>
              <CityFree variant="t4b">Бесплатно</CityFree>
            </CityBox>
          </>
        ),
      },
      {
        label: 'Срочная доставка\nкурьером',
        value: 'self-deliveee',
        content: (
          <>
            <CityBox>
              <CitySingle variant="t4">Только по Москве</CitySingle>
              <Box>
                <CityText variant="t4">
                  Стоимость уточняйте у менеджера
                </CityText>
                <CityPhone variant="t4b">+ 7 (800) 505 54 61</CityPhone>
              </Box>
            </CityBox>
          </>
        ),
      },
      {
        label: 'Служба доставки CDEK',
        value: 'self-deliveeee',
        content: (
          <>
            <CityBox>
              <CitySingle variant="t4">Регионы России</CitySingle>
              <Box>
                <CityText variant="t4">
                  Стоимость уточняйте у менеджера
                </CityText>
                <CityPhone variant="t4b">+ 7 (800) 505 54 61</CityPhone>
              </Box>
            </CityBox>
          </>
        ),
      },
    ],
  },
];

const CartDeliveryChoice: React.FC<Props> = ({}) => {
  return (
    <>
      <RadioBlock data={deliveryChoiceData[0]} />
    </>
  );
};

export default CartDeliveryChoice;
