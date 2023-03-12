import ArchiveSVG from 'assets/images/ic_archive.svg';
import ArchiveBarcodeSVG from 'assets/images/ic_archive_barcode.svg';
import InjectFontFace from 'components/InjectFontFace';
import { filterFontFamily } from 'features/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { charList, colorList, defaultItemColor, ItemColor } from 'components/CharContainer/Item/models';
import { CharBox } from 'components/CharContainer/Item/style';
import _ from 'lodash-es';

type Props = {
  font_id: number;
  name: string;
  description: string;
  corporation: string;
  tags: string[];
  isArchive?: boolean;
  onClick: (id: number) => void;
};

type WebFont = {
  source: string;
};

type ImageFont = {
  id: number;
  unit: string;
};

type WebFontCharBoxProps = Props & {
  webFont?: WebFont;
};

export const WebFontCharBox = ({
                                 font_id,
                                 name,
                                 tags,
                                 webFont,
                                 isArchive = false,
                                 onClick,
                               }: WebFontCharBoxProps) => {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(
    isArchive ? colorList[0] : defaultItemColor
  );

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);

    if (!isArchive) {
      return;
    }

    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);

  return (
    <>
      <InjectFontFace fontFace={webFont?.source ?? ''}/>
      <CharBox
        selectedColor={color}
        fontFamily={webFont ? filterFontFamily(webFont.source) : ''}
        onClick={() => onClick(font_id)}
      >
        <Image
          alt="button-text"
          src={ArchiveSVG}
          layout="fill"
          className={`filter_${color.background}`}
        />
        <span className="char-text">{char}</span>
        {isArchive ? (
          <Barcode color={color} isVisible={!_.isEmpty(tags)}/>
        ) : (
          <CharName name={name}/>
        )}
      </CharBox>
    </>
  );
};

export const ImageFontCharBox = ({
                                   font_id,
                                   name,
                                   tags,
                                   isArchive = false,
                                   onClick,
                                 }: Props) => {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(
    isArchive ? colorList[0] : defaultItemColor
  );

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);

    if (!isArchive) {
      return;
    }

    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);

  return (
    <>
      <CharBox selectedColor={color} onClick={() => onClick(font_id)}>
        <Image
          alt="button-text"
          src={ArchiveSVG}
          layout="fill"
          className={`filter_${color.background}`}
        />
        <img className={`char-text  filter_${color.background}`}
             src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_unit.svg`}/>
        {isArchive ? (
          <Barcode color={color} isVisible={_.isEmpty(tags)}/>
        ) : (
          <CharName name={name}/>
        )}
      </CharBox>
    </>
  );
};

type BarcodeProps = {
  color: ItemColor;
  isVisible: boolean;
};

const Barcode = ({color, isVisible}: BarcodeProps) => {
  if (!isVisible) {
    return <></>;
  }

  return (
    <div className="barcode-wrapper">
      <Image
        alt="button-barcode"
        src={ArchiveBarcodeSVG}
        width="36"
        height="36"
        className={`filter_${color.barcode}`}
      />
    </div>
  );
};

type CharNameProps = {
  name: string;
};

const CharName = ({name}: CharNameProps) => {
  return <div className="char-name">{name}</div>;
};

type GenerateSVGProps = {
  svgCode: string;
};
const GenerateSVG = ({svgCode}: GenerateSVGProps) => {
  const buff = Buffer.from(svgCode);
  const base64data = buff.toString('base64');

  return <img src={`data:image/svg+xml;base64,${base64data}`} alt=""/>;
};

// TODO: 삭제해야하는 SVG
const SampleSvg = () => {
  return (
    <svg
      width="108"
      height="115"
      viewBox="0 0 108 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M107.607 9.67999C107.607 4.30399 104.407 0.719994 99.543 0.719994H82.135C77.271 0.719994 74.071 4.30399 74.071 9.67999V105.424C74.071 110.8 77.271 114.384 82.135 114.384H99.543C104.407 114.384 107.607 110.8 107.607 105.424V9.67999ZM70.231 9.67999C70.231 4.30399 67.031 0.719994 62.167 0.719994H45.271C40.407 0.719994 37.207 4.30399 37.207 9.67999V28.752H33.367V9.67999C33.367 4.30399 30.167 0.719994 25.303 0.719994H8.407C3.543 0.719994 0.343 4.30399 0.343 9.67999V105.424C0.343 110.8 3.543 114.384 8.407 114.384H62.167C67.031 114.384 70.231 110.8 70.231 105.424V9.67999ZM33.367 84.688C34.647 75.216 34.647 66.64 33.367 57.168H37.207C38.359 66.64 38.359 75.216 37.207 84.688H33.367Z"
        fill="#313338"
      />
    </svg>
  );
};
