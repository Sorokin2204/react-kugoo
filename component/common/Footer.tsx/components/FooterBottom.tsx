import React from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import LinkCustom from '../../Header/components/LinkCustom';
import SocialLinkCustom from '../../Header/components/SocialLinkCustom';
import { topHeaderData } from '../../../../data/topHeaderData';

type Props = {};

const FooterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
export const PayList = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: theme.spacing(17),

  gridGap: '5px',
}));
export const PayItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '34px',
  height: '23px',
  borderRadius: '2px',
  borderColor: `${theme.palette.grey[200]}`,
  borderWidth: '1px',
  border: `1px solid ${theme.palette.grey[200]}`,
}));
export const PayImage = styled('img')(({ theme }) => ({
  maxHeight: '18px',
  maxWidth: '28px',
}));
const PayLinkList = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('smd')]: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0 auto',
  },
}));
const PayLinkItem = styled(Box)(({ theme }) => ({}));
export const Chat = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
export const ChatText = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(7),
}));
export const ChatList = styled(Box)(({ theme }) => ({
  display: 'flex',
}));
export const ChatItem = styled(Box)(({ theme }) => ({
  '& + &': {
    marginLeft: theme.spacing(6),
  },
}));

const FooterBottom: React.FC<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <FooterBox
        sx={{
          pt: 10,
          pb: 12,
          [theme.breakpoints.down('smd')]: {
            pt: 6,
            pb: 6,
          },
        }}>
        <PayLinkList>
          <PayLinkItem>
            <LinkCustom href="/">Реквизиты</LinkCustom>
          </PayLinkItem>
          <PayLinkItem
            sx={{
              ml: 22,
              [theme.breakpoints.down('smd')]: {
                ml: 0,
              },
            }}>
            <LinkCustom href="/">Политика конфиденциальности</LinkCustom>
          </PayLinkItem>
        </PayLinkList>

        <PayList
          sx={{
            [theme.breakpoints.down('smd')]: {
              display: 'none',
            },
          }}>
          <PayItem>
            <PayImage src="/static/icons/google-pay.svg" />
          </PayItem>
          <PayItem>
            <PayImage src="/static/icons/apple-pay.svg" />{' '}
          </PayItem>
          <PayItem>
            <PayImage src="/static/icons/visa.svg" />{' '}
          </PayItem>
          <PayItem>
            <PayImage src="/static/icons/mastercard.svg" />{' '}
          </PayItem>
          <PayItem>
            <PayImage src="/static/icons/maestro.svg" />{' '}
          </PayItem>
          <PayItem>
            <PayImage src="/static/icons/webmoney.svg" />{' '}
          </PayItem>
          <PayItem>
            <PayImage src="/static/icons/qiwi.svg" />{' '}
          </PayItem>
        </PayList>
        <Chat
          sx={{
            [theme.breakpoints.down('smd')]: {
              display: 'none',
            },
          }}>
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
      </FooterBox>
    </>
  );
};

export default FooterBottom;
