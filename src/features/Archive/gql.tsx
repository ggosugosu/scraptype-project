import { gql } from '@apollo/client';

export const Archive_FontAll = gql`
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
            imageFont {
                id
                unit
            }
        }
    }
`;

export const Archive_FontByFontId = gql`
    query GetFontByFontId($font_id: Int) {
        getFontByFontId(font_id: $font_id) {
            id
            name
            fontTags {
                tags {
                    id
                    name
                }
            }
        }
        getTagAll {
            id
            name
        }
    }
`;

export const Archive_UpdateFontTag = gql`
    mutation UpdateFontTag($font_id: Int, $tag_id: Int) {
        updateFontTag(font_id: $font_id, tag_id: $tag_id)
    }
`;
