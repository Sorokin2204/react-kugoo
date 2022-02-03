import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';

type Props = { data: ContactData };

type ContactData = {
  title: string;
  phone: Array<{
    phonesubtitle: string;
    phoneFull: string;
    phoneWorktime: string;
  }>;
  address: Array<{
    addressFull: string;
    addressPhone: string;
  }>;
};

const contactData: ContactData = {
  title: 'Контакты',
  phone: [
    {
      phonesubtitle: 'Call-центр',
      phoneFull: '+7 (800) 505-54-61',
      phoneWorktime: 'Пн-Вс 10:00 - 20:00',
    },
    {
      phonesubtitle: 'Сервисный центр',
      phoneFull: '+7 (499) 350-76-92',
      phoneWorktime: 'Пн-Вс 10:00 - 20:00',
    },
    {
      phonesubtitle: '',
      phoneFull: '',
      phoneWorktime: '',
    },
  ],
  address: [
    {
      addressFull: 'Магазин в Москве \n ул. Ткацкая, 5 стр. 16',
      addressPhone: '+7 (499) 406 15 87',
    },
    {
      addressFull: 'Магазин в Санкт-\nПетербурге\n ул. Фрунзе, 2',
      addressPhone: '+7 (499) 406 15 87',
    },
    {
      addressFull: 'Магазин в Краснодаре\n ул. Восточно-Кругликовская, 86',
      addressPhone: '+ 7 (800) 505 54 61',
    },
  ],
};

const ContactBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: ' repeat(3,1fr)',
}));
const ContactTitle = styled(Typography)(({ theme }) => ({
  gridColumn: '1/3',
}));
const ContactBtnCall = styled(Button)(({ theme }) => ({
  justifySelf: 'flex-end',
}));
const ContactPhone = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const PhoneSubtitle = styled(Typography)(({ theme }) => ({}));
const PhoneNumber = styled(Typography)(({ theme }) => ({}));
const PhoneWorktime = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));
const ContactAddress = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const Address = styled(Typography)(({ theme }) => ({}));
const AddressPhone = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

const FooterContacts: React.FC<Props> = ({ data }) => {
  return (
    <>
      <ContactBox>
        <ContactTitle variant="t1b">{contactData.title}</ContactTitle>
        <ContactBtnCall>Заказать звонок</ContactBtnCall>
        {contactData.phone.map((el, i) => (
          <ContactPhone key={i} sx={{ mt: 8.5 }}>
            <PhoneSubtitle variant="t4" sx={{ mb: 2.5 }}>
              {el.phonesubtitle}
            </PhoneSubtitle>
            <PhoneNumber variant="t2b" sx={{ mb: 3.5 }}>
              {el.phoneFull}
            </PhoneNumber>
            <PhoneWorktime variant="t4">{el.phoneWorktime}</PhoneWorktime>
          </ContactPhone>
        ))}
        {contactData.address.map((el, i) => (
          <ContactAddress key={i} sx={{ mt: 14 }}>
            <Address variant="t3" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
              {el.addressFull}
            </Address>

            <AddressPhone variant="t4">{el.addressPhone}</AddressPhone>
          </ContactAddress>
        ))}{' '}
      </ContactBox>
    </>
  );
};

export default FooterContacts;
