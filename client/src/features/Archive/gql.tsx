import { gql } from '@apollo/client';

export const GET_FONT_ALL = gql`
  query {
    getFontAll {
      id
      name
      description
      corporation
      fontTags {
        tags {
          name
        }
      }
      webFont {
        source
      }
    }
  }
`;

export const GET_FONT_BY_FONT_ID = gql`
  query GetFontByFontId($font_id: Int) {
    getFontByFontId(font_id: $font_id) {
      id
      name
      fontTags {
        tags {
          id
          name
        }
      }
    }
    getTagAll {
      id
      name
    }
  }
`;

export const UPDATE_FONT_TAG = gql`
  mutation UpdateFontTag($font_id: Int, $tag_id: Int) {
    updateFontTag(font_id: $font_id, tag_id: $tag_id)
  }
`;
