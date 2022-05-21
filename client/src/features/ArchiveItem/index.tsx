import styled, { withTheme } from "styled-components";
import React, { useEffect, useState } from "react";

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

const CharBox = styled.button<{ selectedColor: ItemColor }>`
  width: 200px;
  height: 200px;
  color: ${({ selectedColor }) => selectedColor.text || "gray"};
  background-color: ${({ selectedColor }) => selectedColor.background || "white"};
`;

export default function ArchiveItem() {
  // TODO: recoil 로 바꾸기
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(colorList[0]);

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);
    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);
  return <CharBox selectedColor={color}>{char}</CharBox>;
}
