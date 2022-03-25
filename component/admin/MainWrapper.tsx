import { Add } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as LinkMUI } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { adminMobileNavData } from '../../data/adminMobileNavData';
import useAppConfig from '../../hooks/useAppConfig';
import AttributeModal from './ProductAdd/AttributeModal';
import CategoryModal from './ProductAdd/CategoryModal';
import SpecModal from './ProductAdd/SpecModal';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

type Props = {};

const MainWrapper: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const [openSpec, setOpenSpec] = useState<boolean>(false);
  const { adminHeaderTitle } = useAppConfig();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSwithCategory = () => setOpenCategory(!openCategory);
  const handleSwithAttribute = () => setOpenAttribute(!openAttribute);
  const handleSwithSpec = () => setOpenSpec(!openSpec);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {adminHeaderTitle}
          </Typography>
          {router.asPath == '/admin/product-list' && (
            <Link href="/admin/product-add">
              <LinkMUI
                sx={{
                  marginLeft: 'auto',
                  marginTop: '3px',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: theme.palette.common.white,
                  [theme.breakpoints.down('md')]: {
                    '& span': {
                      display: 'none',
                    },
                  },
                }}>
                <span> Добавить товар</span>
                <Add
                  sx={{
                    ml: '6px',
                    fontSize: 26,
                  }}
                />
              </LinkMUI>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {adminMobileNavData.map((adminItem) => (
            <>
              <ListItem
                button
                key={adminItem.name}
                onClick={() => {
                  if (adminItem.type === 'page') {
                    router.push(`/admin/${adminItem.slug}`);
                  }
                  if (adminItem.type === 'modal') {
                    switch (adminItem.slug) {
                      case 'attributes':
                        handleSwithAttribute();
                        break;
                      case 'specs':
                        handleSwithSpec();
                        break;
                      case 'categories':
                        handleSwithCategory();
                        break;

                      default:
                        break;
                    }
                  }
                }}>
                <ListItemIcon>{adminItem.icon}</ListItemIcon>
                <ListItemText primary={adminItem.name} />
              </ListItem>
            </>
          ))}
        </List>
        {openCategory ? (
          <CategoryModal
            open={openCategory}
            handleClose={handleSwithCategory}
          />
        ) : null}
        {openAttribute ? (
          <AttributeModal
            open={openAttribute}
            handleClose={handleSwithAttribute}
          />
        ) : null}
        {openSpec ? (
          <SpecModal open={openSpec} handleClose={handleSwithSpec} />
        ) : null}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box> {children}</Box>
      </Main>
    </Box>
  );
};

export default MainWrapper;
