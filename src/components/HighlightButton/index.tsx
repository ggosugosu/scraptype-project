import React from 'react';
import { Item } from 'components/HighlightButton/style';

interface Props {
  name: String;
  selected: Boolean;
  onClick?: () => void;
  option?: HighlightButtonOption;
}

export interface HighlightButtonOption {
  textColor?: String;
  underline?: Boolean;
}

export default function HighlightButton({name, selected, onClick, option}: Props) {
  return (
    <Item selected={selected} fixed={!onClick} onClick={onClick} textColor={option?.textColor}
          underline={option?.underline}>
      {name}
    </Item>
  );
}
