import ArchiveSVG from "assets/images/ic_archive.svg";
import ArchiveBarcodeSVG from "assets/images/ic_archive_barcode.svg";
import InjectFontFace from "components/InjectFontFace";
import { filterFontFamily } from "features/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { charList, colorList, defaultItemColor, ItemColor } from "./models";
import { CharBox } from "./style";
import _ from "lodash-es";

interface Props {
  font_id: number;
  name: string;
  description: string;
  corporation: string;
  tags: string[];
  webFont: WebFont;
  isArchive?: boolean;
  onClick: (id: number) => void;
}

export interface WebFont {
  source: string;
}

export default function CharItem({
  font_id,
  name,
  description,
  corporation,
  tags,
  webFont,
  isArchive,
  onClick,
}: Props) {
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

  const Barcode = () => {
    <div className="barcode-wrapper">
      <Image
        alt="button-barcode"
        src={ArchiveBarcodeSVG}
        width="36"
        height="36"
        className={`filter_${color.barcode}`}
      />
    </div>;
  };

  const CharName = () => {
    <div className="char-name">{name}</div>;
  };
  return (
    <>
      <InjectFontFace fontFace={webFont ? webFont.source : ""} />
      <CharBox
        selectedColor={color}
        fontFamily={webFont ? filterFontFamily(webFont.source) : ""}
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
          !_.isEmpty(tags) && (
            <div className="barcode-wrapper">
              <Image
                alt="button-barcode"
                src={ArchiveBarcodeSVG}
                width="36"
                height="36"
                className={`filter_${color.barcode}`}
              />
            </div>
          )
        ) : (
          <div className="char-name">{name}</div>
        )}
      </CharBox>
    </>
  );
}
