import { Alert, Portal, Slide, Snackbar } from '@mui/material';
import React, { useState } from 'react';

export const withSnackbar = (WrappedComponent) => {
  return (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("I'm a custom snackbar");
    const [duration, setDuration] = useState(2000);
    const [icon, setIcon] = useState(null);
    const [severity, setSeverity] =
      useState('success'); /** error | warning | info */

    const showMessage = (
      message,
      severity = 'success',
      duration = 2000,
      icon,
    ) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setIcon(icon);
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Portal>
          <Snackbar
            sx={{
              zIndex: '10000000000 !important',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            autoHideDuration={duration}
            open={open}
            onClose={handleClose}
            TransitionComponent={Slide}>
            <Alert
              {...(icon && { icon: icon })}
              variant="filled"
              onClose={handleClose}
              severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        </Portal>
      </>
    );
  };
};
