import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms';

export const Auth = ({ children }: { children: ReactNode }) => {
  //router
  const router = useRouter();
  const auth = useRecoilValue(authState);

  //signedInがtrueじゃなければ/loginへ
  if (typeof window !== 'undefined') {
    if (!auth.isSignedIn) router.replace('/login');
  }

  //何もなければ次へ（そのまま処理）
  return <>{children}</>;
};
