import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserList } from "../src/components";

const Home = (props) => {
  const {name, desc} = props
  //const client = new ApolloClient({ uri: "http://localhost:3000/api/graphql", cache: new InMemoryCache() });
  return (
    //<ApolloProvider client={client}>
      <div>
      {/* <UserList /> */}
        <div>{name}</div>
        <div>{desc}</div>
      </div>
    //</ApolloProvider>
  );
};

export async function getStaticProps({ params }) {
  const res = await fetch("http://localhost:3000/api/hello");
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return { props: data };
  } else {
    console.log("error");
    return { props: {} };
  }
}

export default Home;
