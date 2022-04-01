import { useMutation } from '@apollo/client';
import { Add, Restore } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Link as LinkMUI } from '@mui/material';
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
import { RESET_DATABASE } from '../../graphql/mutation/db';
import { withSnackbar } from '../../hooks/useAlert';
import useAppConfig from '../../hooks/useAppConfig';
import Overlay from './Overlay';
import AttributeModal from './ProductAdd/AttributeModal';
import CategoryModal from './ProductAdd/CategoryModal';
import SpecModal from './ProductAdd/SpecModal';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

type Props = {};

const MainWrapper: React.FC<Props> = ({ children, snackbarShowMessage }) => {
  const router = useRouter();
  const theme = useTheme();
  const [resetDatabase] = useMutation(RESET_DATABASE);
  const [open, setOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openAttribute, setOpenAttribute] = useState<boolean>(false);
  const [openSpec, setOpenSpec] = useState<boolean>(false);
  const { adminHeaderTitle } = useAppConfig();
  const [visibleOverlay, setVisibleOverlay] = useState<boolean>(false);

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
    <Box sx={{ display: 'flex', position: 'relative' }}>
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
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{ '& .MuiPaper-root': { maxWidth: '250px' } }}>
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
          <ListItem
            button
            key={'reset-db'}
            onClick={() => {
              setVisibleOverlay(true);
              resetDatabase()
                .then(() => {
                  setVisibleOverlay(false);
                  snackbarShowMessage('База данных сброшена успешно');
                })
                .catch(() => {
                  setVisibleOverlay(false);
                  snackbarShowMessage('Что-то пошло не так', 'error');
                });
            }}>
            <ListItemIcon>
              <Restore />
            </ListItemIcon>
            <ListItemText primary={'Сброс базы данных'} />
          </ListItem>
        </List>
        <Typography variant="caption" sx={{ px: '16px' }}>
          *Данные доступны для удаления и редактирования. Чтобы откатить назад к
          демо-данным нажмите на "Сброс базы данных"
        </Typography>

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
      <Main open={open} sx={{ width: '100%' }}>
        <DrawerHeader />
        <Container
          sx={{
            py: '20px',
          }}>
          {' '}
          {children}
        </Container>
      </Main>
      {visibleOverlay && <Overlay />}
    </Box>
  );
};

export default withSnackbar(MainWrapper);
