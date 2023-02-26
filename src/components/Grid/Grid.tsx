import React, { ReactNode } from 'react';
import { GridStyle } from 'components/Grid/style';

type Props = {
  template?: string;
  gap?: string;
  padding?: string;
  children: ReactNode;
};

export default function Grid({template, gap, padding, children}: Props) {
  return (
    <GridStyle template={template} gap={gap} padding={padding}>
      {children}
    </GridStyle>
  );
}
