import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CreateFontTag from "../src/components/CreateFontTag";

const Home = (props) => {
  const client = new ApolloClient({ uri: "http://localhost:3200/graphql", cache: new InMemoryCache() });
  return (
    <ApolloProvider client={client}>
      <div>
        <CreateFontTag />
      </div>
    </ApolloProvider>
  );
};

export default Home;
