import { useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import { GET_FONTS_BY_TAG_ID, GET_TAGS_BY_TAG_ID } from "./gql";
import styled from "styled-components";
import SearchResultItem from "./SearchResultItem";
import PageTitle from "components/PageTitle";
import HighlightButton from "components/HighlightButton";

interface Props {
  keywords: string;
}

const TagsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  width: 100%;
  height: 90px;
`;

const ResultsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  width: 100%;
  height: auto;
  overflow: auto;
`;

const toArray = (keywords: string) => keywords.split(",").map(Number);

export default function SearchResult(props: Props) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_FONTS_BY_TAG_ID, { variables: { tag_ids: toArray(props.keywords) } });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <PageTitle title={`(${data.getFontsByTagId.length}) results for`} onClick={() => router.back()} />
      <TagContainer keywords={props.keywords} />
      {data &&
        data.getFontsByTagId.map((font, index) => (
          <SearchResultItem key={index} type={"image"} name={font.name} corporation={font.corporation} description={font.description} />
        ))}
      <ResultsWrapper></ResultsWrapper>
    </>
  );
}

const TagContainer = (props: Props) => {
  const { loading, error, data } = useQuery(GET_TAGS_BY_TAG_ID, { variables: { tag_ids: toArray(props.keywords) } });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return <TagsWrapper>{data && data.getTagsByTagId.map((tag) => <HighlightButton key={tag.id} name={tag.name} selected={true} />)}</TagsWrapper>;
};
