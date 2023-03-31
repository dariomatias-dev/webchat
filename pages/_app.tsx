import type { AppProps } from 'next/app';
import '@/styles/globals.scss';

import { ProviderData } from '@/components/Context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderData>
      <Component {...pageProps} />
    </ProviderData>
  );
};
