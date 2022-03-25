import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => {};
  title: string;
  text: string;
};

const AlertDelete: React.FC<Props> = ({
  open,
  handleClose,
  handleDelete,
  title,
  text,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
        <Button
          color="error"
          onClick={() => {
            handleClose();
            handleDelete();
          }}
          autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDelete;
