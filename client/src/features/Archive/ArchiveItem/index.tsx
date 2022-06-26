import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { filterFontFamily, getSvgUrl } from 'features/utils';
import InjectFontFace from 'components/InjectFontFace';
import ArchiveSVG from 'assets/images/ic_archive.svg';
import ArchiveBarcodeSVG from 'assets/images/ic_archive_barcode.svg';
import { charList, colorList, ItemColor } from './models';
import { CharBox } from './style';
interface Props {
  id: number;
  name: string;
  description: string;
  corporation: string;
  tags: string[];
  webFonts: WebFont[];
  onClick: (id: Number) => void;
}

export interface WebFont {
  family: string;
  source: string;
}

export default function ArchiveItem({ id, name, description, corporation, tags, webFonts, onClick }: Props) {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(colorList[0]);
  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);
    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);
  return (
    <>
      <InjectFontFace fontFace={webFonts.length !== 0 ? webFonts[0].source : ''} />
      <CharBox selectedColor={color} fontFamily={webFonts.length !== 0 ? filterFontFamily(webFonts[0].source) : ''} onClick={() => onClick(id)}>
        <Image alt="button-text" src={ArchiveSVG} layout="fill" className={`filter_${color.background}`} />
        <span>{char}</span>
        <div className="barcode_wrapper">
          <Image alt="button-barcode" src={ArchiveBarcodeSVG} width="36" height="36" className={`filter_${color.barcode}`} />
        </div>
      </CharBox>
    </>
  );
}
