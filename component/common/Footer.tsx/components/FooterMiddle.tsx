import { Box, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import { socialData } from '../../../../data/socialData';

type Props = {};

const FooterMiddleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderTop: `1px solid rgba(93, 108, 123,0.15);`,
  borderBottom: `1px solid rgba(93, 108, 123,0.15);`,

  [theme.breakpoints.down('smd')]: {
    flexWrap: 'wrap',
  },
}));
const FooterLogo = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  marginRight: theme.spacing(30),
  [theme.breakpoints.down('lg')]: {
    marginRight: theme.spacing(15),
  },
  [theme.breakpoints.down('md')]: {
    marginRight: theme.spacing(30),
  },
  [theme.breakpoints.down('smd')]: {
    display: 'block',
    margin: '0 auto',
    marginBottom: theme.spacing(12.5),
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
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
  [theme.breakpoints.down('smd')]: {
    flexBasis: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(12.5),
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
const FooterSocialList = styled(Box)(({ theme }) => ({
  display: 'grid',
  marginLeft: 'auto',
  gridTemplateColumns: 'repeat(4,1fr)',
  gridGap: '10px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2,auto)',
    margin: '0 auto',
  },
  [theme.breakpoints.down('smd')]: {
    flexBasis: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const FooterSocialItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '5px',
  display: 'flex',
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
  const theme = useTheme();
  return (
    <FooterMiddleWrapper
      sx={{
        py: 17.5,
        [theme.breakpoints.down('smd')]: {
          py: 12.5,
        },
      }}>
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
