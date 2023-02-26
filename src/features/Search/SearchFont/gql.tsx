import { gql } from "@apollo/client";

export const GET_CORPORATION_ALL = gql`
  query {
    getCorporationAll {
      corporation
    }
  }
`;
