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
        source
      }
    }
  }
`;
