import React, { ReactNode } from 'react';
import { RadioStyle } from './style';

type Props = {
  children?: ReactNode;
};
export default function Radio({ children }: Props) {
  return <RadioStyle>{children}</RadioStyle>;
}
