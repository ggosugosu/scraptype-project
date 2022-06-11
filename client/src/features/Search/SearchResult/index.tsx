import { useQuery } from "@apollo/client";
import React from "react";
import { GET_FONTS_BY_TAG_ID } from "./gql";

interface Props {
  keywords: string;
}

const toArray = (keywords: string) => keywords.split(",").map(Number);

export default function SearchResult(props: Props) {
  console.log(`array: ${toArray(props.keywords)}`);
  const { loading, error, data } = useQuery(GET_FONTS_BY_TAG_ID, { variables: { tag_ids: toArray(props.keywords) } });
  console.log(`${JSON.stringify(data)}`);

  if (data === null || loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(`${JSON.stringify(data.getFontsByTagId)}`);

  return (
    <>
      {data.getFontsByTagId.map((font, index) => 
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
