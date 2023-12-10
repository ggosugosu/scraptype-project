import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GlobalStyle } from 'common/globalStyle';
import Layout from 'components/Layout';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import 'assets/fonts/fonts.css';
import 'common/filterColor.css';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { CookiesProvider } from 'react-cookie';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_HOST}`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token} ` : '',
    },
  };
});

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={pageProps.session}>
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
    </SessionProvider>
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
