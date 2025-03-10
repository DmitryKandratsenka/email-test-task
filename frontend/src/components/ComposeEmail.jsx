import React, { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useSendEmail } from '@/hooks/useSendEmail';
import { useQueryClient } from '@tanstack/react-query';
import EmailIcon from '@mui/icons-material/Email';
import { Alert } from '@/components';

export default function ComposeEmail() {
  const queryClient = useQueryClient();

  const [isComposing, setIsComposing] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { mutate: sendEmail, isLoading } = useSendEmail();

  const handleSnackbarClose = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  const handleComposeClick = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleComposeClose = useCallback(() => {
    setIsComposing(false);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    sendEmail(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['emails']);
        setSnackbarMessage('Email sent successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        handleComposeClose();
      },
      onError: () => {
        setSnackbarMessage('Failed to send email.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      },
    });
  }, [formData, handleComposeClose, queryClient, sendEmail]);

  return (
    <>
      <Dialog open={isComposing} onClose={handleComposeClose} fullWidth maxWidth="sm">
        <DialogTitle>Compose Email</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <TextField
              label="To"
              type="email"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="CC"
              type="email"
              value={formData.cc}
              onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="BCC"
              type="email"
              value={formData.bcc}
              onChange={(e) => setFormData({ ...formData, bcc: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Body"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              fullWidth
              required
              margin="dense"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleComposeClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Alert
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
      <IconButton
        color="primary"
        onClick={handleComposeClick}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <EmailIcon fontSize="large"/>
      </IconButton>
    </>
  );
}
