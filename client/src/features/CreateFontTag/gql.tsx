import { gql } from "@apollo/client";

export const GET_FONT = gql`
  query {
    getAllFont {
      id
      name
      description
      corporation
    }
  }
`;

export const GET_TAG = gql`
  query {
    getAllTag {
      id
      name
    }
  }
`;

export const CREATE_FONT_TAG = gql`
  query(font_id, tag_id) {
    createFontTag {
      id
      font_id
      tag_id
    }
  }
`;