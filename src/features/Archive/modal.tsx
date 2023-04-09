import { useMutation, useQuery } from '@apollo/client';
import CloseSVG from 'assets/images/ic_close.svg';
import ModalSVG from 'assets/images/modal_archive.svg';
import { black, grey_400, main } from 'common/colors';
import HighlightButton, { HighlightButtonOption, } from 'components/HighlightButton';
import { Archive_FontByFontId, Archive_UpdateFontTag } from 'features/Archive/gql';
import useCharColor from 'hooks/useCharColor';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  font_id: number;
  is_web_font: boolean;
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
  backdrop-filter: blur(3px);
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

  .btn-close-wrapper {
    position: absolute;
    top: 24px;
    left: 24px;
  }

  .img-archive-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 116px;
    height: 116px;
    margin: 68px auto 0 auto;
  }

  .detail-view-wrapper {
    display: grid;
    grid-template-rows: auto auto;
    justify-content: center;
    align-items: center;

    margin-top: 8px;
    margin-bottom: 48px;

    text-align: center;
  }

  a {
    margin-top: 6px;
    padding: 2px 46px;
    text-decoration: underline;
    color: ${grey_400};
    cursor: pointer;
  }
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

const ModalItem = ({name, selected, onClick, option}: ItemProps) => {
  const [_selected, _setSelected] = useState<boolean>(selected);
  const handleSelected = () => {
    _setSelected(!selected);
    onClick();
  };
  return (
    <HighlightButton
      name={name}
      selected={_selected}
      onClick={handleSelected}
      option={option}
    />
  );
};

const ContainerTags = ({children}: { children: React.ReactNode }) => {
  return <ContainerTagsWrapper>{children}</ContainerTagsWrapper>;
};

export default function ArchiveItemModal({font_id, is_web_font, handleVisible}: Props) {
  const {data, refetch} = useQuery(Archive_FontByFontId, {
    variables: {font_id},
  });
  const [updateFontTags] = useMutation(Archive_UpdateFontTag);

  const handleSelectedTag = (tag_id: number) => {
    updateFontTags({
      variables: {font_id, tag_id},
      onCompleted: (data) => data && refetch({font_id}),
    });
  };

  return (
    <ModalBackground onClick={handleVisible}>
      <ModalWrapper>
        <Image alt="modal_background" src={ModalSVG} />
        <ModalContentWrapper>
          <button className="btn-close-wrapper">
            <Image
              alt="btn_close"
              src={CloseSVG}
              onClick={handleVisible}
              className="btn-close"
            />
          </button>
          <div className="img-archive-wrapper">
            {UnitFontInModal({font_id, is_web_font})}
          </div>
          <div className="detail-view-wrapper">
            <span>{data?.getFontByFontId.name}</span>
            <Link href="/" passHref>
              detail view
            </Link>
          </div>
          <hr />
          <ContainerTags>
            <ModalItem
              key={-1}
              name={'추가하기'}
              selected={false}
              onClick={() => {
              }}
              option={{textColor: `${main}`, underline: true}}
            />
            {data &&
              data.getTagAll.map((item, index) => (
                <ModalItem
                  key={index}
                  name={item.name}
                  selected={data.getFontByFontId.fontTags
                    .map((fontTag) => fontTag.tags.id)
                    .includes(item.id)}
                  onClick={() => handleSelectedTag(item.id)}
                />
              ))}
          </ContainerTags>
        </ModalContentWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
}

/* 텍스트 컬러는 블랙 고정 */
const UnitFontInModal = ({font_id, is_web_font}: { font_id: number, is_web_font: boolean }) => {
  const {char} = useCharColor({isArchive: false});
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      {
        !error && !is_web_font ? (
            <Image className={'char-text  filter_black'}
                   fill
                   alt={`${font_id}의 예시 폰트`}
                   onError={() => setError(true)}
                   src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${font_id}_unit.svg`} />) :
          <span className="char-text" style={{color: black, fontSize: '100px'}}>{error ? '?' : char}</span>
      }
    </>
  );
};
