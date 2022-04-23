//import {fontDTO} from './dto/font_dto.js';
const express = require('express');
const app = express();
const PORT = 3200;
const path = '/graphql';
const {ApolloServer, gql} = require('apollo-server-express');
const fontDTO = require('./dto/font_dto');
const tagDTO = require('./dto/tag_dto');
const fontTagDTO = require('./dto/font_tag_dto');



const typeDefs = gql`
type Font {
    id: Int
    name: String
    description: String
    corporation: String
    isWebFont: Boolean
}

type Tag {
    id: Int
    name: String
}

type FontTag {
    id: Int
    font_id: Int
    tag_id: Int
}

type Query {
    getFont(id: Int!): Font
    getAllFont: [Font!]!
    getAllTag: [Tag!]!
}

type Mutation {
    createFontTag(font_id: Int!, tag_id: Int!): FontTag
}

# type Mutation {
#     createFont(name: String!, description: String!): Font
#     updateFont(id: Int, name: String!, description: String!): Font
#     deleteFont(id: Int, name: String!, description: String!): Font
# }
`;

const resolvers = {
    Query: {
        getAllFont: () => fontDTO.getAllFont(),
        getAllTag: () => tagDTO.getAllTag(),
    },
    Mutation: {
        createFontTag: (font_id, tag_id) => fontTagDTO.createFontTag({font_id, tag_id})
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
