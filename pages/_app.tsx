// import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { DashboardLayout, StandardLayout } from '../components/layouts';
import { RecoilRoot } from 'recoil';
import 'yakuhanjp/dist/css/yakuhanjp_s.css';

const theme = extendTheme({
  fonts: {
    heading: 'YakuHanJPs',
    body: 'YakuHanJPs',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        {/* <SessionProvider session={pageProps.session}> */}
        {pageProps.layout === 'dashboard' ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : pageProps.layout === 'standard' ? (
          <StandardLayout>
            <Component {...pageProps} />
          </StandardLayout>
        ) : (
          <Component {...pageProps} />
        )}
        {/* </SessionProvider> */}
      </RecoilRoot>
    </ChakraProvider>
  );
}