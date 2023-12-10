import logoBistro from 'assets/images/logo_bistro.svg';
import logo from 'assets/images/logo_no_icon.svg';
import Image from 'next/image';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import CharContainer from 'components/CharContainer/CharContainer';
import { CharItem } from 'components/CharContainer/Item/CharItem';
import { Archive_FontAll } from 'features/Archive/gql';
import ArchiveItemModal from 'features/Archive/modal';
import { LogoWrapper } from 'features/Archive/style';

export default function Archive() {
  const { loading, error, data } = useQuery(Archive_FontAll);
  const [selectedFontId, setSelectedFontId] = useState<{
    font_id: number;
    is_web_font: boolean;
  }>();
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  if (loading || error) {
    return null;
  }

  const handleClicked = ({
    font_id,
    is_web_font,
  }: {
    font_id: number;
    is_web_font: boolean;
  }) => {
    setSelectedFontId({ font_id, is_web_font });
    handleVisible();
  };

  const handleVisible = (e?) => {
    e && e.stopPropagation();
    (!e || e.target === e.currentTarget) &&
      setModalIsVisible((props) => !props);
  };

  return (
    <>
      <LogoWrapper>
        <Image src={logo} alt="logo" />
        <Image src={logoBistro} alt="logo_bistro" width="72" height="42" />
      </LogoWrapper>
      <CharContainer>
        {data &&
          data.getFontAll.map((item, index) => {
            return (
              <CharItem
                key={index}
                font_id={item.id}
                is_web_font={item.is_web_font}
                name={item.name}
                description={item.description}
                corporation={item.corporation}
                tags={item.fontTags}
                isArchive={true}
                onClick={() =>
                  handleClicked({
                    font_id: item.id,
                    is_web_font: item.is_web_font,
                  })
                }
                webFont={{
                  source: item.webFont ?? '',
                }}
              />
            );
          })}
        {data && modalIsVisible && (
          <ArchiveItemModal
            font_id={selectedFontId?.font_id ?? -1}
            is_web_font={selectedFontId?.is_web_font ?? true}
            handleVisible={handleVisible}
          />
        )}
      </CharContainer>
    </>
  );
}
