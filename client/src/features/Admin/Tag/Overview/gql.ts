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

export const UPDATE_TAG = gql`
    mutation UpdateTag (
        $id: Int!
        $name: String
    ) {
        updateTag(
            id: $id
            name: $name
        ){
            id
            name
        }
    }
`;



export const DELETE_TAG = gql`
    mutation DeleteTagByTagId($tag_id: Int!) {
        deleteTagByTagId(tag_id: $tag_id)
    }
`;
