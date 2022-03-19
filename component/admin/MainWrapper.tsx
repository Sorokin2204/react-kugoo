import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { adminMobileNavData } from '../../data/adminMobileNavData';
import { useRouter } from 'next/router';
import CategoryModal from './ProductAdd/CategoryModal';
import AttributeModal from './ProductAdd/AttributeModal';
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
  // necessary for content to be below app bar
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
            Persistent drawer
          </Typography>
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
        <CategoryModal open={openCategory} handleClose={handleSwithCategory} />
        <AttributeModal
          open={openAttribute}
          handleClose={handleSwithAttribute}
        />
        <SpecModal open={openSpec} handleClose={handleSwithSpec} />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box> {children}</Box>
      </Main>
    </Box>
  );
};

export default MainWrapper;
