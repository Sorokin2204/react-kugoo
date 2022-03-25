import { Grid, styled, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { menuData } from '../../Header/components/Nav';
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';

type Props = {};

const FooterTop: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.down('lg'));

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
      <FooterTopWrapper
        container
        spacing={matchLg ? 20 : 50}
        sx={{ pt: 23, pb: 24.5 }}>
        <FooterTopBlockLinks item xs={6}>
          <FooterLinks list={secondColData} title="Каталог товаров" />
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
const FooterTopWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('smd')]: {
    display: 'none',
  },
}));
const FooterTopBlockLinks = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: theme.spacing(22),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2,1fr)',
  },
  [theme.breakpoints.down('smd')]: {
    gridGap: theme.spacing(12),
  },
}));
const FooterTopBlockContact = styled(Grid)(({ theme }) => ({}));
