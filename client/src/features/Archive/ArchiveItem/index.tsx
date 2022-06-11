import styled, { withTheme } from "styled-components";
import React, { useEffect, useState } from "react";
import { getSvgUrl } from "../../utils"

interface ItemColor {
  text: string;
  background: string;
}

const charList = ["가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하"];

const colorList: ItemColor[] = [
  { text: "white", background: "purple" },
  { text: "black", background: "yellow" },
  { text: "white", background: "red" },
  { text: "white", background: "blue" },
  { text: "black", background: "pink" },
];

const charBoxSVG = function (color: string) {
  return `%3Csvg width='209' height='210' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M208.45 209.203H0V0h172.275l36.175 36.27v172.933Z' fill='${color}'/%3E%3C/svg%3E`
}

const CharBox = styled.button<{ selectedColor: ItemColor }>`
position: relative;
  width: 200px;
  height: 200px;
  color: ${({ selectedColor }) => selectedColor.text || "gray"};
  background-image: url("${({ selectedColor }) => getSvgUrl(charBoxSVG(selectedColor.background || "white"))}");

  @media (max-width: 480px) {
    flex: 0 1 calc(50vw - 20px);
    height: calc(50vw - 20px);
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export default function ArchiveItem() {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(colorList[0]);

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);
    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);
  return <CharBox selectedColor={color}>{char}</CharBox>;
}
