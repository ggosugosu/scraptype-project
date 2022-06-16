import { gql } from "@apollo/client";

export const GET_WEB_FONT_ALL = gql`
  query {
    getWebFontAll {
      id
      font_id
      family
      source
      font {
        name
      }
    }
  }
`;
