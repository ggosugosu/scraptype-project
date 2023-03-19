import ArchiveSVG from 'assets/images/ic_archive.svg';
import ArchiveBarcodeSVG from 'assets/images/ic_archive_barcode.svg';
import { filterFontFamily } from 'features/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { charList, colorList, defaultItemColor, ItemColor } from 'components/CharContainer/Item/models';
import { CharBox } from 'components/CharContainer/Item/style';
import _ from 'lodash-es';

type Props = {
  font_id: number;
  is_web_font: boolean;
  name: string;
  description: string;
  corporation: string;
  webFont: WebFont;
  tags: string[];
  isArchive?: boolean;
  onClick: () => void;
};

type WebFont = {
  source: string;
};

export const CharItem = ({
                           font_id,
                           is_web_font,
                           name,
                           tags,
                           webFont,
                           isArchive = false,
                           onClick,
                         }: Props) => {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(
    isArchive ? colorList[0] : defaultItemColor
  );

  const [errorChar, setErrorChar] = useState<boolean>(false);

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);

    if (!isArchive) {
      return;
    }

    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);

  return (
    <>
      <CharBox
        selectedColor={color}
        fontFamily={webFont ? filterFontFamily(webFont.source) : ''}
        onClick={() => onClick()}
      >
        <Image
          alt="button-text"
          src={ArchiveSVG}
          layout="fill"
          className={`filter_${color.background}`}
        />
        {!errorChar && !is_web_font ? (
          <Image alt={'바코드'} className={`char-text filter_${color.barcode}`}
                 onError={() => {
                   setErrorChar(true);
                 }}
                 src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_unit.svg`} />) : (
          <span className="char-text">{errorChar ? '?' : char}</span>)}

        {isArchive ? (
          <Barcode color={color} isVisible={_.isEmpty(tags)} />
        ) : (
          <CharName name={name} />
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GenerateSVG = ({svgCode}: GenerateSVGProps) => {
  const buff = Buffer.from(svgCode);
  const base64data = buff.toString('base64');

  return <Image src={`data:image/svg+xml;base64,${base64data}`} alt="" />;
};

