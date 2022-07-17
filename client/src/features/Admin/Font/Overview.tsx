import CharContainer from 'components/CharContainer/CharContainer';
import  { WebFont } from 'components/CharContainer/Item';
import ArchiveItemModal from 'features/Archive/modal';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FONT_ALL } from './gql';
import CharItem from 'components/CharContainer/Item/CharItem';
import AddCharItem from 'components/CharContainer/Item/AddCharItem';

export default function Overview() {
  const { loading, error, data } = useQuery(GET_FONT_ALL);
  const [selectedFontId, setSelectedFontId] = useState<number>();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  if (loading || error) {
    console.log(`${error?.message}`);
    return null;
  }

  const handleClicked = (font_id: number) => {
    setSelectedFontId(font_id);
    handleVisible();
    console.log(`modalIsVisible: ${modalIsVisible}`);
  };

  const handleVisible = (e?) => {
    e && e.stopPropagation();
    (!e || e.target === e.currentTarget) && setModalIsVisible((props) => !props);
  };

  return (
    <>
      <CharContainer>
        <AddCharItem onClick={() => {}} />
        {data &&
          data.getFontAll.map((item, index) => (
            <CharItem
              key={index}
              font_id={item.id}
              name={item.name}
              description={item.description}
              corporation={item.corporation}
              tags={item.fontTags.tags}
              webFonts={item.webFonts.map(
                (item): WebFont => ({
                  source: item.source,
                })
              )}
              isArchive={false}
              onClick={handleClicked}
            />
          ))}
        {data && modalIsVisible && <ArchiveItemModal font_id={selectedFontId ?? -1} handleVisible={handleVisible} />}
      </CharContainer>
    </>
  );
}
