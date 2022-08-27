const express = require('express');
const app = express();
const PORT = 3200;
const path = '/graphql';
const { ApolloServer, gql } = require('apollo-server-express');
const fontORM = require('./orm/font_orm');
const tagORM = require('./orm/tag_orm');
const fontTagORM = require('./orm/font_tag_orm');
const webFontORM = require('./orm/web_font_orm');
const imageFontORM = require('./orm/image_font_orm');

const typeDefs = gql`
  type Font {
    id: Int
    name: String
    description: String
    corporation: String
    is_web_font: Boolean
    fontTags: [FontTag]
    webFont: WebFont
    imageFont: ImageFont
  }

  type Tag {
    id: Int
    name: String
  }

  type FontTag {
    id: Int
    font_id: Int
    fonts: Font
    tag_id: Int
    tags: Tag
  }

  type WebFont {
    id: Int
    font_id: Int
    source: String
    font: Font
  }

  type ImageFont {
    id: Int
    font_id: Int
    title: String
    unit: String
    detail_mobile: String
    detail_pc: String
    font: Font
  }

  type Query {
    getFontByFontId(font_id: Int): Font
    getFontAll: [Font!]!
    getFontsByTagId(tag_ids: [Int]): [Font]
    getFontsByCorpAndText(corporation: String, text: String): [Font]
    getCorporationAll: [Font]
    getTagAll: [Tag!]!
    getTagsByTagId(tag_ids: [Int]): [Tag]
    getFontTagAll: [FontTag]
    getFontTags(tag_ids: [Int]): [FontTag]
    getWebFontByFontId: WebFont
    getWebFontAll: [WebFont]
    getImageFontByFontId: ImageFont
    getImageFontAll: [ImageFont]
  }

  type Mutation {
    createFontTag(font_id: Int!, tag_id: Int!): FontTag
    deleteFontTag(id: Int!): FontTag
    updateFontTag(font_id: Int, tag_id: Int): Boolean
    createWebFont(name: String, description: String, corporation: String, is_web_font: Boolean, source: String): WebFont
    updateWebFont(font_id: Int!, name: String, description: String, corporation: String, is_web_font: Boolean, source: String): Boolean
    createImageFont(
      name: String
      description: String
      corporation: String
      is_web_font: Boolean
      title: String
      unit: String
      detail_mobile: String
      detail_pc: String
    ): ImageFont
    updateImageFont(
      font_id: Int!
      name: String
      description: String
      corporation: String
      is_web_font: Boolean
      title: String
      unit: String
      detail_mobile: String
      detail_pc: String
    ): Boolean
  }
`;

const resolvers = {
  Query: {
    getFontByFontId: (_, { font_id }) => fontORM.getFontByFontId({ font_id }),
    getFontAll: () => fontORM.getFontAll(),
    getFontsByTagId: (_, { tag_ids }) => fontORM.getFontsByTagId({ tag_ids }),
    getFontsByCorpAndText: (_, { corporation, text }) => fontORM.getFontsByCorpAndText({ corporation, text }),
    getCorporationAll: () => fontORM.getCorporationAll(),

    getTagAll: () => tagORM.getTagAll(),
    getTagsByTagId: (_, { tag_ids }) => tagORM.getTagsByTagId({ tag_ids }),

    getFontTagAll: () => fontTagORM.getFontTagAll(),
    getFontTags: (_, { tag_ids }) => fontTagORM.getFontTags({ tag_ids }),

    getWebFontByFontId: (_, { font_id }) => webFontORM.getWebFontByFontId({ font_id }),
    getWebFontAll: () => webFontORM.getWebFontAll(),

    getImageFontByFontId: (_, { font_id }) => imageFontORM.getImageFontByFontId({ font_id }),
    getImageFontAll: () => imageFontORM.getImageFontAll(),
  },
  Mutation: {
    createFontTag: (_, { font_id, tag_id }) => fontTagORM.createFontTag({ font_id, tag_id }),
    deleteFontTag: (_, { id }) => fontTagORM.deleteFontTag({ id }),
    updateFontTag: (_, { font_id, tag_id }) => fontTagORM.updateFontTag({ font_id, tag_id }),

    createWebFont: (_, { name, description, corporation, is_web_font, source }) =>
      {
      console.log(`'createWebFont': ${name}`);
        return webFontORM.createWebFont({ name, description, corporation, is_web_font, source })
      },
    updateWebFont: (_, { font_id, name, description, corporation, is_web_font, source }) =>
      webFontORM.updateWebFont({ font_id, name, description, corporation, is_web_font, source }),

    createImageFont: (_, { name, description, corporation, is_web_font, title, unit, detail_mobile, detail_pc }) =>
      imageFontORM.createImageFont({ name, description, corporation, is_web_font, title, unit, detail_mobile, detail_pc }),
    updateImageFont: (_, { font_id, name, description, corporation, is_web_font, title, unit, detail_mobile, detail_pc }) =>
      imageFontORM.updateImageFont({ font_id, name, description, corporation, is_web_font, title, unit, detail_mobile, detail_pc }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.start().then((res) => {
  server.applyMiddleware({ app, path });
  app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${path}`));
});
