import { charList, colorList, defaultItemColor, ItemColor } from 'components/CharContainer/Item/models';
import { useEffect, useState } from 'react';

type CharColorProps = {
  isArchive: boolean;
}
type CharColor = {
  char: string;
  charColor: ItemColor;

}
const useCharColor = ({isArchive}: CharColorProps): CharColor => {
  const [char, setChar] = useState<string>(charList[0]);
  const [color, setColor] = useState<ItemColor>(
    isArchive ? colorList[0] : defaultItemColor
  );
  console.log('useCharColor', `${char}, ${color}`);

  useEffect(() => {
    setChar(charList[Math.floor(Math.random() * charList.length)]);

    if (!isArchive) {
      return;
    }

    setColor(colorList[Math.floor(Math.random() * colorList.length)]);
  }, []);

  return {char, charColor: color};
};

export default useCharColor;