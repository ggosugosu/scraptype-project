import { black, grey_100, torea_bay, white } from 'common/colors';

export interface ItemColor {
  text: string;
  background: string;
  barcode: string;
}

export const charList = ['담', '삭', '영', '벗', '만', '리', '재', '굿', '비', '스', '트', '로'];

export const colorList: ItemColor[] = [
  { text: `${black}`, background: 'texas_rose', barcode: 'black' },
  { text: `${white}`, background: 'hot_pink', barcode: 'white' },
  { text: `${white}`, background: 'torea_bay', barcode: 'white' },
  { text: `${white}`, background: 'cerulean', barcode: 'white' },
  { text: `${torea_bay}`, background: 'java', barcode: 'torea_bay' },
  { text: `${torea_bay}`, background: 'turbo', barcode: 'torea_bay' },
];

export const defaultItemColor: ItemColor = {
  text: `${black}`,
  background: `grey_100`,
  barcode: 'black',
};
