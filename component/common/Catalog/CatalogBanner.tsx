import { Box, Container, styled, Typography } from '@mui/material';
import React from 'react';

type Props = { title: string };

const BannerBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    background: `linear-gradient(88.23deg, #6F73EE 34.95%, rgba(111, 115, 238, 0) 59.45%)`,
    position: 'absolute',
    top: '0',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  borderRadius: '10px',
  overflow: 'hidden',
  background: `url(/static/common/young-scooter.png) no-repeat -100% 0/ cover`,
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(27),
    paddingBottom: theme.spacing(27),
  },
  [theme.breakpoints.down('smd')]: {
    paddingTop: theme.spacing(17),
    paddingBottom: theme.spacing(17),
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));
const BannerTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  position: 'relative',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.h4,
    fontWeight: '600',
  },
}));

const CatalogBanner: React.FC<Props> = ({ title }) => {
  return (
    <BannerBox sx={{ py: 37 }}>
      <Container>
        <BannerTitle variant="h1">{title}</BannerTitle>
      </Container>
    </BannerBox>
  );
};

export default CatalogBanner;
