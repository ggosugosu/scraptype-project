import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "components/Layout";
import { GlobalStyle } from "common/globalStyle";
import "assets/fonts/fonts.css"
import "common/filterColor.css"

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({ uri: `${process.env.NEXT_PUBLIC_HOST}`, cache: new InMemoryCache() });
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
      <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
