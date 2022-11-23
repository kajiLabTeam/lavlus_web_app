import React from "react";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { firebaseAuth } from "@/utils";

interface AuthProps {
  children: ReactNode;
  needsAuthentication: boolean;
}

const Auth = ({ children, needsAuthentication }: AuthProps) => {
  const router = useRouter();
  const [signInCheck, setSignInCheck] = React.useState<boolean>();

  // サインイン状態のチェックを行う
  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      // サインイン済み
      if (user) setSignInCheck(true);
      // サインインしていない状態
      else setSignInCheck(false);
    });
  }, []);

  // 認証が必要でないページなら、内容をそのまま表示する
  if (!needsAuthentication) return <>{children}</>;

  // 認証のチェックが終了していなければ、表示しない
  if (signInCheck === undefined) return null;

  // 認証のチェックが終了したら、ページを遷移させる
  if (signInCheck) {
    // サインイン済み
    return <>{children}</>;
  } else {
    // サインインしていない状態
    router.replace("/login");
    return null;
  }
};

export default Auth;
