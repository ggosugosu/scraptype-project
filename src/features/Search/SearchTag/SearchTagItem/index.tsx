import React from "react";
import HighlightButton from "components/HighlightButton";
interface Props {
  name: String;
  selected: Boolean;
  onClick: () => void;
}

export default function SearchTagItem({ name, selected, onClick }: Props) {
  return <HighlightButton name={name} selected={selected} onClick={onClick} />;
}
