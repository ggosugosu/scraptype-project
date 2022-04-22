//import {fontDTO} from './dto/font_dto.js';
const express = require('express');
const app = express();
const PORT = 3200;
const path = '/graphql';
const {ApolloServer, gql} = require('apollo-server-express');
const fontDTO = require('./dto/font_dto');



const typeDefs = gql`
type Font {
    id: Int
    name: String
    description: String
    corporation: String
}

type Query {
    getFont(id: Int!): Font
    getAllFont: [Font!]!
}

# type Mutation {
#     createFont(name: String!, description: String!): Font
#     updateFont(id: Int, name: String!, description: String!): Font
#     deleteFont(id: Int, name: String!, description: String!): Font
# }
`;

const resolvers = {
    Query: {
        getAllFont: () => {
            return fontDTO.getAllFont()
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });


// The `listen` method launches a web server.
server.start().then(
    res => {
        server.applyMiddleware({ app, path });
        app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
      )
    }
);
