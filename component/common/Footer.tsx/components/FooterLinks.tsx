import { SentimentVeryDissatisfied } from '@mui/icons-material';
import {
  Grid,
  Link as LinkMui,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { withSnackbar } from '../../../../hooks/useAlert';
import LinkCustom from '../../Header/components/LinkCustom';

type Props = {
  title: string;
  list: Array<{
    name: string;
    path: string;
  }>;
};

const FooterColumnList = styled(Grid)(({ theme }) => ({}));
const FooterColumnItem = styled(Grid)(({ theme }) => ({
  '&:first-of-type': {
    flexGrow: '1',
  },
  [theme.breakpoints.down('lg')]: {
    '&:nth-of-type(1)': {
      order: 3,
    },
    '&:nth-of-type(2)': {
      order: 1,
    },
    '&:nth-of-type(3)': {
      order: 2,
    },
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

const FooterLinks: React.FC<Props> = ({ title, list, snackbarShowMessage }) => {
  const theme = useTheme();

  return (
    <>
      <FooterColumnItem>
        <FooterColumnTitle>{title}</FooterColumnTitle>
        <FooterLinkList container>
          {list.map((el, i) => (
            <FooterLinkItem item key={i}>
              <LinkCustom
                fontSize={theme.typography.t3}
                href={el.path}
                onClick={(e) => {
                  e.preventDefault();
                  snackbarShowMessage(
                    'Страница не найдена',
                    'info',
                    500,
                    <SentimentVeryDissatisfied />,
                  );
                }}>
                {el.name}
              </LinkCustom>
            </FooterLinkItem>
          ))}
        </FooterLinkList>
      </FooterColumnItem>
    </>
  );
};

export default withSnackbar(FooterLinks);
