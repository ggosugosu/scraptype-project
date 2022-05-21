import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "../src/components/Layout";
import { GlobalStyle } from "../src/components/globalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({ uri: "http://localhost:3200/graphql", cache: new InMemoryCache() });
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
