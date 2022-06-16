export const getSvgUrl = function (svg: string): string {
  return `data:image/svg+xml;charset=utf8,${svg}`;
};

export const filterFontFamily = (fontFaceString: string) => {
  const regex: RegExp = /font-family:\s?[\"|\']([^\'|^\"]+)[\"|\']/;
  return fontFaceString.split(regex)[1]
} 
