import { gql } from "@apollo/client";

export const CREATE_FONT_TAG = gql`
  query(font_id, tag_id) {
    deleteFontTag(font_id, tag_id) {
        id
        font_id
        tag_id
    }
  }
`;