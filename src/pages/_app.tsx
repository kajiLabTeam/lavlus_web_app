import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { Auth } from "@/components";
import { fetcher } from "@/utils";
import { AppPropsWithLayoutAndPageExtraInfo } from "@/types";
import "yakuhanjp/dist/css/yakuhanjp_s.css";

const theme = extendTheme({
  fonts: {
    heading: "YakuHanJPs",
    body: "YakuHanJPs",
  },
});

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayoutAndPageExtraInfo) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <SWRConfig value={{ fetcher, refreshInterval: 3000 }}>
          <Auth needsAuthentication={!!Component.needsAuthentication}>
            {getLayout(<Component {...pageProps} />)}
          </Auth>
        </SWRConfig>
      </RecoilRoot>
    </ChakraProvider>
  );
}
