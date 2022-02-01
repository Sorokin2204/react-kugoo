import React from 'react';
import { Box, Container, styled, Typography } from '@mui/material';

type Props = {};

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
  background: `url(/static/young-scooter.png) no-repeat 100% 0/ contain`,
}));
const BannerTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  position: 'relative',
  zIndex: 2,
}));

const CatalogBanner: React.FC<Props> = ({}) => {
  return (
    <BannerBox sx={{ py: 37 }}>
      <Container>
        <BannerTitle variant="h1">Электросамокаты Kugoo Kirin</BannerTitle>
      </Container>
    </BannerBox>
  );
};

export default CatalogBanner;
