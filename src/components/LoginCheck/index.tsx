import dynamic from "next/dynamic";

export const LoginCheck = dynamic(() => import("./LoginCheck"), {
  ssr: false,
});
