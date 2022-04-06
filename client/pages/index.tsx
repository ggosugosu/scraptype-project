import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import FontList from "../src/components/FontList";

const Home = (props) => {
  const client = new ApolloClient({ uri: "http://localhost:3200/graphql", cache: new InMemoryCache() });
  return (
    <ApolloProvider client={client}>
      <div>
        <FontList />
      </div>
    </ApolloProvider>
  );
};

export default Home;
