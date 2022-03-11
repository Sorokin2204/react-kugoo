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
  ClickAwayListener,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import clsx from 'clsx';
import LinkNext from 'next/link';
import LinkCustom from './LinkCustom';
import SocialLinkCustom from './SocialLinkCustom';
import PhonePopover from './PhonePopover';
import ButtonIcon from '../../ButtonIcon';
import { topHeaderData } from '../../../../data/topHeaderData';
import { withSnackbar } from '../../../../hooks/useAlert';
import { ExitToApp, SentimentVeryDissatisfied } from '@mui/icons-material';

type Props = {};

export const LinkItem = styled(Grid)(({ theme }) => ({
  marginRight: theme.spacing(15),
  [theme.breakpoints.down('md')]: {
    marginRight: theme.spacing(10),
    '&:last-child': {
      marginRight: 0,
    },
  },
}));
export const SocialLinkItem = styled(Grid)(({ theme }) => ({
  marginRight: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    '&:last-child': {
      marginRight: '0',
    },
  },
}));

export const SocialLinkList = styled(Grid)(({ theme }) => ({
  width: 'auto',
  flexGrow: 1,
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

export const LinkList = styled(Grid)(({ theme }) => ({
  width: 'auto',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

export const PhoneBox = styled(Box)(({ theme }) => ({
  display: 'flex',
}));
export const Phone = styled(Link)(({ theme }) => ({
  textDecoration: 'none',

  color: theme.palette.text.primary,
  marginRight: theme.spacing(4),
  marginTop: theme.spacing(0.5),
}));

const HeaderTop = (props: Props) => {
  const theme = useTheme();
  const [anchorContact, setAnchorContact] = React.useState(null);

  const handleClick = (event) => {
    setAnchorContact(anchorContact ? null : event.currentTarget);
  };

  const clickAwayHandler = () => {
    setAnchorContact(null);
  };
  const open = Boolean(anchorContact);
  const id = open ? 'contact-popper' : undefined;

  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        border: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      })}>
      <AppBar position="static" sx={{ boxShadow: 'none', border: 'none' }}>
        <Toolbar
          sx={{
            minHeight: theme.spacing(20) + '!important',
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
          }}>
          <LinkList container spacing={0} sx={{}}>
            {topHeaderData.links.map((el, i) => (
              <LinkItem item key={i}>
                <LinkCustom
                  href={el.path}
                  onClick={(e) => {
                    e.preventDefault();
                    props.snackbarShowMessage(
                      'Страница не найдена',
                      'info',
                      500,
                      <SentimentVeryDissatisfied />,
                    );
                  }}>
                  {el.text}
                </LinkCustom>
              </LinkItem>
            ))}
          </LinkList>
          <SocialLinkList container spacing={0}>
            {topHeaderData.socialLinks.map((el, i) => (
              <SocialLinkItem item key={i}>
                <SocialLinkCustom
                  sizeIcon={theme.spacing(6)}
                  href={el.url}
                  icon={el.iconUrl}
                />
              </SocialLinkItem>
            ))}
          </SocialLinkList>
          <PhoneBox>
            <Phone
              sx={{ fontSize: theme.typography.t4b }}
              href={`tel:${topHeaderData.phone.replace(/\D/g, '')}`}>
              {topHeaderData.phone}
            </Phone>{' '}
            <ClickAwayListener onClickAway={clickAwayHandler}>
              <div>
                <ButtonIcon
                  sx={{ display: 'flex', alignItems: 'center' }}
                  aria-describedby={id}
                  onClick={handleClick}
                  iconH={theme.spacing(8)}
                  iconW={theme.spacing(8)}
                  padding={theme.spacing(0)}
                  icon={'/static/icons/plus-circle.svg'}></ButtonIcon>
              </div>
            </ClickAwayListener>
            <PhonePopover id={id} open={open} anchorEl={anchorContact} />
          </PhoneBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withSnackbar(HeaderTop);
