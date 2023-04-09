import { useQuery } from '@apollo/client';
import { styled } from '@stitches/react';
import { grey_400 } from 'common/colors';
import { FontDetail_FontByFontId } from 'features/FontDetail/gql';
import Image from 'next/image';

type FontDetailProps = {
  font_id: string;
}
const FontDetail = ({font_id}: FontDetailProps) => {
  const {data} = useQuery(FontDetail_FontByFontId, {
    variables: {font_id: Number(font_id)}
  });

  return (
    <section>
      <Section_TitleWrapper>
        <Image src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_title.jpeg`}
               width={554}
               height={108}
               style={{objectFit: 'contain'}}
               alt={`${data?.getFontByFontId.name} 폰트의 타이틀`} />
        <Dl_TitleDescription>
          <dt>타이틀</dt>
          <dd>{data?.getFontByFontId.name}</dd>
        </Dl_TitleDescription>
      </Section_TitleWrapper>
      <Section_ContentWrapper>
        <Image src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_detail_desktop.jpeg`}
               width={700}
               height={1200}
               style={{objectFit: 'contain'}}
               alt={`${data?.getFontByFontId.name} 폰트의 콘텐츠`} />
      </Section_ContentWrapper>

    </section>);
};

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
    marginTop: '20px',
    color: grey_400
  }
});

const Section_ContentWrapper = styled('section', {
  position: 'relative',
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
});

export default FontDetail;