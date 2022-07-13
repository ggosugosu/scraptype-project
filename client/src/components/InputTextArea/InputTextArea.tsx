import React from 'react';
import { InputTextAreaWrapper } from './style';

type Props = {
  id?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: any) => void;
};
export default function InputTextArea({ id, placeholder, value, onChange }) {
  return <InputTextAreaWrapper id={id} placeholder={placeholder} value={value} onChange={onChange} />;
}
