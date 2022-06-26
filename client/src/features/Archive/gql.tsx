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
      webFonts {
        family
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
