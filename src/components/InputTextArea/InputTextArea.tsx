import React from 'react';
import { InputTextAreaStyle } from 'components/InputTextArea/style';

type Props = {
  id?: string;
  placeholder?: string;
  value: string | undefined;
  height?: string;
  onChange?: (e: any) => void;
};
export default function InputTextArea({id, placeholder, value, height, onChange}: Props) {
  return <InputTextAreaStyle id={id} placeholder={placeholder} value={value} height={height} onChange={onChange} />;
}
