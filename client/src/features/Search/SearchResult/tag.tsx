import { useQuery } from "@apollo/client";
import React from "react";
import { GET_FONTS_BY_TAG_ID, GET_TAGS_BY_TAG_ID } from "./gql";
import { TagsWrapper, ResultsWrapper } from "./style";
import HighlightButton from "components/HighlightButton";
import SearchResultItem from "./SearchResultItem";
import PageTitle from "components/PageTitle";
import { useRouter } from "next/router";

interface Props {
  keywords?: string;
}

const toArray = (keywords: string) => keywords.split(",").map(Number);

const TagContainer = ({ keywords }: Props) => {
  const { loading, error, data } = useQuery(GET_TAGS_BY_TAG_ID, { variables: { tag_ids: toArray(keywords) } });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return <TagsWrapper>{data && data.getTagsByTagId.map((tag) => <HighlightButton key={tag.id} name={tag.name} selected={true} />)}</TagsWrapper>;
};

export default function TagResult({ keywords }: Props) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_FONTS_BY_TAG_ID, { variables: { tag_ids: toArray(keywords) } });

  if (!router.isReady || loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <PageTitle title={`(${data.getFontsByTagId.length}) results for`} onClick={() => router.back()} />
      <section>
        <TagContainer keywords={keywords} />
        {data &&
          data.getFontsByTagId.map((font, index) => (
            <SearchResultItem key={index} type={"image"} name={font.name} corporation={font.corporation} description={font.description} />
          ))}
        <ResultsWrapper></ResultsWrapper>
      </section>
    </>
  );
}
