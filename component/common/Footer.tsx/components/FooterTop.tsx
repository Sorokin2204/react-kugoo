import React from 'react';
import { Grid, styled } from '@mui/material';
import FooterLinks from './FooterLinks';
import { menuData } from '../../Header/components/Nav';
import { catalogData } from '../../Header/components/CatalogPopover';
import FooterContacts from './FooterContacts';

type Props = {};

const FooterTop: React.FC<Props> = ({}) => {
  let firstColData = [
    ...catalogData.map((el, i) => ({ name: el.name, path: el.path })),
  ];
  const linksFooter = [
    ...menuData.map((el, i) => {
      if (el.inFooter) {
        return { name: el.text, path: el.path };
      }
    }),
  ];
  const secondColData = linksFooter.slice(0, 4);
  const thirdColData = linksFooter.slice(4, 8);
  return (
    <>
      <FooterTopWrapper container spacing={50} sx={{ pt: 23, pb: 24.5 }}>
        <FooterTopBlockLinks item xs={6}>
          <FooterLinks list={firstColData} title="Каталог товаров" />
          <FooterLinks list={secondColData} title="Покупателям" />
          <FooterLinks list={thirdColData} />
        </FooterTopBlockLinks>
        <FooterTopBlockContact item xs={6}>
          <FooterContacts />
        </FooterTopBlockContact>
      </FooterTopWrapper>
    </>
  );
};

export default FooterTop;
const FooterTopWrapper = styled(Grid)(({ theme }) => ({}));
const FooterTopBlockLinks = styled(Grid)(({ theme }) => ({
  display: 'flex',
}));
const FooterTopBlockContact = styled(Grid)(({ theme }) => ({}));
