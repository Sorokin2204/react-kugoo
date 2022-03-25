import {
  Badge,
  Box,
  Button,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { topHeaderData } from '../../../../data/topHeaderData';
import useAppConfig from '../../../../hooks/useAppConfig';
import ButtonIcon from '../../ButtonIcon';
import CatalogPopover from './CatalogPopover';
import MobileMenu from './MobileMenu';
import Search from './Search';

type Props = {};

type HeaderBottomData = {};

const headerBottomData: HeaderBottomData[] = [{}];

const Logo = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    ...theme.typography.h3,
    fontWeight: '700',
  },
}));
const ButtonCatalog = styled(Button)<{ line: string }>(({ theme, line }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
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
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}));

export const BadgeRounded = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    minWidth: '16px',
    height: '16px',
    top: '35%',
    left: '27%',

    color: theme.palette.common.white,
    ...theme.typography.t5,
    lineHeight: '11px',
    padding: '0',
    paddingTop: '2px',
    backgroundColor: `${theme.palette.error.main} !important`,
  },
}));

const BurgerButton = styled(ButtonIcon)(({ theme, activeBurger }) => ({}));

const HeaderBottom: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const router = useRouter();
  const { cartProducts } = useAppConfig();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [cartCount, setCartCount] = useState(null);
  const [anchorElCatalog, setAnchorElCatalog] = React.useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const handleClick = (event) => {
    router.push('/cart');
  };

  useEffect(() => {
    setCartCount(_.sumBy(cartProducts, 'pieces'));
  }, [cartProducts]);

  const handleClickCatalog = (event) => {
    setAnchorElCatalog(event.currentTarget);
  };
  const handleCloseCatalog = () => {
    setAnchorElCatalog(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const open = Boolean(anchorEl);
  const openCatalog = Boolean(anchorElCatalog);
  const id = open ? 'simple-popover' : undefined;
  const idCatalog = open ? 'simple-popover' : undefined;

  return (
    <HeaderBox
      sx={() => ({
        pt: 15,
        pb: 18,
        [theme.breakpoints.down('md')]: {
          pb: 10,
          pt: 9,
        },
      })}>
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
      <Link
        href={`tel:${topHeaderData.phone.replace(/\D/g, '')}`}
        passHref={true}>
        <ButtonIcon
          iconW={theme.spacing(8)}
          iconH={theme.spacing(8)}
          iconColor={theme.palette.primary.main}
          padding={`0`}
          icon={'/static/icons/phone.svg'}
          sx={{
            mr: 7,
            ml: 'auto',
            justifySelf: 'flex-end',
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          }}></ButtonIcon>
      </Link>
      <BurgerButton
        iconW={theme.spacing(8)}
        iconH={theme.spacing(8)}
        onClick={handleToggleMobileMenu}
        padding={`0`}
        icon={''}
        activeBurger={openCatalog}
        sx={{
          '&::after': {
            display: 'none',
          },

          '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginRight: theme.spacing(6),
            '& > div': {
              transition: 'all 0.4s',
              ...(openMobileMenu && {
                '&:nth-child(1)': {
                  transform: 'rotate(135deg) translate(30%, -250%)',
                },
                '&:nth-child(2)': {
                  opacity: 0,
                },
                '&:nth-child(3)': {
                  transform: 'rotate(230deg) translate(15%, 130%)',
                },
              }),

              transform: 'rotate(180deg)',
              borderRadius: '10px',
              backgroundColor: theme.palette.primary.main,

              minHeight: '1.8px',
              width: '15px',
              marginBottom: '3px',
            },
          },
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        }}>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </BurgerButton>
      <Search />

      <BadgeRounded
        badgeContent={cartCount}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
          '& .MuiBadge-badge': {
            zIndex: 0,
            pointerEvents: 'none',
          },
        }}>
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
      </BadgeRounded>

      <MobileMenu
        open={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
      />
    </HeaderBox>
  );
};

export default HeaderBottom;
