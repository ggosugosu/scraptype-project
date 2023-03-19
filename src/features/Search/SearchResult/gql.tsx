import { gql } from '@apollo/client';

export const GET_TAGS_BY_TAG_ID = gql`
  query GetTagsByTagId($tag_ids: [Int]) {
    getTagsByTagId(tag_ids: $tag_ids) {
      id
      name
    }
  }
`;

export const GET_FONTS_BY_TAG_ID = gql`
  query GetFontsByTagId($tag_ids: [Int]) {
    getFontsByTagId(tag_ids: $tag_ids) {
      id
      name
      description
      corporation
    }
  }
`;

export const GET_FONTS_BY_CORP_AND_TEXT = gql`
  query GetFontsByCorpAndText($corporation: String, $text: String) {
    getFontsByCorpAndText(corporation: $corporation, text: $text) {
      id
      name
      description
      corporation
    }
  }
`;
