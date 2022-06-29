import React from 'react';
import AdminFont from './Font';

interface Props {
  type: Type;
}

export enum Type {
  Font,
  Tag,
}

export default function Admin({ type }: Props) {
    // TODO: Tag 컴포넌트 추가
  return <section>{type == Type.Font ? <AdminFont></AdminFont> : null}</section>;
}
