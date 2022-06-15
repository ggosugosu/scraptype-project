import React from "react";
import { Title } from "./style";
import Image from "next/image";
import back from "assets/images/ic_back.svg";

interface Props {
  title: String;
  onClick: () => void;
}

export default function PageTitle({ title, onClick }: Props) {
  return (
    <Title>
      <Image src={back} alt="back" onClick={onClick} />
      <span>{title}</span>
    </Title>
  );
}
