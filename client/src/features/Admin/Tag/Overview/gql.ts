import { gql } from '@apollo/client';

export const GET_TAG_ALL = gql`
  query {
    getTagAll {
      id
      name
      fontTags {
        fonts {
          id
        }
      }
    }
  }
`;
