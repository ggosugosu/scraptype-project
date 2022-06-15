import React from "react";
import HighlightedButton from "components/HighlightedButton";
interface Props {
  name: String;
  selected: Boolean;
  onClick: () => void;
}

export default function SearchTagItem({ name, selected, onClick }: Props) {
  return <HighlightedButton name={name} selected={selected} onClick={onClick} />;
}
