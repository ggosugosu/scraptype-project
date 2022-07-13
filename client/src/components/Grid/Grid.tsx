import React, { ReactNode } from 'react';
import { GridStyle } from './style';

type Props = {
  template?: string;
  gap?: string;
  children: ReactNode;
};

export default function Grid({ template, gap, children }: Props) {
  return (
    <GridStyle template={template} gap={gap}>
      {children}
    </GridStyle>
  );
}
