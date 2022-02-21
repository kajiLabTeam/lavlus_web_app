import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DashboardLayout } from '../components';
import 'yakuhanjp/dist/css/yakuhanjp_s.css';
import { ReactNode } from 'react';

const theme = extendTheme({
  fonts: {
    heading: 'YakuHanJPs',
    body: 'YakuHanJPs',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        {pageProps.layout === 'dashboard' ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ChakraProvider>
  );
}
