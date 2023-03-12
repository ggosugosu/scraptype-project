import { gql } from '@apollo/client';

// TODO: fragment 로 변경
export const GET_FONT_ALL = gql`
    query {
        getFontAll {
            id
            name
            description
            corporation
            is_web_font
            fontTags {
                tags {
                    name
                }
            }
            webFont {
                source
            }
        }
    }
`;
