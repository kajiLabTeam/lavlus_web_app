import React from "react";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms";

const Auth = ({
  children,
  authenticated,
}: {
  children: ReactNode;
  authenticated: boolean;
}) => {
  const router = useRouter();
  const auth = useRecoilValue(authState);

  // ログインチェック中
  const isAuthChecking = auth === undefined;

  React.useEffect(() => {
    if (authenticated && !auth.isSignedIn) router.replace("/login");
  }, [auth]);

  //何もなければ次へ（そのまま処理）
  return (
    <>
      {
        // チェックが完了 & 認証しない
        !isAuthChecking && !authenticated
          ? children
          : // チェックが完了 & 認証されている
          !isAuthChecking && auth.isSignedIn
          ? children
          : null
      }
    </>
  );
};

export default Auth;
