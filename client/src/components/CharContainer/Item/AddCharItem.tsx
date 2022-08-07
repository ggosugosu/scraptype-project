import AddSVG from 'assets/images/ic_add.svg';
import Image from 'next/image';
import { CharBox } from './style';
import EmptyArchiveSVG from 'assets/images/ic_empty_archive.svg';

interface Props {
  onClick: () => void;
}

export interface WebFont {
  source: string;
}

export default function AddCharItem({ onClick }: Props) {
  return (
    <CharBox onClick={onClick}>
      <Image alt="button-text" src={EmptyArchiveSVG} layout="fill" className={`filter_main}`} />
      <Image alt="button-add" src={AddSVG} width="36" height="36" className={`filter_main`} />
    </CharBox>
  );
}
