import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DashboardLayout, StandardLayout } from "../components/layouts";
import { Auth } from "../components";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { fetcher } from "../utils";
import "yakuhanjp/dist/css/yakuhanjp_s.css";

const theme = extendTheme({
  fonts: {
    heading: "YakuHanJPs",
    body: "YakuHanJPs",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      {/* @ts-ignore */}
      <RecoilRoot>
        <SWRConfig value={{ fetcher, refreshInterval: 3000 }}>
          <Auth authenticated={!!pageProps.authenticated}>
            {pageProps.layout === "dashboard" ? (
              <DashboardLayout>
                <Component {...pageProps} />
              </DashboardLayout>
            ) : pageProps.layout === "standard" ? (
              <StandardLayout>
                <Component {...pageProps} />
              </StandardLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </Auth>
        </SWRConfig>
      </RecoilRoot>
    </ChakraProvider>
  );
}
