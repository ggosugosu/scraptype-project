import { useQuery } from '@apollo/client';
import { styled } from '@stitches/react';
import { grey_400 } from 'common/colors';
import { stitchStyled } from 'common/globalStyle';
import { FontDetail_FontByFontId } from 'features/FontDetail/gql';

type FontDetailProps = {
  font_id: string;
}
const FontDetail = ({font_id}: FontDetailProps) => {
  const {data} = useQuery(FontDetail_FontByFontId, {
    variables: {font_id: Number(font_id)}
  });


  return (
    <Section_FontDetailWrapper>
      <Section_TitleWrapper>
        <img src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_title.svg`}
             style={{objectFit: 'contain'}}
             alt={`${data?.getFontByFontId.name} 폰트의 타이틀`} />
        <Dl_TitleDescription>
          <dt>타이틀</dt>
          <dd>{data?.getFontByFontId.name}</dd>
        </Dl_TitleDescription>
      </Section_TitleWrapper>
      <Section_TagsWrapper>
        <Div_TagWrapper>
          <span>
            Tag
          </span>
          <span>
            태그 텍스트 1, 태그 텍스트 2
          </span>
        </Div_TagWrapper>
        <Div_TagWrapper>
          <span>
            Memo
          </span>
          <span>
            메모를 작성합니다.
          </span>
        </Div_TagWrapper>
      </Section_TagsWrapper>

      <Section_ContentWrapper>
        <Img_DesktopTablet src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_detail_desktop.svg`}
                           alt={`${data?.getFontByFontId.name} 폰트의 콘텐츠`} />
        <Img_Mobile src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_detail_mobile.svg`}
                    alt={`${data?.getFontByFontId.name} 폰트의 콘텐츠`} />
      </Section_ContentWrapper>
    </Section_FontDetailWrapper>);
};

const Section_FontDetailWrapper = styled('section', {
  width: '100%',
  maxWidth: '844px',
  margin: '0 auto'
});

const Section_TitleWrapper = styled('section', {
  position: 'relative',
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  padding: '70px 0'
});

const Dl_TitleDescription = styled('dl', {
  margin: 0,
  padding: 0,

  '& > dt': {
    width: 0,
    height: 0,
    opacity: 0
  },

  '& > dd': {
    margin: '20px 0 0 0 ',
    color: grey_400
  }
});

const Section_TagsWrapper = stitchStyled('section', {
  position: 'relative',
  width: '100%',
});

const Div_TagWrapper = stitchStyled('div', {
  display: 'grid',
  gridTemplateColumns: '62px 1fr',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '16px 12px',
  width: '100%',
  color: '$black',

  ':first-of-type': {
    display: 'flex',
    alignItems: 'center',
    height: '26px',
    lineHeight: 1.2,
    fontWeight: 600,
  },

  '& + &': {
    borderTop: '1px solid #E5E5E5'
  }
});

const Section_ContentWrapper = stitchStyled('section', {
  position: 'relative',
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  marginBottom: '72px',
  padding: '24px 16px',
});

const Img_DesktopTablet = stitchStyled('img', {
  maxWidth: '100%',
  height: 'auto',
  '@mobile': {
    display: 'none'
  }
});

const Img_Mobile = stitchStyled('img', {
  display: 'none',
  maxWidth: '100%',
  height: 'auto',
  '@mobile': {
    display: 'block'
  }
});

export default FontDetail;