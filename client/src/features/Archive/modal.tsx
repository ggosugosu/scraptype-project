import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import ModalSVG from 'assets/images/modal_archive.svg';
import CloseSVG from 'assets/images/ic_close.svg';
import HighlightButton from 'components/HighlightButton';
import { useQuery } from '@apollo/client';
import { GET_FONT_BY_FONT_ID } from './gql';

interface Props {
  id: Number;
}

interface ItemProps {
  name: String;
  selected: Boolean;
  onClick: () => void;
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
  background-color: white;
  opacity: 0.8;
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

const ModalItem = ({ name, selected, onClick }: ItemProps) => {
  return <HighlightButton name={name} selected={selected} onClick={onClick} />;
};

export default function ArchiveItemModal({ id }: Props) {
  const { loading, error, data } = useQuery(GET_FONT_BY_FONT_ID, { variables: { font_id: 3 } });
  if (loading || error) return null;
  console.log(`${JSON.stringify(data.getFontByFontId)}`);

  return (
    <ModalBackground>
      <ModalWrapper>
        <Image alt="modal_background" src={ModalSVG} />
        <ModalContentWrapper>
          <Image alt="btn_close" src={CloseSVG} />
          <div>이미지</div>
          <span>Detail View</span>
          <hr />
          {data &&
            data.getTagAll.map((item, index) => (
              <ModalItem key={index} name={item.name} selected={data.getFontByFontId.fontTags.map((fontTag) => fontTag.tags.id).includes(item.id)} onClick={() => {}} />
            ))}
        </ModalContentWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
}
