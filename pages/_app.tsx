import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DashboardLayout } from '../components';
import 'yakuhanjp/dist/css/yakuhanjp_s.css';

const theme = extendTheme({
  fonts: {
    heading: 'YakuHanJPs',
    body: 'YakuHanJPs',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  switch (pageProps.layout) {
    case 'dashboard': {
      return (
        <SessionProvider session={pageProps.session}>
          <ChakraProvider theme={theme}>
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          </ChakraProvider>
        </SessionProvider>
      );
    }
    default: {
      return (
        <SessionProvider session={pageProps.session}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </SessionProvider>
      );
    }
  }
}
