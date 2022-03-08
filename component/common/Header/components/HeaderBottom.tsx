import React from 'react';
import { Box, Button, styled, Typography, useTheme } from '@mui/material';
import Search from './Search';
import CartPopover from './CartPopover';
import CatalogPopover from './CatalogPopover';
import ButtonIcon from '../../ButtonIcon';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {};

type HeaderBottomData = {};

const headerBottomData: HeaderBottomData[] = [{}];

const Logo = styled(Typography)(({ theme }) => ({}));
const ButtonCatalog = styled(Button)<{ line: string }>(({ theme, line }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(8),
  paddingRight: theme.spacing(9),
  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: theme.spacing(6),
    '& > div': {
      transform: 'rotate(180deg)',
      backgroundImage: `url(${line})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      minHeight: '2px',
      width: '13px',
      marginBottom: '3px',
      '&:last-child': {
        minHeight: '2px',
        position: 'relative',
        backgroundSize: 'cover',
        width: '7px',
        '&::after': {
          transition: 'left 0.3s',
          content: '""',
          display: 'block',
          minHeight: '2px',
          width: '6px',
          backgroundImage: `url(${line})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'absolute',
          top: '0',
          left: '100%',
          zIndex: '1',
          transform: 'rotate(180deg) translateY(-0.7px)',
        },
        transition: 'all 0.3s',
        marginBottom: '0px',
      },
    },
  },

  '&:hover > div': {
    '& > div': {
      '&:last-child': {
        '&::after': {
          transition: 'left 0.3s',
          left: '20%',
        },
      },
    },
  },
}));
const ButtonRounded = styled(Button)<{
  icon: string;
  iconW: string;
  iconH: string;
}>(({ theme, icon, iconW, iconH }) => ({
  '&, &:hover': {
    borderRadius: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    color: theme.palette.text.primary,
    padding: `${theme.spacing(5)} ${theme.spacing(7)}`,
  },
  '&::before': {
    content: '""',
    dislpay: 'block',
    background: `url(${icon}) no-repeat 0 0/contain`,
    width: iconW,
    height: iconH,
    marginRight: theme.spacing(5),
  },
}));
const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const HeaderBottom: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElCatalog, setAnchorElCatalog] = React.useState(null);

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    router.push('/cart');
  };

  const handleClickCatalog = (event) => {
    setAnchorElCatalog(event.currentTarget);
  };
  const handleCloseCatalog = () => {
    setAnchorElCatalog(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const openCatalog = Boolean(anchorElCatalog);
  const id = open ? 'simple-popover' : undefined;
  const idCatalog = open ? 'simple-popover' : undefined;

  return (
    <HeaderBox sx={{ pt: 15, pb: 18 }}>
      <Logo
        sx={{ mr: 18, cursor: 'pointer' }}
        variant="h2"
        onClick={() => {
          router.push('/');
        }}>
        KUGOO
      </Logo>
      <ButtonCatalog
        aria-describedby={idCatalog}
        onClick={handleClickCatalog}
        sx={{ mr: 10 }}
        variant="contained"
        line={'/static/icons/line.svg'}>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Каталог
      </ButtonCatalog>
      <CatalogPopover
        id={idCatalog}
        open={openCatalog}
        anchorEl={anchorElCatalog}
        onClose={handleCloseCatalog}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      />
      <Search />
      {/* <ButtonIcon
        iconW={theme.spacing(10)}
        iconH={theme.spacing(6)}
        padding={`0`}
        icon={'/static/icons/compare.svg'}
        sx={{ mr: 10, ml: 24 }}></ButtonIcon>
      <ButtonIcon
        sx={{ mr: 10 }}
        iconW={theme.spacing(10)}
        iconH={theme.spacing(7)}
        padding={`0`}
        icon={'/static/icons/favorite.svg'}></ButtonIcon> */}
      <ButtonRounded
        aria-describedby={id}
        onClick={handleClick}
        variant={'contained'}
        icon={'/static/icons/cart-fill.svg'}
        iconW={theme.spacing(10)}
        iconH={theme.spacing(8)}
        sx={{ fontSize: theme.typography.t3b }}>
        Корзина
      </ButtonRounded>
      <CartPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      />
    </HeaderBox>
  );
};

export default HeaderBottom;
