import React, { ReactNode } from 'react';
import { CharContainerStyle } from './style';

type Props = {
  children?: ReactNode;
};
export default function CharContainer({ children }: Props) {
  return <CharContainerStyle>{children}</CharContainerStyle>;
}
