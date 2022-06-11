import { useQuery } from "@apollo/client";
import React from "react";
import { GET_FONTS_BY_TAG_ID, GET_TAGS_BY_TAG_ID } from "./gql";

interface Props {
  keywords: string;
}

const toArray = (keywords: string) => keywords.split(",").map(Number);

export default function SearchResult(props: Props) {
  const { loading, error, data } = useQuery(GET_FONTS_BY_TAG_ID, { variables: { tag_ids: toArray(props.keywords) } });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
    <TagContainer keywords={props.keywords} />
      {data && data.getFontsByTagId.map((font, index) => 
        (
          <div key={index}>
            {font.name}
            {font.description}
            {font.corporation}
          </div>
        )
      )}
    </>
  );
}

const TagContainer = (props: Props) => {
  const { loading, error, data } = useQuery(GET_TAGS_BY_TAG_ID, { variables: { tag_ids: toArray(props.keywords) } });
  
  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {data && data.getTagsByTagId.map((tag) => 
        (
          <div key={tag.id}>
            {tag.name}
          </div>
        )
      )}
    </>
  );
}
