import { gql } from '@apollo/client';

export const CREATE_TAG = gql`
    mutation CreateTag (
        $name: String
    ) {
        createTag(
            name: $name
        ){
            id
            name
        }
    }
`;
