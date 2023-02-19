import dynamic from 'next/dynamic';

export const GeoJsonEditor = dynamic(() => import('./GeoJsonEditor'), {
  ssr: false,
});
