import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Layout from 'components/Layout';
import { GlobalStyle } from 'common/globalStyle';
import 'assets/fonts/fonts.css';
import 'common/filterColor.css';

function MyApp({Component, pageProps}: AppProps) {
  const client = new ApolloClient({uri: `${process.env.NEXT_PUBLIC_HOST}`, cache: new InMemoryCache()});
  const queryClient = new QueryClient();
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
