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
    fontTags: [FontTag]
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
    getFontAll: [Font!]!
    getFontsByTagId(tag_ids: [Int]): [Font]
    getTagAll: [Tag!]!
    getTagsByTagId(tag_ids: [Int]): [Tag]
    getFontTagAll: [FontTag]
    getFontTags(tag_ids: [Int]): [FontTag]
  }

  type Mutation {
    createFontTag(font_id: Int!, tag_id: Int!): FontTag
    deleteFontTag(id: Int!): FontTag
  }
`;

const resolvers = {
  Query: {
    getFontAll: () => fontORM.getFontAll(),
    getFontsByTagId: (_, { tag_ids }) => fontORM.getFontsByTagId({ tag_ids }),
    getTagAll: () => tagORM.getTagAll(),
    getTagsByTagId: (_, {tag_ids}) => tagORM.getTagsByTagId({tag_ids}),
    getFontTagAll: () => fontTagORM.getFontTagAll(),
    getFontTags: (_, { tag_ids }) => fontTagORM.getFontTags({ tag_ids }),
  },
  Mutation: {
    createFontTag: (_, { font_id, tag_id }) => {
      return fontTagORM.createFontTag({ font_id, tag_id });
    },
    deleteFontTag: (_, { id }) => {
      return fontTagORM.deleteFontTag({ id });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.start().then((res) => {
  server.applyMiddleware({ app, path });
  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${path}`));
});
