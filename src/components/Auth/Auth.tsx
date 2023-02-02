import React from 'react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { firebaseAuth } from '@/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useIdToken } from '@/hooks';
import { User } from '@/types';
import useSWR from 'swr';

interface AuthProps {
  children: ReactNode;
  needsAuthentication: boolean;
}

const Auth = ({ children, needsAuthentication }: AuthProps) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebaseAuth);
  const token = useIdToken();
  const { data: me } = useSWR<User>([`/me`, token]);

  // 認証が必要でないページなら、内容をそのまま表示する
  if (!needsAuthentication) return <>{children}</>;

  // 認証のチェックが終了していなければ、表示しない
  if (loading) return null;

  if (user) {
    // サインイン済み
    if (me == undefined) return null;
    // 依頼者情報が登録されているかチェックする
    if (me.allowRequest) return <>{children}</>;
    else {
      // 依頼者登録されていなければ、登録画面へ
      router.replace('/requesterInfo');
      return null;
    }
  } else {
    // サインインしていない状態
    router.replace('/login');
    return null;
  }
};

export default Auth;
