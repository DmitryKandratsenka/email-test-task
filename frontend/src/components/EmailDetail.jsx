import { useEmailById } from '@/hooks/useEmailById';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useMemo } from 'react';

export function EmailDetail({ email }) {
  const { data: emailDetails, isFetching } = useEmailById(email.id);

  const content = useMemo(() => {
    if (!emailDetails) {
      return <Typography>Email not found</Typography>
    }

    return (
      <Box>
        <h2>{emailDetails.subject}</h2>
        <p><strong>To:</strong> {emailDetails.to}</p>
        {emailDetails.cc && <p><strong>CC:</strong> {emailDetails.cc}</p>}
        {emailDetails.bcc && <p><strong>BCC:</strong> {emailDetails.bcc}</p>}
        <Box>{emailDetails.body}</Box>
      </Box>
    )
  }, [emailDetails]);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
      {isFetching
        ?
        <Box sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex'
        }}><CircularProgress/></Box>
        : content
      }
    </Box>
  );
}
