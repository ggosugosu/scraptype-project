export const getSvgUrl = function (svg: string): string {
  return `data:image/svg+xml;charset=utf8,${svg}`;
};

export const filterFontFamily = (fontFaceString: string) => {
  const regex: RegExp = /font-family:\s?[\"|\']([^\'|^\"]+)[\"|\']/;
  return (fontFaceString ? fontFaceString.toString().split(regex)[1] : '');
};

export const googleDriveLinkToSource = (link: string) => {
  const regex: RegExp = /file\/d\/?([^\/]+)/;
  return (link ? `https://drive.google.com/u/0/uc?id=${link.toString().split(regex)[1]}&export=view` : '');
};
