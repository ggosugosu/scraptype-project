import React from 'react';
import Image from 'next/image';
import ResultSVG from 'assets/images/ic_result_box.svg';
import { Item, ItemContent, ItemTitle } from 'features/Search/SearchResult/SearchResultItem/style';

interface Props {
  type: String;
  name: String;
  corporation: String;
  description: String;
}

export default function SearchResultItem({name, corporation, description}: Props) {
  return (
    <Item>
      <Image alt={'background'} src={ResultSVG} className="background" />
      <div className="item-wrapper">
        <ItemTitle>
          <h1>{name}</h1>
          <span>{corporation}</span>
        </ItemTitle>
        <ItemContent>
          <p>
            {description ? description : 'no memo'}
          </p>
        </ItemContent>

      </div>
    </Item>
  );
}
