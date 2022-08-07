import React, { ReactNode } from 'react';
import { InputFixedTextWrapper, InputTextWrapper } from './style';

interface Props {
  id?: string;
  fixed?: boolean;
  placeholder?: string;
  value: string;
  width?: string;
  type?: string;
  onChange?: (e: any) => void;
}

export default function InputText({ id, fixed, placeholder, value, width, type, onChange }: Props) {
  return fixed ? (
    <InputFixedTextWrapper width={width ?? null}>{value}</InputFixedTextWrapper>
  ) : (
     <InputTextWrapper id={id} placeholder={placeholder} value={value} width={width} type={type} onChange={onChange} />
  );
}
