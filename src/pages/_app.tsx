import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import "yakuhanjp/dist/css/yakuhanjp_s.css";
import { Auth } from "@/components";
import { fetcher } from "@/utils";
import { AppPropsWithLayout } from "@/types";

const theme = extendTheme({
  fonts: {
    heading: "YakuHanJPs",
    body: "YakuHanJPs",
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <SWRConfig value={{ fetcher, refreshInterval: 3000 }}>
          <Auth authenticated={!!pageProps.authenticated}>
            {getLayout(<Component {...pageProps} />)}
          </Auth>
        </SWRConfig>
      </RecoilRoot>
    </ChakraProvider>
  );
}
