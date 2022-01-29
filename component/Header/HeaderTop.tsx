import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  useTheme,
  Link as LinkMUI,
  Divider,
  styled,
  Link,
  Button,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import clsx from 'clsx';
import LinkNext from 'next/link';
import LinkCustom from './components/LinkCustom';
import SocialLinkCustom from './components/SocialLinkCustom';
import PhonePopover from './components/PhonePopover';
import ButtonIcon from '../common/ButtonIcon';

type Props = {};

type TopHeaderData = {
  links: Array<{ text: string; path: string }>;
  socialLinks: Array<{ iconUrl: string; url: string }>;
  phone: string;
};

const topHeaderData: TopHeaderData = {
  links: [
    { text: 'Сервис', path: '/service' },
    { text: 'Сотрудничество', path: '/partners' },
    { text: 'Заказать звонок', path: '/call' },
  ],
  socialLinks: [
    {
      iconUrl: '/static/icons/whatsapp.svg',
      url: 'https://www.viber.com',
    },
    {
      iconUrl: '/static/icons/viber.svg',
      url: 'https://www.viber.com',
    },
    {
      iconUrl: '/static/icons/telegram.svg',
      url: 'https://www.viber.com',
    },
  ],
  phone: '+7 (800) 505-54-61',
};

const LinkItem = styled(Grid)(({ theme }) => ({
  marginRight: theme.spacing(15),
}));
const SocialLinkItem = styled(Grid)(({ theme }) => ({
  marginRight: theme.spacing(4),
}));

const SocialLinkList = styled(Grid)(({ theme }) => ({
  width: 'auto',
  flexGrow: 1,
}));

const LinkList = styled(Grid)(({ theme }) => ({
  width: 'auto',
}));

const PhoneBox = styled(Box)(({ theme }) => ({
  display: 'flex',
}));
const Phone = styled(Link)(({ theme }) => ({
  textDecoration: 'none',

  color: theme.palette.text.primary,
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(1),
}));

const HeaderTop = (props: Props) => {
  const theme = useTheme();
  const [isOpenContact, setIsOpenContact] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1, border: 'none' }}>
      <AppBar position="static" sx={{ boxShadow: 'none', border: 'none' }}>
        <Toolbar
          sx={{
            minHeight: theme.spacing(20) + '!important',
            flexGrow: 1,
            // justifyContent: 'space-between',
            backgroundColor: theme.palette.background.default,
          }}>
          <LinkList container spacing={0} sx={{}}>
            {topHeaderData.links.map((el, i) => (
              <LinkItem item key={i}>
                <LinkCustom href={el.path}>{el.text}</LinkCustom>
              </LinkItem>
            ))}
          </LinkList>
          <SocialLinkList container spacing={0}>
            {topHeaderData.socialLinks.map((el, i) => (
              <SocialLinkItem item key={i}>
                <SocialLinkCustom href={el.url} icon={el.iconUrl} />
              </SocialLinkItem>
            ))}
          </SocialLinkList>
          <PhoneBox>
            <Phone sx={{ fontSize: theme.typography.t4b }}>
              {topHeaderData.phone}
            </Phone>
            <ButtonIcon
              aria-describedby={id}
              onClick={handleClick}
              iconH={theme.spacing(8)}
              iconW={theme.spacing(8)}
              padding={theme.spacing(0)}
              icon={'/static/icons/plus-circle.svg'}></ButtonIcon>
            <PhonePopover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            />
          </PhoneBox>
        </Toolbar>
        <Divider sx={{ backgroundColor: '#ECF3FF' }} />
      </AppBar>
    </Box>
  );
};

export default HeaderTop;
