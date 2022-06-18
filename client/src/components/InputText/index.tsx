import React from "react";
import { InputFixedTextWrapper, InputTextWrapper } from "./style";

interface Props {
  fixed?: boolean;
  placeholder?: string;
  value: string;
  onChange?: (e: any) => void;
}

export default function InputText({ fixed, placeholder, value, onChange }: Props) {
  return fixed ? <InputFixedTextWrapper>{value}</InputFixedTextWrapper> : <InputTextWrapper placeholder={placeholder} value={value} onChange={onChange} />;
}
