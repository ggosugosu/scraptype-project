import React, { ReactNode } from 'react';
import { InputFixedTextWrapper, InputTextWrapper } from './style';

interface Props {
    id?: string;
    fixed?: boolean;
    placeholder?: string;
    value: string;
    width?: string;
    height?: string
    type?: string;
    onChange?: (e: any) => void;
}

export default function InputText({id, fixed, placeholder, value, width, height, type, onChange}: Props) {
    return fixed ? (
        <InputFixedTextWrapper width={width} height={height}>{value}</InputFixedTextWrapper>
    ) : (
        <InputTextWrapper id={id} placeholder={placeholder} value={value} width={width} height={height} type={type}
                          onChange={onChange}/>
    );
}
