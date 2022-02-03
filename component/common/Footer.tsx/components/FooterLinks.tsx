import React, { useEffect } from 'react';
import {
  Grid,
  Link as LinkMui,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import LinkCustom from '../../Header/components/LinkCustom';

type Props = {
  title: string;
  list: Array<{
    name: string;
    path: string;
  }>;
};

// type FooterBottomData = {
//   title?: string;
//   list: Array<{ name: string; path: string }>;
// };

// const footerBottomData: FooterBottomData[] = [
//   {
//     title: 'Каталог товаров',
//     list: [{ name: 'Электросамокаты', path: '/' }],
//   },
// ];

const FooterColumnList = styled(Grid)(({ theme }) => ({}));
const FooterColumnItem = styled(Grid)(({ theme }) => ({
  '& + &': {
    marginLeft: theme.spacing(22),
  },
  '&:first-child': {
    flexGrow: '1',
  },
}));
const FooterColumnTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  ...theme.typography.t1b,
  marginBottom: theme.spacing(8),
  minHeight: '26px',
}));
const FooterLinkList = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'repeat(4,auto)',
}));
const FooterLinkItem = styled(Grid)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(5),
  },
}));
const FooterLink = styled(LinkMui)(({ theme }) => ({}));

const FooterLinks: React.FC<Props> = ({ title, list }) => {
  const theme = useTheme();

  return (
    <>
      <FooterColumnItem>
        <FooterColumnTitle>{title}</FooterColumnTitle>
        <FooterLinkList container>
          {list.map((el, i) => (
            <FooterLinkItem item key={i}>
              <LinkCustom fontSize={theme.typography.t3} href={el.path}>
                {el.name}
              </LinkCustom>
            </FooterLinkItem>
          ))}
        </FooterLinkList>
      </FooterColumnItem>
    </>
  );
};

export default FooterLinks;