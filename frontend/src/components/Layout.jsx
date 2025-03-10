import Head from 'next/head';
import { Sidebar } from '@/components';
import { Box } from '@mui/material';

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Email App</title>
        <meta name="description" content="Email App"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar/>
        <Box component="main" sx={{ flexGrow: 1, position: 'relative' }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
