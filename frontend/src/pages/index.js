import { Box, Typography } from '@mui/material';
import { EmailDetail } from '@/components';
import { EmailContext } from '@/contexts/EmailContext';
import React, { useContext } from 'react';
import ComposeEmail from '@/components/ComposeEmail';

export default function Home() {
  const { selectedEmail } = useContext(EmailContext);

  return (
    <>
      {selectedEmail
        ? <EmailDetail email={selectedEmail}/>
        : <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <Typography>No email has been selected</Typography>
        </Box>
      }
      <ComposeEmail/>
    </>
  )
}

