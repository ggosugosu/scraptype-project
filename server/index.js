//import {fontORM} from './orm/font_orm.js';
const express = require("express");
const app = express();
const PORT = 3200;
const path = "/graphql";
const { ApolloServer, gql } = require("apollo-server-express");
const fontORM = require("./orm/font_orm");
const tagORM = require("./orm/tag_orm");
const fontTagORM = require("./orm/font_tag_orm");

const typeDefs = gql`
  type Font {
    id: ID
    name: String
    description: String
    corporation: String
  }

  type Tag {
    id: ID
    name: String
  }

  type FontTag {
    id: ID
    font_id: Int
    fonts: Font
    tag_id: Int
    tags: Tag
  }

  type Query {
    getFont(id: Int!): Font
    getAllFont: [Font!]!
    getAllTag: [Tag!]!
    getFontTagAll: [FontTag]
  }

  type Mutation {
    createFontTag(font_id: Int!, tag_id: Int!): FontTag
    deleteFontTag(font_id: Int!, tag_id: Int!): FontTag
  }
`;

const resolvers = {
  Query: {
    getAllFont: () => fontORM.getAllFont(),
    getAllTag: () => tagORM.getAllTag(),
    getFontTagAll: () => fontTagORM.getFontTagAll()
  },
  Mutation: {
    createFontTag: (_, { font_id, tag_id }) => {
      return fontTagORM.createFontTag({ font_id, tag_id });
    },
    deleteFontTag: (_, { font_id, tag_id }) => {
      return fontTagORM.deleteFontTag({ font_id, tag_id });
    },
  },

};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.start().then((res) => {
  server.applyMiddleware({ app, path });
  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${path}`));
});
