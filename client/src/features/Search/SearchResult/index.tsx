import React from "react";
import TagResult from "./tag";
import FontResult from "./font";
interface Props {
  type: string;
  keywords: string;
}

export default function SearchResult({ type, keywords }: Props) {
  return <>{type === "tag" ? <TagResult keywords={keywords} /> : <FontResult keywords={keywords} />}</>;
}
