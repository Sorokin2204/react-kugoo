import { SentimentVeryDissatisfied } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Container,
  Grid,
  Link as LinkMui,
  styled,
  useTheme,
} from '@mui/material';
import LinkNext from 'next/link';
import React from 'react';
import { withSnackbar } from '../../../../hooks/useAlert';

type Props = {};

type MenuDataType = {
  text: string;
  path: string;
  inHeader: boolean;
  inFooter: boolean;
  badge?: string;
};

export const menuData: MenuDataType[] = [
  { text: 'О магазине', path: 'about', inHeader: true, inFooter: true },
  { text: 'Сервисный центр', path: 'service', inHeader: false, inFooter: true },
  { text: 'Рассрочка', path: 'service', inHeader: false, inFooter: true },
  { text: 'Сотрудничество', path: 'service', inHeader: false, inFooter: true },
  {
    text: 'Доставка и оплата',
    path: 'about',
    badge: 'Доступна рассрочка',
    inHeader: true,
    inFooter: true,
  },
  { text: 'Тест-драйв', path: 'test', inHeader: true, inFooter: true },
  { text: 'Блог', path: 'blog', inHeader: true, inFooter: true },
  { text: 'Контакт', path: 'contact', inHeader: true, inFooter: true },
  {
    text: 'Акции',
    path: 'discount',
    badge: '%',
    inHeader: true,
    inFooter: true,
  },
];

const NavBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    backgroundColor: 'transparent',
    padding: theme.spacing(0),
  },
  padding: theme.spacing(5),
}));
const NavList = styled(Grid)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(13),
  },
}));
const NavItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& + &': {
    marginLeft: theme.spacing(25),
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    '&:last-child': {
      paddingBottom: '0',
    },
    '&:first-child': {
      paddingTop: '0',
    },
    '& + &': {
      marginLeft: '0',

      borderTop: `1px solid ${theme.palette.grey[200]}`,
    },
  },
}));
const NavBadge = styled(Box)(({ theme }) => ({
  borderRadius: '300px',

  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));
const NavLink = styled(LinkMui)(({ theme }) => ({
  display: 'block',
  textDecoration: 'none',

  color: theme.palette.text.primary,
}));

const Nav: React.FC<Props & BoxProps> = ({ snackbarShowMessage, ...props }) => {
  const theme = useTheme();
  return (
    <>
      <NavBox {...props}>
        <Container>
          <NavList container>
            {menuData.map((el, i) =>
              el.inHeader ? (
                <NavItem item key={i}>
                  <LinkNext href={el.path}>
                    <NavLink
                      sx={{ fontSize: theme.typography.t3b }}
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
                      {el.text}
                    </NavLink>
                  </LinkNext>
                  {el.badge ? (
                    <NavBadge
                      sx={{
                        px: 4,
                        py: 2,
                        ml: 4,
                        [theme.breakpoints.down('md')]: {
                          ml: 0,
                          mt: 3,
                        },
                        fontSize: theme.typography.t5,
                      }}>
                      {el.badge}
                    </NavBadge>
                  ) : (
                    ''
                  )}
                </NavItem>
              ) : (
                ''
              ),
            )}
          </NavList>
        </Container>
      </NavBox>
    </>
  );
};

export default withSnackbar(Nav);
