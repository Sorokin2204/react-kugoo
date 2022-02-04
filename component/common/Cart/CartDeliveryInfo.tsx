import React, { useState } from 'react';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import InputText from '../InputText';
import FilterCheckbox from '../FilterCheckbox';

type Props = {};
const CartGridInput = styled(Grid)(({ theme }) => ({
  // display: 'grid',
  // gridTemplateColumns: 'repeat(2,1fr)',
  // gridGap: '20px',
}));
const InputBox = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const CartDeliveryInfo: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <CartGridInput container spacing={10}>
        <InputBox item xs={6} sx={{ gridColumn: '1/3' }}>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Город/населенный пункт*
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Например, Воронеж'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox item xs={6} sx={{ gridColumn: '3/5' }}>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Название улицы*
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Например, Сурганова'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '1/2' }}>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Номер дома*
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите число'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '2/3' }}>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Корпус
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите число'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '3/4' }}>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Квартира
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите число'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox item xs={3} sx={{ gridColumn: '4/5' }}>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Индекс
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'______'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
      </CartGridInput>
    </>
  );
};

export default CartDeliveryInfo;
