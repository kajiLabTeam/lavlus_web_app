import React from 'react';
import { firebaseAuth } from '@/utils';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useIdToken = () => {
  const [token, setToken] = React.useState<string>();
  const [user, loading, error] = useAuthState(firebaseAuth);

  React.useEffect(() => {
    const getIdToken = async () => {
      if (user) setToken(await user.getIdToken());
    };
    getIdToken();
  }, [user]);

  return token;
};
