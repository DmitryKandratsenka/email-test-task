import React, { useContext } from 'react';
import { Box, Divider, IconButton, InputBase, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { EmailList } from './EmailList';
import { EmailContext } from '@/contexts/EmailContext';
import { useDebounce, useEmails } from '@/hooks';

export function Sidebar() {
  const { search, setSearch } = useContext(EmailContext);

  const debouncedSearch = useDebounce(search, 500);

  const { data: emails, isLoading, isError } = useEmails(debouncedSearch);


  return (
    <Box
      sx={{
        width: 300,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
        <InputBase
          placeholder="Search emails"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton sx={{ p: 1 }} disabled>
          <SearchIcon/>
        </IconButton>
      </Box>
      <Divider/>
      {isLoading ? (
        <Box sx={{ p: 2 }}>Loading...</Box>
      ) : isError ? (
        <Box sx={{ p: 2 }}>Error loading emails.</Box>
      ) : (
        <EmailList emails={emails}/>
      )}
    </Box>
  );
}
