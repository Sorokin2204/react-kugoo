import React from 'react';
import { Box, styled, Typography, useTheme } from '@mui/material';
import LinkCustom from '../../Header/components/LinkCustom';
import SocialLinkCustom from '../../Header/components/SocialLinkCustom';
import { topHeaderData } from '../../Header/components/HeaderTop';

type Props = {};

const FooterBottom: React.FC<Props> = ({}) => {
  const theme = useTheme();
  return (
    <>
      <FooterBox sx={{ pt: 10, pb: 12 }}>
        <PayLinkList>
          <PayLinkItem>
            <LinkCustom href="/">Реквизиты</LinkCustom>
          </PayLinkItem>
          <PayLinkItem sx={{ ml: 22 }}>
            <LinkCustom href="/">Политика конфиденциальности</LinkCustom>
          </PayLinkItem>
        </PayLinkList>

        <PayList>
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
        <Chat>
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
const FooterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
const PayList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: theme.spacing(17),
}));
const PayItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '34px',
  height: '23px',
  borderRadius: '2px',
  borderColor: `${theme.palette.grey[200]}`,
  borderWidth: '1px',
  '& + &': {
    marginLeft: theme.spacing(2.5),
  },
}));
const PayImage = styled('img')(({ theme }) => ({
  maxHeight: '18px',
  maxWidth: '28px',
}));
const PayLinkList = styled(Box)(({ theme }) => ({
  display: 'flex',
}));
const PayLinkItem = styled(Box)(({ theme }) => ({}));
const Chat = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
const ChatText = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(7),
}));
const ChatList = styled(Box)(({ theme }) => ({
  display: 'flex',
}));
const ChatItem = styled(Box)(({ theme }) => ({
  '& + &': {
    marginLeft: theme.spacing(6),
  },
}));
