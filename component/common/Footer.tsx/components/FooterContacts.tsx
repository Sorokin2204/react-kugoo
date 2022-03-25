import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { contactData } from '../../../../data/contactData';

type Props = { data: ContactData };

const ContactBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: ' repeat(3,1fr)',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: ' repeat(2,1fr)',
  },
}));
const ContactTitle = styled(Typography)(({ theme }) => ({
  gridColumn: '1/3',
}));
const ContactBtnCall = styled(Button)(({ theme }) => ({
  justifySelf: 'flex-end',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));
const ContactPhone = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('lg')]: {
    '&:last-of-type': {
      display: 'none !important',
    },
  },
}));
const PhoneSubtitle = styled(Typography)(({ theme }) => ({}));
const PhoneNumber = styled('a')(({ theme }) => ({
  ...theme.typography.t2b,
  textDecoration: 'none',
  color: theme.palette.common.black,
}));
const PhoneWorktime = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));
const ContactAddress = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const Address = styled(Typography)(({ theme }) => ({}));
const AddressPhone = styled('a')(({ theme }) => ({
  color: theme.palette.grey[600],
  ...theme.typography.t4,
  textDecoration: 'none',
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
            <PhoneNumber
              sx={{ mb: 3.5 }}
              href={`tel:${el.phoneFull.replace(/\D/g, '')}`}>
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

            <AddressPhone
              variant="t4"
              href={`tel:${el.addressPhone.replace(/\D/g, '')}`}>
              {el.addressPhone}
            </AddressPhone>
          </ContactAddress>
        ))}{' '}
      </ContactBox>
    </>
  );
};

export default FooterContacts;
