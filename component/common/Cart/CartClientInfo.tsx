import React, { useState } from 'react';
import { Box, FormLabel, styled, Typography, useTheme } from '@mui/material';
import InputText from '../InputText';
import FilterCheckbox from '../FilterCheckbox';

type Props = {};

const CartGridInput = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  gridGap: '20px',
}));
const InputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const CartClientInfo: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <CartGridInput>
        <InputBox>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Ваша фамилия
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите фамилия'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Ваше имя
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите имя'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Ваш телефона*
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'+7 (___) __ - __ - __'}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
        <InputBox>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Ваш email
          </Typography>
          <InputText
            value={inputValue}
            placeholder={'Введите email'}
            onInput={(event) => setInputValue(event.target.value)}
          />
          <FilterCheckbox
            sx={{
              marginTop: theme.spacing(5),
              '& .MuiTypography-root': {
                ...theme.typography.t4,
              },
              '& .MuiCheckbox-root': {
                '& span:before': {
                  marginRight: '12px',
                },
              },
            }}
            data={[
              {
                value: 'discount',
                label: 'Сообщать мне об акциях и скидках',
              },
            ]}
          />
        </InputBox>
        <InputBox sx={{ gridColumn: '1/3' }}>
          <Typography variant="t4" sx={{ mb: 3.5 }}>
            Комментрий
          </Typography>
          <InputText
            multiline
            rows={4}
            maxRows={4}
            value={inputValue}
            placeholder={'Оставьте пожелание или комментарий к заказу '}
            onInput={(event) => setInputValue(event.target.value)}
          />
        </InputBox>
      </CartGridInput>
    </>
  );
};

export default CartClientInfo;
