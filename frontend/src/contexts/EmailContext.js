import React, { createContext, useState } from 'react';
import { useDebounce } from '@/hooks'; // Import the debounce hook

export const EmailContext = createContext({
  search: "",
  setSearch: () => {
  },
  debouncedSearch: "",
  selectedEmail: null,
  setSelectedEmail: () => {
  }
});

export const EmailProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const debouncedSearch = useDebounce(search, 500);

  return (
    <EmailContext.Provider
      value={{
        search,
        setSearch,
        debouncedSearch,
        selectedEmail,
        setSelectedEmail
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
