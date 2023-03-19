import { gql } from '@apollo/client';

export const GET_FONT = gql`
  query {
    getFontAll {
      id
      name
      description
      corporation
    }
  }
`;

export const GET_TAG = gql`
  query {
    getTagAll {
      id
      name
    }
  }
`;

export const CREATE_FONT_TAG = gql`
  mutation CreateFontTag($font_id: Int!, $tag_id: Int!) {
    createFontTag(font_id: $font_id, tag_id: $tag_id) {
      id
      font_id
      tag_id
    }
  }
`;