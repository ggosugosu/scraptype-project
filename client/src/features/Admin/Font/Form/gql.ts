import { Title } from './../../../../components/PageTitle/style';
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

export const GET_WEB_FONT_BY_FONT_ID = gql`
  query GetWebFontByFontId($font_id: Int) {
    getWebFontByFontId(font_id: $font_id) {
      webFont {
        source
      }
    }
  }
`;

export const GET_IMAGE_FONT_BY_FONT_ID = gql`
  query GetImageFontByFontId($font_id: Int) {
    getImageFontByFontId(font_id: $font_id) {
      imageFont {
        title
        unit
        detail_mobile
        detail_pc
      }
    }
  }
`;
