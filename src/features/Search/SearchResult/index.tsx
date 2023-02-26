import React from "react";
import TagResult from "features/Search/SearchResult/tag";
import FontResult from "features/Search/SearchResult/font";

interface Props {
  type: string;
  keywords?: string | Font;
}

interface Font {
  corporation: string;
  text: string;
}

export default function SearchResult({type, keywords}: Props) {

  return <>{type === "tag" ? <TagResult keywords={keywords?.toString()}/> :
    <FontResult corporation={(keywords as Font).corporation} text={(keywords as Font).text}/>}</>;
}
