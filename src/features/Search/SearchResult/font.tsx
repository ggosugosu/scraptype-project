import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_FONTS_BY_CORP_AND_TEXT } from 'features/Search/SearchResult/gql';
import { ResultsWrapper, TextWrapper } from 'features/Search/SearchResult/style';
import SearchResultItem from 'features/Search/SearchResult/SearchResultItem';
import PageTitle from 'components/PageTitle';
import { useRouter } from 'next/router';
import InputText from 'components/InputText';

interface Props {
  corporation: string;
  text: string;
}

const FontContainer = ({corporation, text}: Props) => {
  return (
    <TextWrapper>
      <InputText value={text === '' ? '전체' : text} fixed={true} />
      <span>font for</span>
      <InputText value={corporation === '' ? '전체' : corporation} fixed={true} />
      <span>Corporation.</span>
    </TextWrapper>
  );
};

export default function FontResult({corporation, text}: Props) {
  const router = useRouter();
  const {loading, error, data} = useQuery(GET_FONTS_BY_CORP_AND_TEXT, {
    variables: {
      corporation: corporation,
      text: text
    }
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <PageTitle title={`(${data.getFontsByCorpAndText.length}) results for`} onClick={() => router.back()} />
      <section>
        <FontContainer corporation={corporation} text={text} />
        {data &&
          data.getFontsByCorpAndText.map((font, index) => (
            <SearchResultItem key={index} type={'image'} name={font.name} corporation={font.corporation}
                              description={font.description} />
          ))}
        <ResultsWrapper></ResultsWrapper>
      </section>
    </>
  );
}
