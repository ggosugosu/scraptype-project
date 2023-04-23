import { useQuery } from '@apollo/client';
import { styled } from '@stitches/react';
import { grey_400 } from 'common/colors';
import { stitchStyled } from 'common/globalStyle';
import { FontDetail_FontByFontId } from 'features/FontDetail/gql';
import Image from 'next/image';

type FontDetailProps = {
  font_id: string;
}
const FontDetail = ({font_id}: FontDetailProps) => {
  const {data} = useQuery(FontDetail_FontByFontId, {
    variables: {font_id: Number(font_id)}
  });

  const Section_ContentWrapper = styleContentWrapper({font_id});

  return (
    <Section_FontDetailWrapper>
      <Section_TitleWrapper>
        <Image src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_title.svg`}
               width={554}
               height={108}
               style={{objectFit: 'contain'}}
               alt={`${data?.getFontByFontId.name} 폰트의 타이틀`} />
        <Dl_TitleDescription>
          <dt>타이틀</dt>
          <dd>{data?.getFontByFontId.name}</dd>
        </Dl_TitleDescription>
      </Section_TitleWrapper>
      <Section_ContentWrapper
        aria-label={`${data?.getFontByFontId.name} 폰트의 콘텐츠`}>
      </Section_ContentWrapper>

    </Section_FontDetailWrapper>);
};

const Section_FontDetailWrapper = styled('section', {});

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

const styleContentWrapper = ({font_id,}: { font_id: string }) => stitchStyled('section', {
  position: 'relative',
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  aspectRatio: 844 / 1384,
  marginBottom: '72px',
  backgroundSize: 'cover',
  backgroundImage: `url(${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_detail_desktop.svg)`,

  '@mobile': {
    backgroundImage: `url(${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_detail_mobile.svg)`
  }
});

export default FontDetail;