import React, { ReactNode } from 'react';
import { FormStyle } from './style';

type Props = {
  children: ReactNode;
  onSubmit: (e?: any) => void;
};
export default function Form({ children, onSubmit }: Props) {
  return <FormStyle onSubmit={onSubmit}>{children}</FormStyle>;
}
