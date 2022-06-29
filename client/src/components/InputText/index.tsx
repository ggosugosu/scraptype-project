import React from 'react';
import { InputFixedTextWrapper, InputTextWrapper } from './style';

interface Props {
  fixed?: boolean;
  placeholder?: string;
  value: string;
  width?: string;
  onChange?: (e: any) => void;
}

export default function InputText({ fixed, placeholder, value, width, onChange }: Props) {
  return fixed ? (
    <InputFixedTextWrapper width={width}>{value}</InputFixedTextWrapper>
  ) : (
    <InputTextWrapper placeholder={placeholder} value={value} width={width} onChange={onChange} />
  );
}
