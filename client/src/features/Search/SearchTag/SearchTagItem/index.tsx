import React from "react";
import {Item} from "./styled"
interface Props {
  name: String;
  selected: Boolean;
  onClick: () => void;
}

export default function SearchTagItem(props: Props) {
  return (
    <Item selected={props.selected} onClick={props.onClick}>
      {props.name}
    </Item>
  );
}
