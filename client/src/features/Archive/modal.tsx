import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import ModalSVG from 'assets/images/modal_archive.svg';
import CloseSVG from 'assets/images/ic_close.svg';
import HighlightButton, { HighlightButtonOption } from 'components/HighlightButton';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FONT_BY_FONT_ID, UPDATE_FONT_TAG } from './gql';
import { main } from 'common/colors';
import { googleDriveLinkToSource } from 'features/utils';

interface Props {
  font_id: number;
  handleVisible: () => void;
}

interface ItemProps {
  name: string;
  selected: boolean;
  onClick: (tag_id?: number) => void;
  option?: HighlightButtonOption;
}

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 446px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 446px);
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const ModalWrapper = styled.div`
  position: relative;
  width: 396px;
  height: 598px;
`;
export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 396px;
  height: 598px;

`;

const ContainerTagsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 354px;
  height: 328px;
  padding: 4px;
  overflow: auto;
`;

interface Tag {
  id: number;
  name: string;
}
const ModalItem = ({ name, selected, onClick, option }: ItemProps) => {
  const [_selected, _setSelected] = useState<boolean>(selected);
  const handleSelected = () => {
    _setSelected(!selected);
    onClick();
  };
  return <HighlightButton name={name} selected={_selected} onClick={handleSelected} option={option} />;
};

const ContainerTags = ({ children }) => {
  return <ContainerTagsWrapper>{children}</ContainerTagsWrapper>;
};

export default function ArchiveItemModal({ font_id, handleVisible }: Props) {
  const { loading, error, data, refetch } = useQuery(GET_FONT_BY_FONT_ID, { variables: { font_id } });
  const [updateFontTags] = useMutation(UPDATE_FONT_TAG);

  if (loading || error) return null;

  const handleSelectedTag = (tag_id: number) => {
    updateFontTags({ variables: { font_id, tag_id }, onCompleted: (data) => data && refetch({ font_id }) });
  };

  return (
    <ModalBackground onClick={handleVisible}>
      <ModalWrapper>
        <Image alt="modal_background" src={ModalSVG} />
        <ModalContentWrapper>
          <Image alt="btn_close" src={CloseSVG} onClick={handleVisible} />
          <Image alt="img_archive" src={googleDriveLinkToSource('https://drive.google.com/file/d/1qIAB6MEeN6FYuAwMs4xAoZeQXkLxAHer/view?usp=sharing')} layout="fill" className={`filter_turbo`} />
          <hr />
          <ContainerTags>
            <ModalItem key={-1} name={'추가하기'} selected={false} onClick={() => {}} option={{ textColor: `${main}`, underline: true }} />
            {data &&
              data.getTagAll.map((item, index) => (
                <ModalItem
                  key={index}
                  name={item.name}
                  selected={data.getFontByFontId.fontTags.map((fontTag) => fontTag.tags.id).includes(item.id)}
                  onClick={(e) => handleSelectedTag(item.id)}
                />
              ))}
          </ContainerTags>
        </ModalContentWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
}
