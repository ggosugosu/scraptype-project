import React from "react";
import Image from "next/image";
import ResultSVG from "assets/images/ic_result_box.svg";
import { Item, ItemContent, ItemTitle } from "./style";


interface Props {
  type: String;
  name: String;
  corporation: String;
  description: String;
}

export default function SearchResultItem({ type, name, corporation, description }: Props) {
  return (
    <Item>
      <Image alt={"background"} src={ResultSVG} className="background" />
      <div className="item-wrapper">
        <ItemTitle>
          <h1>{name}</h1>
          <span>{corporation}</span>
        </ItemTitle>
        <ItemContent>
        <p>
          가독성이 조금이라도 중요한 곳에선 못쓰겠지만 감성이 정말 독특하고 눈에 띈다. 특히 배너 디자인 썸네일 가독성이 조금이라도 중요한 곳에선 못쓰겠지만
          감성이 정말 독특하고 눈에 띈다. 특히 배너 디자인 썸네일 가독성이 조금이라도 중요한 곳에선 못쓰겠지만 감성이 정말 독특하고 눈에 띈다. 특히 배너 디자인 썸네일 가독성이 조금이라도 중요한 곳에선 못쓰겠지만
          감성이 정말 독특하고 눈에 띈다. 특히 배너 디자인 썸네일
        </p>
        </ItemContent>
        
      </div>
    </Item>
  );
}
