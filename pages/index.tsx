import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserList } from '../src/components'


const Home = () => {
  const client = new ApolloClient({ uri: "http://localhost:3000/api/graphql", cache: new InMemoryCache() });
  return (
    <ApolloProvider client={client}>
      <div>
        <UserList />
      </div>
    </ApolloProvider>
  );
};

export default Home;
