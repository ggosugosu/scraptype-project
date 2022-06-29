import logoBistro from 'assets/images/logo_bistro.svg';
import logo from 'assets/images/logo_no_icon.svg';
import { grey_200 } from 'common/colors';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import ArchiveItem, { WebFont } from './ArchiveItem';

import { useQuery } from '@apollo/client';
import { GET_FONT_ALL } from './gql';
import ArchiveItemModal from './modal';

const ArchiveWrapper = styled.div`
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  gap: 12px;
  width: auto;
  height: auto;
  padding-bottom: 16px;

  @media (max-width: 480px) {
    justify-content: center;
    gap: 8px;
    padding: 24px 0;
  }
`;

const LogoWrapper = styled.div`
  display: none;
  width: 100%;
  height: 188px;
  border-bottom: 4px dotted ${grey_200};

  @media (max-width: 480px) {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
`;

export default function Archive() {
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
      <LogoWrapper>
        <Image src={logo} alt="logo" />
        <Image src={logoBistro} alt="logo_bistro" width="72" height="42" />
      </LogoWrapper>
      <ArchiveWrapper>
        {data &&
          data.getFontAll.map((item, index) => (
            <ArchiveItem
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
              onClick={handleClicked}
            />
          ))}
        {data && modalIsVisible && <ArchiveItemModal font_id={selectedFontId ?? -1} handleVisible={handleVisible} />}
      </ArchiveWrapper>
    </>
  );
}
