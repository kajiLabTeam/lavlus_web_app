import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from '@/types';
import useSWR from 'swr';

interface AuthProps {
  children: ReactNode;
  needsAuthentication: boolean;
}

const Auth = ({ children, needsAuthentication }: AuthProps) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { data: me } = useSWR<User>([`/me`]);

  // 認証が必要でないページなら、内容をそのまま表示する
  if (!needsAuthentication) return <>{children}</>;

  // 認証のチェックが終了していなければ、表示しない
  if (loading) return null;

  // サインインしていない状態
  if (user === null) router.push('/login');

  // ここからサインイン済み状態
  // swrの通信が完了するまで、表示しない
  if (me === undefined) return null;

  // 依頼者情報が登録されているかチェックする
  if (me.allowRequest) return <>{children}</>;
  // 依頼者登録されていなければ、登録画面へ
  else router.push('/requesterInfo');

  return null;
};

export default Auth;
