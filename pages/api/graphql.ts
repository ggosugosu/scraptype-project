import { GraphQLError } from 'graphql';
import { createSchema, createYoga } from 'graphql-yoga';
import { NextApiRequest, NextApiResponse } from 'next';

import { Session } from 'next-auth';
import authORM from '../../server/orm/auth_orm';
import fontORM from '../../server/orm/font_orm';
import fontTagORM from '../../server/orm/font_tag_orm';
import imageFontORM from '../../server/orm/image_font_orm';
import tagORM from '../../server/orm/tag_orm';
import userORM from '../../server/orm/user_orm';
import webFontORM from '../../server/orm/web_font_orm';

const typeDefs = `
    type User {
      id: Int!
      name: String
      email: String
      kakao_id: String!
      role: String
    }

    type Auth {
      id: Int!
      user_id: Int!
      token: String
      expired_at: String
    }

    type Session {
      user: User!
      expires: String!
    }

    type Query {
      session: Session
    }

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
        fontTags: [FontTag]
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
        createUser(name: String!, email: String!, kakao_id: String!, token: String!, expired_at: String!): Auth
        createFontTag(font_id: Int!, tag_id: Int!): FontTag
        deleteFontTag(id: Int!): FontTag
        updateFontTag(font_id: Int, tag_id: Int): Boolean
        createWebFont(
            name: String
            description: String
            corporation: String
            is_web_font: Boolean
            source: String
        ): WebFont
        updateWebFont(
            font_id: Int!
            name: String
            description: String
            corporation: String
            is_web_font: Boolean
            source: String
        ): Boolean
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
        deleteFontByFontId(font_id: Int!): Boolean
        createTag(name: String): Tag
        updateTag(id: Int!, name: String): Tag
        deleteTagByTagId(tag_id: Int!): Boolean
    }
`;

const resolvers = {
  Query: {
    session(_source, _args, context) {
      return context.session ?? null;
    },
    getFontByFontId: (_, { font_id }) => fontORM.getFontByFontId({ font_id }),
    getFontAll: () => fontORM.getFontAll(),
    getFontsByTagId: (_, { tag_ids }) => fontORM.getFontsByTagId({ tag_ids }),
    getFontsByCorpAndText: (_, { corporation, text }) =>
      fontORM.getFontsByCorpAndText({ corporation, text }),
    getCorporationAll: () => fontORM.getCorporationAll(),

    getTagAll: () => tagORM.getTagAll(),
    getTagsByTagId: (_, { tag_ids }) => tagORM.getTagsByTagId({ tag_ids }),

    getFontTagAll: () => fontTagORM.getFontTagAll(),
    getFontTags: (_, { tag_ids }) => fontTagORM.getFontTags({ tag_ids }),

    getWebFontAll: () => webFontORM.getWebFontAll(),
    getImageFontAll: () => imageFontORM.getImageFontAll(),
  },
  Mutation: {
    createUser: (_, { name, email, kakao_id, token, expired_at }) =>
      userORM.createUser({
        name,
        email,
        kakao_id,
        token,
        expired_at,
      }),
    createFontTag: async (_, { font_id, tag_id }, { request }) => {
      return await validAuthorization({
        callback: () => fontTagORM.createFontTag({ font_id, tag_id }),
        request,
      });
    },
    deleteFontTag: async (_, { id }, { request }) => {
      return await validAuthorization({
        callback: () => fontTagORM.deleteFontTag({ id }),
        request,
      });
    },
    updateFontTag: async (_, { font_id, tag_id }, { request }) => {
      return await validAuthorization({
        callback: () => fontTagORM.updateFontTag({ font_id, tag_id }),
        request,
      });
    },
    createWebFont: async (
      _,
      { name, description, corporation, is_web_font, source },
      { request }
    ) => {
      return await validAuthorization({
        callback: () =>
          webFontORM.createWebFont({
            name,
            description,
            corporation,
            is_web_font,
            source,
          }),
        request,
      });
    },
    createImageFont: async (
      _,
      {
        name,
        description,
        corporation,
        is_web_font,
        title,
        unit,
        detail_mobile,
        detail_pc,
      },
      { request }
    ) => {
      return await validAuthorization({
        callback: () =>
          imageFontORM.createImageFont({
            name,
            description,
            corporation,
            is_web_font,
            title,
            unit,
            detail_mobile,
            detail_pc,
          }),
        request,
      });
    },
    updateImageFont: async (
      _,
      {
        font_id,
        name,
        description,
        corporation,
        is_web_font,
        title,
        unit,
        detail_mobile,
        detail_pc,
      },
      { request }
    ) => {
      return await validAuthorization({
        callback: () =>
          imageFontORM.updateImageFont({
            font_id,
            name,
            description,
            corporation,
            is_web_font,
            title,
            unit,
            detail_mobile,
            detail_pc,
          }),
        request,
      });
    },
    deleteFontByFontId: async (_, { font_id }, { request }) => {
      return await validAuthorization({
        callback: () => fontORM.deleteFontByFontId({ font_id }),
        request,
      });
    },
    createTag: async (_, { name }, { request }) => {
      return await validAuthorization({
        callback: () => tagORM.createTag({ name }),
        request,
      });
    },
    updateTag: async (_, { id, name }, { request }) => {
      return await validAuthorization({
        callback: () => tagORM.updateTag({ id, name }),
        request,
      });
    },
    deleteTagByTagId: async (_, { tag_id }, { request }) => {
      return await validAuthorization({
        callback: () => tagORM.deleteTagByTagId({ tag_id }),
        request,
      });
    },
  },
  User: {
    id(source) {
      return source;
    },
  },
};

const schema = createSchema<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  } & { session: Session }
>({ resolvers, typeDefs });

export default createYoga<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  { session: Session }
>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  graphiql: process.env.NODE_ENV !== 'production',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const validAuthorization = async ({ callback, request }) => {
  try {
    const authToken = request.headers.headersInit.authorization;

    if (authToken === undefined || authToken === '') {
      throw Error('토큰이 존재하지 않습니다.');
    }

    const token = authToken.split('Bearer ')[1];

    if (await authORM.existAuth({ token })) {
      return callback();
    }

    throw Error('토큰이 유효하지 않습니다.');
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
};
