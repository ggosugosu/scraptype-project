import { gql } from "@apollo/client";

export const GET_FONT_TAG_ALL = gql`
query {
    getFontTagAll {
    id
    font_id
    tag_id
    fonts {
      name
    }
    tags {
      name
    }
  }
}
`;

export const DELETE_FONT_TAG = gql`
  query($id: Int!) {
    deleteFontTag(id : $id) {
        id
        font_id
        tag_id
    }
  }
`;
