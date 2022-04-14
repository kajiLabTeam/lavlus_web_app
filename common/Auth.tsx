import React from 'react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms';

export const Auth = ({
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
    if (authenticated && !auth.isSignedIn) router.replace('/login');
  }, [auth]);

  //何もなければ次へ（そのまま処理）
  return (
    <>
      {!isAuthChecking && !authenticated
        ? children
        : auth.isSignedIn
        ? children
        : null}
    </>
  );
};
