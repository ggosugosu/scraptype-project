import { gql } from '@apollo/client';

export const FontDetail_FontByFontId = gql`
    query FontDetail_FontByFontId($font_id: Int) {
        getFontByFontId(font_id: $font_id) {
            id
            name
            description
            corporation
            is_web_font
            webFont {
                source
            }
            imageFont {
                title
                unit
                detail_mobile
                detail_pc
            }
        }
    }
`;