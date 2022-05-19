import dynamic from 'next/dynamic';

export const Auth = dynamic(() => import('./Auth'), {
  ssr: false,
});
