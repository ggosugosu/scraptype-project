import React, { ReactNode } from 'react';
import { PageTitleStyle } from 'components/PageTitle/style';
import Image from 'next/image';
import back from 'assets/images/ic_back.svg';

interface Props {
  title: String;
  endItem?: ReactNode;
  onClick: () => void;
}

export default function PageTitle({title, endItem, onClick}: Props) {
  return (
    <PageTitleStyle>
      <Image src={back} alt="back" onClick={onClick} />
      <span>{title}</span>
      {endItem}
    </PageTitleStyle>
  );
}
