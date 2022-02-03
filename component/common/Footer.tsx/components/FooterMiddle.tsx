import React from 'react';
import { Box, styled, Typography } from '@mui/material';

type Props = {};

type SocialType = {
  icon: string;
  name: string;
  subscribeCount: number;
};

const socialData: SocialType[] = [
  {
    icon: '/static/icons/vk-color.svg',
    name: 'Вконтакте',
    subscribeCount: 3300,
  },
  {
    icon: '/static/icons/instagram-color.svg',
    name: 'Instagram',
    subscribeCount: 10602,
  },
  {
    icon: '/static/icons/youtube-color.svg',
    name: 'YouTube',
    subscribeCount: 3603,
  },
  {
    icon: '/static/icons/telegram-color.svg',
    name: 'Telegram',
    subscribeCount: 432,
  },
];

const FooterMiddleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderTop: `1px solid rgba(93, 108, 123,0.15);`,
  borderBottom: `1px solid rgba(93, 108, 123,0.15);`,
}));
const FooterLogo = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  marginRight: theme.spacing(30),
}));
const FooterMobApp = styled('img')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '10px',
  display: 'block',
  '& + &': {
    marginLeft: theme.spacing(5),
  },
}));
const FooterMobAppList = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginRight: 'auto',
}));
const FooterSocialList = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginLeft: 'auto',
}));
const FooterSocialItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '5px',
  display: 'flex',
  '& + &': {
    marginLeft: theme.spacing(5),
  },
}));
const FooterSocialIcon = styled('img')(({ theme }) => ({}));
const FooterSocialBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(5.5),
}));
const FooterSocialName = styled(Typography)(({ theme }) => ({}));
const FooterSocialCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

const FooterMiddle: React.FC<Props> = ({}) => {
  return (
    <FooterMiddleWrapper sx={{ py: 17.5 }}>
      <FooterLogo variant="h2">Kugoo</FooterLogo>
      <FooterMobAppList>
        <FooterMobApp src="/static/icons/app-store.svg"></FooterMobApp>
        <FooterMobApp src="/static/icons/google-play.svg"></FooterMobApp>
      </FooterMobAppList>
      <FooterSocialList>
        {socialData.map((el, i) => (
          <FooterSocialItem key={i} sx={{ pl: 6, py: 3, pr: 10 }}>
            <FooterSocialIcon src={el.icon} />
            <FooterSocialBox>
              <FooterSocialName variant="t3b">{el.name}</FooterSocialName>
              <FooterSocialCount variant="t5">
                {el.subscribeCount}
              </FooterSocialCount>
            </FooterSocialBox>
          </FooterSocialItem>
        ))}
      </FooterSocialList>
    </FooterMiddleWrapper>
  );
};

export default FooterMiddle;
