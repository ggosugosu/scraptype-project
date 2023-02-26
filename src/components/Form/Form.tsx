import React, { ReactNode } from 'react';
import { FormStyle } from 'components/Form/style';

type Props = {
  children: ReactNode;
  isGrey?: boolean;
  onSubmit: (e?: any) => void;
};
export default function Form({children, isGrey, onSubmit}: Props) {
  return (
    <FormStyle isGrey={isGrey} onSubmit={onSubmit}>
      {children}
    </FormStyle>
  );
}
