import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import ArchiveItem from './ArchiveItem';
import { WebFont } from './ArchiveItem';
import logo from 'assets/images/logo_no_icon.svg';
import logoBistro from 'assets/images/logo_bistro.svg';
import { grey_200 } from 'common/colors';

import { GET_FONT_ALL, UPDATE_FONT_TAG } from './gql';
import { useMutation, useQuery } from '@apollo/client';
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
  const [updateFontTags, query] = useMutation(UPDATE_FONT_TAG);
  const [selectedFontId, setSelectedFontId] = useState<number>(0);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  if (loading || error) return null;

  const handleClicked = (font_id: number) => {
    setSelectedFontId(font_id);
    handleVisible();
    console.log(`modalIsVisible: ${modalIsVisible}`);
  };

  const handleVisible = (e?) => {
    e && e.stopPropagation();
    console.log(`${e?.target}, ${e?.currentTarget}`);
    (!e || e.target === e.currentTarget) && setModalIsVisible((props) => !props);
  };

  const handleUpdateFontTags = (tag_id: number) => {
    console.log(`tag: ${tag_id}`);
    updateFontTags({ variables: { font_id: selectedFontId, tag_id } });
  };

  if (query.data) console.log(query.data);

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
                  family: item.family,
                  source: item.source,
                })
              )}
              onClick={handleClicked}
            />
          ))}
        {modalIsVisible && <ArchiveItemModal font_id={selectedFontId} handleVisible={handleVisible} updateFontTags={handleUpdateFontTags} />}
      </ArchiveWrapper>
    </>
  );
}
