import { useQuery } from "@apollo/client";
import React from "react";
import { GET_FONTS_BY_TEXT } from "./gql";
import { ResultsWrapper } from "./style";
import SearchResultItem from "./SearchResultItem";
import PageTitle from "components/PageTitle";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
  keywords: string;
}

const TextWrapper = styled.div``;

const TagContainer = ({ keywords }: Props) => {
  return <TextWrapper>{keywords}</TextWrapper>;
};

export default function FontResult({ keywords }: Props) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_FONTS_BY_TEXT, { variables: { text: keywords } });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <PageTitle title={`(${data.getFontsByText.length}) results for`} onClick={() => router.back()} />
      <section>
        <TagContainer keywords={keywords} />
        {data &&
          data.getFontsByText.map((font, index) => (
            <SearchResultItem key={index} type={"image"} name={font.name} corporation={font.corporation} description={font.description} />
          ))}
        <ResultsWrapper></ResultsWrapper>
      </section>
    </>
  );
}
