import { useQuery } from '@tanstack/react-query';

const fetchEmail = async (id) => {
  const response = await fetch(`/api/emails/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch emails');
  }
  return response.json();
};

export const useEmailById = (id) => {
  return useQuery({
    queryKey: ['email', id],
    queryFn: () => fetchEmail(id),
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!id
  });
};
