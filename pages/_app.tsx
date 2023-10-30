import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Layout from 'components/Layout';
import { GlobalStyle } from 'common/globalStyle';

import 'assets/fonts/fonts.css';
import 'common/filterColor.css';
import Script from 'next/script';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_HOST}`,
    cache: new InMemoryCache(),
  });
  const queryClient = new QueryClient();
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <RecoilRoot>
            <GlobalStyle />
            <Scripts />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </CookiesProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

const Scripts = () => {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js"
      integrity="sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH"
      crossOrigin="anonymous"
    ></Script>
  );
};
export default MyApp;
