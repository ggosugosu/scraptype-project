import React from "react";

interface fontFaceProps {
  fontFace: string;
}

export default function InjectFontFace({ fontFace }: fontFaceProps) {
  const style = React.createElement("style", null, fontFace);
  return style;
}
