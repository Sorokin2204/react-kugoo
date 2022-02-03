import React from 'react';
import {
  Box,
  Grid,
  styled,
  Link as LinkMui,
  Container,
  useTheme,
} from '@mui/material';
import LinkNext from 'next/link';

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
  padding: theme.spacing(5),
}));
const NavList = styled(Grid)(({ theme }) => ({
  display: 'flex',
}));
const NavItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& + &': {
    marginLeft: theme.spacing(25),
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

const Nav: React.FC<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <NavBox>
        {' '}
        <Container>
          <NavList container>
            {menuData.map((el, i) =>
              el.inHeader ? (
                <NavItem item key={i}>
                  <LinkNext href={el.path}>
                    <NavLink
                      sx={{ fontSize: theme.typography.t3b }}
                      href={el.path}>
                      {el.text}
                    </NavLink>
                  </LinkNext>
                  {el.badge ? (
                    <NavBadge
                      sx={{
                        px: 4,
                        py: 2,
                        ml: 4,
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

export default Nav;
