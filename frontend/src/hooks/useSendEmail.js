import { useMutation } from '@tanstack/react-query';

const sendEmail = async (emailData) => {
  const response = await fetch('/api/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailData),
  });
  if (!response.ok) {
    throw new Error('Failed to send email');
  }
  return response.json();
};

export const useSendEmail = () => {
  return useMutation({
    mutationFn: (emailData) => sendEmail(emailData),
  });
};
