import React from "react";
import { Item } from "./style";

interface Props {
  name: String;
  selected: Boolean;
  onClick?: () => void;
}

export default function HighlightButton({ name, selected, onClick }: Props) {
  return (
    <Item selected={selected} fixed={!onClick} onClick={onClick}>
      {name}
    </Item>
  );
}
