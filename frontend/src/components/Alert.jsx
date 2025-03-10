import { Alert as AlertMui, Snackbar } from '@mui/material';
import React from 'react';

export function Alert({ open, onClose, severity, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <AlertMui
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </AlertMui>
    </Snackbar>
  )
}
