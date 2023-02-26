import { gql } from '@apollo/client';

export const GET_FONT_ALL = gql`
  query {
    getFontAll {
      name
      fontTags {
        tags {
          name
        }
      }
    }
  }
`;
