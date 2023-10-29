import { flow, map } from 'lodash-es';

export const getSvgUrl = function (svg: string): string {
  return `data:image/svg+xml;charset=utf8,${svg}`;
};

export const filterFontFamily = (fontFaceString: string) => {
  const regex: RegExp = /font-family:\s?[\"|\']([^\'|^\"]+)[\"|\']/;
  return fontFaceString ? fontFaceString.toString().split(regex)[1] : '';
};

export const googleDriveLinkToSource = (link: string) => {
  const regex: RegExp = /file\/d\/?([^\/]+)/;
  return link
    ? `https://drive.google.com/u/0/uc?id=${
        link.toString().split(regex)[1]
      }&export=view`
    : '';
};

/**
 * @description json을 url query parameter 로 변경해주는 함수
 * @param json
 * @returns string
 */

export const toQueryParams = (json: Object) => {
  return map(
    Object.keys(json),
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
  ).join('&');
};
