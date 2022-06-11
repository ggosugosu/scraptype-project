import React from "react";
import styled from "styled-components";
import { main_light } from "../../../../common/colors";
interface Props {
  name: String;
  selected: Boolean;
  onClick: () => void;
}

const Item = styled.button<{ selected: Boolean }>`
  display: inline-block;
  height: 28px;
  margin: 6px 8px;
  font-size: 20px;
  box-shadow: ${({ selected }) => (selected ? `inset 0 -4px 0 ${main_light}` : ``)};
`;

export default function SearchTagItem(props: Props) {
  return (
    <Item selected={props.selected} onClick={props.onClick}>
      {props.name}
    </Item>
  );
}
