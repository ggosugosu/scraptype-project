import styled, { withTheme } from "styled-components";
import React, { useEffect, useState } from "react";
import { getSvgUrl } from "features/utils";

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
  return `%3Csvg width='209' height='210' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M208.45 209.203H0V0h172.275l36.175 36.27v172.933Z' fill='${color}'/%3E%3C/svg%3E`;
};

const CharBox = styled.button<{ selectedColor: ItemColor }>`
  position: relative;
  width: 200px;
  height: 200px;
  color: ${({ selectedColor }) => selectedColor.text || "gray"};
  background-image: url("${({ selectedColor }) => getSvgUrl(charBoxSVG(selectedColor.background || "white"))}");
  font-family: "GmarketSansMedium", sans-serif;

  @media (max-width: 480px) {
    flex: 0 1 calc(50vw - 20px);
    height: calc(50vw - 20px);
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const cssStr: string = `@font-face {\n    font-family: 'GmarketSansMedium';\n    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');\n    font-weight: normal;\n    font-style: normal;\n}`;

const regex: RegExp = /font-family:\s?[\"|\']([^\'|^\"]+)[\"|\']/;
interface fontFaceProps {
  fontFace: string;
}
const InjectFontFace = ({ fontFace }: fontFaceProps) => {
  const style = React.createElement("style", null, fontFace);
  return style;
};

export default function ArchiveItem() {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(colorList[0]);
  console.log(cssStr.split(regex)[1]);
  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);
    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);
  return (
    <CharBox selectedColor={color}>
      <InjectFontFace fontFace={cssStr} />
      {char}
    </CharBox>
  );
}
