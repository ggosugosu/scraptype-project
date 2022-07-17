import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { filterFontFamily, getSvgUrl } from 'features/utils';
import InjectFontFace from 'components/InjectFontFace';
import ArchiveSVG from 'assets/images/ic_archive.svg';
import ArchiveBarcodeSVG from 'assets/images/ic_archive_barcode.svg';
import { charList, colorList, defaultItemColor, ItemColor } from './models';
import { CharBox } from './style';
import { black, grey_100 } from 'common/colors';
interface Props {
  font_id: number;
  name: string;
  description: string;
  corporation: string;
  tags: string[];
  webFonts: WebFont[];
  isArchive?: boolean;
  onClick: (id: number) => void;
}

export interface WebFont {
  source: string;
}

export default function CharItem({ font_id, name, description, corporation, tags, webFonts, isArchive, onClick }: Props) {
  const [char, setChar] = useState<String>(charList[0]);
  const [color, setColor] = useState<ItemColor>(isArchive ? colorList[0] : defaultItemColor);

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);

    if (!isArchive) return;
    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);
  return (
    <>
      <InjectFontFace fontFace={webFonts.length !== 0 ? webFonts[0].source : ''} />
      <CharBox selectedColor={color} fontFamily={webFonts.length !== 0 ? filterFontFamily(webFonts[0].source) : ''} onClick={() => onClick(font_id)}>
        <Image alt="button-text" src={ArchiveSVG} layout="fill" className={`filter_${color.background}`} />
        <span>{char}</span>
        {isArchive ? (
          <div className="barcode_wrapper">
            <Image alt="button-barcode" src={ArchiveBarcodeSVG} width="36" height="36" className={`filter_${color.barcode}`} />
          </div>
        ) : <div>{name}</div>}
      </CharBox>
    </>
  );
}
