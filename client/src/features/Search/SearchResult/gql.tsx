import { gql } from "@apollo/client";

export const GET_FONTS_BY_TAG_ID = gql`
  query GetFontsByTagId($tag_ids: [Int]) {
    getFontsByTagId(tag_ids: $tag_ids) {
      name
      description
      corporation
    }
  }
`;
