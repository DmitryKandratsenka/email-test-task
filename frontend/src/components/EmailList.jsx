import React, { useContext } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { EmailContext } from '@/contexts/EmailContext';

export function EmailList({ emails }) {
  const { setSelectedEmail } = useContext(EmailContext);

  return (
    <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
      {emails.length ? emails.map((email) => (
        <ListItemButton key={email.id} onClick={() => setSelectedEmail(email)}>
          <ListItemText
            primary={email.subject}
            secondary={`${email.body.substring(0, 50)}...`}
          />
        </ListItemButton>
      )) : <ListItemText sx={{ display: 'flex', justifyContent: 'center'}}>No emails found</ListItemText>}
    </List>
  );
}
