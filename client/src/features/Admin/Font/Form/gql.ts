import { gql } from '@apollo/client';

export const GET_FONT_BY_FONT_ID = gql`
  query GetFontByFontId($font_id: Int) {
    getFontByFontId(font_id: $font_id) {
      id
      name
      description
      corporation
      webFont {
        source
      }
      imageFont {
        title
        unit
        detail_mobile
        detail_pc
      }
    }
  }
`;
