import React from "react";
import Image from "next/image";
import styled from "styled-components";
import back from "../../assets/images/ic_back.svg";
import { main_light } from "../colors";

interface Props {
  title: String;
}

interface ItemProps {
  name: String;
  selected: Boolean;
}

const Title = styled.header`
  display: flex;
  flex: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  height: 48px;

  span {
    font-family: "Gothic-M";
    font-size: 32px;
  }
`;

const Item = styled.div<{ selected: Boolean }>`
  display: inline-block;
  height: 28px;
  font-size: 20px;
  box-shadow: ${({ selected }) => (selected ? `inset 0 -4px 0 ${main_light}` : ``)};
`;

function PageTitle(props: Props) {
  return (
    <Title>
      <Image src={back} alt="back" />
      <span>{props.title}</span>
    </Title>
  );
}

function TagSearchBox() {}

function TagSearchItem(props: ItemProps) {
  return <Item selected={props.selected}>{props.name}</Item>;
}

export default function SearchTag() {
  return (
    <>
      <PageTitle title="Search Tag" />
      <TagSearchItem name="테스트" selected={true} />
    </>
  );
}
