import styled, { withTheme } from "styled-components";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { filterFontFamily, getSvgUrl } from "features/utils";
import InjectFontFace from "components/InjectFontFace";
import ArchiveSVG from "assets/images/ic_archive.svg";
import { black, cerulean, hot_pink, java, texas_rose, torea_bay, turbo, white } from "common/colors";
import { StringDecoder } from "string_decoder";

interface ItemColor {
  text: string;
  background: string;
}

interface Props {
  id: number;
  name: string;
  description: string;
  corporation: string;
  tags: string[];
  webFonts: WebFont[];
}

export interface WebFont {
  family: string;
  source: string;
}

const charList = ["담", "삭", "영", "벗", "만", "리", "재", "굿", "비", "스", "트", "로"];

const colorList: ItemColor[] = [
  { text: `${black}`, background: "texas_rose" },
  { text: `${white}`, background: "hot_pink" },
  { text: `${white}`, background: "torea_bay" },
  { text: `${white}`, background: "cerulean" },
  { text: `${torea_bay}`, background: "java" },
  { text: `${torea_bay}`, background: "turbo" },
];

const CharBox = styled.button<{ selectedColor: ItemColor; fontFamily: string }>`
  position: relative;
  width: 168px;
  height: 168px;
  span {
    position: relative;
    top: 0;
    left: 0;
    font-family: ${({ fontFamily }) => fontFamily}, sans-serif;
    font-size: 100px;
    line-height: 90px;
    color: ${({ selectedColor }) => selectedColor.text || "gray"};
  }

  @media (max-width: 480px) {
    flex: 0 1 calc(50vw - 20px);
    height: calc(50vw - 20px);
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export default function ArchiveItem({ id, name, description, corporation, tags, webFonts }: Props) {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(colorList[0]);

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);
    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);
  return (
    <>
      <InjectFontFace fontFace={webFonts.length !== 0 ? webFonts[0].source : ""} />
      <CharBox selectedColor={color} fontFamily={webFonts.length !== 0 ? filterFontFamily(webFonts[0].source) : ""}>
        <Image alt="button-text" src={ArchiveSVG} layout="fill" className={`filter_${color.background}`} />
        <span>{char}</span>
      </CharBox>
    </>
  );
}
