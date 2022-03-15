import React, { useState } from 'react';
import {
  Container,
  Drawer,
  DrawerProps,
  styled,
  useTheme,
} from '@mui/material';
import { SentimentVeryDissatisfied } from '@mui/icons-material';
import { topHeaderData } from '../../../../data/topHeaderData';
import {
  LinkItem,
  LinkList,
  SocialLinkItem,
  SocialLinkList,
} from './HeaderTop';
import LinkCustom from './LinkCustom';
import SocialLinkCustom from './SocialLinkCustom';
import { withSnackbar } from '../../../../hooks/useAlert';
import Nav from './Nav';
import {
  Chat,
  ChatItem,
  ChatList,
  ChatText,
} from '../../Footer.tsx/components/FooterBottom';

type Props = {};
const MobileMenuStyled = styled(Drawer)(({ theme }) => ({
  zIndex: 0,
  top: '60px',
  '& .MuiPaper-root': {
    width: '100vw',
    top: '60px',
    height: 'calc(100% - 110px )',
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
  },
  '& .MuiBackdrop-root': {
    display: 'none',
  },
}));
const MobileMenu: React.FC<Props & DrawerProps> = (props) => {
  const theme = useTheme();
  return (
    <>
      <MobileMenuStyled anchor={'right'} {...props}>
        <Nav />
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
        {/* <SocialLinkList container spacing={0}>
            {topHeaderData.socialLinks.map((el, i) => (
              <SocialLinkItem item key={i}>
                <SocialLinkCustom
                  sizeIcon={theme.spacing(6)}
                  href={el.url}
                  icon={el.iconUrl}
                />
              </SocialLinkItem>
            ))}
          </SocialLinkList> */}
        <Chat sx={{ justifyContent: 'center', mt: 7.5, mb: 10 }}>
          <ChatText variant="t3">Online чат:</ChatText>
          <ChatList container spacing={0}>
            {topHeaderData.socialLinks.map((el, i) => (
              <ChatItem item key={i}>
                <SocialLinkCustom
                  sizeIcon={theme.spacing(8)}
                  href={el.url}
                  icon={el.iconUrl}
                />
              </ChatItem>
            ))}
          </ChatList>
        </Chat>
      </MobileMenuStyled>
    </>
  );
};

export default withSnackbar(MobileMenu);
