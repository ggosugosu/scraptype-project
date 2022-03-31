 import { ApolloServer, gql } from 'apollo-server';


const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns a₩n array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chop',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  }
};


const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});



// import { GraphQLSchema } from "graphql";
// import { ApolloServer, gql } from "apollo-server-micro";
// import { makeSchema, objectType, stringArg } from "@nexus/schema";

// const User = objectType({
//   name: "User",
//   definition(t) {
//     t.string("id");
//     t.string("name");
//     t.string("email");
//   },
// });

// const Query = objectType({
//   name: "Query",
//   definition(t) {
//     t.list.field("user", {
//       type: "User",
//       resolve: (_, args) => {
//           console.log(args)
//         return [
//           { id: "test1", name: "TEST1", email: "test1@naver.com" },
//           { id: "test2", name: "TEST2", email: "test2@naver.com" },
//           { id: "test3", name: "TEST3", email: "test3@naver.com" },
//         ];
//       },
//     });
//   },
// });


// const typeDefs = gql`
//   type User {
//     id: ID
//     name: String
//     email: String
//   }
//   type Query {
//     users: [User]
//   }
// `;

// const resolvers = {
//   Query: {
//     users: () => {
//       return [
//         { id: "test1", name: "TEST1", email: "test1@naver.com" },
//         { id: "test2", name: "TEST2", email: "test2@naver.com" },
//         { id: "test3", name: "TEST3", email: "test3@naver.com" },
//       ];
//     },
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // const schema : GraphQLSchema = makeSchema({
// //   types: [
// //     Query,
// //     User,
// //   ]
// // })

// // const server = new ApolloServer({schema});



// const handler = server.createHandler({path: "/api/graphql"});

// export const config = { api: { bodyParser: false } };

// export default handler;

// // export default server.start().then(() => {
// //   return server.createHandler({ path: "/api/graphql" });
// // });;