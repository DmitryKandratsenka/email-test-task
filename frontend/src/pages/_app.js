import "@/styles/globals.css";
import { Layout } from '@/components';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EmailProvider } from '@/contexts/EmailContext';

const queryClient = new QueryClient({
  defaultOptions: {
    placeholderData: (prev) => prev
  }
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline/>
      <EmailProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EmailProvider>
    </QueryClientProvider>
  );
}
