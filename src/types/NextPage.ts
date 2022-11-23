import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface PageExtraInfo {
  needsAuthentication?: boolean;
}

export type AppPropsWithLayoutAndPageExtraInfo = AppPropsWithLayout & {
  Component: PageExtraInfo; // (元の型) & PageExtraInfo
};

export type NextPageWithLayoutAndPageExtraInfo = NextPageWithLayout &
  PageExtraInfo;
