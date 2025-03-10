import { useQuery } from '@tanstack/react-query';

const fetchEmails = async (searchTerm) => {
  const response = await fetch(`/api/emails?search=${encodeURIComponent(searchTerm)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch emails');
  }
  return response.json();
};

export const useEmails = (searchTerm) => {
  return useQuery({
    queryKey: ['emails', searchTerm],
    queryFn: () => fetchEmails(searchTerm),
    staleTime: 5000,
  });
};
