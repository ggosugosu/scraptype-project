import logoBistro from "assets/images/logo_bistro.svg";
import logo from "assets/images/logo_no_icon.svg";
import Image from "next/image";
import { useState } from "react";

import { useQuery } from "@apollo/client";
import CharContainer from "components/CharContainer/CharContainer";
import CharItem from "components/CharContainer/Item/CharItem";
import { GET_FONT_ALL } from "./gql";
import ArchiveItemModal from "./modal";
import { LogoWrapper } from "./style";

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
                name={item.name}
                description={item.description}
                corporation={item.corporation}
                tags={item.fontTags}
                webFont={item.webFont}
                isArchive={true}
                onClick={handleClicked}
              />
            );
          })}
        {data && modalIsVisible && (
          <ArchiveItemModal
            font_id={selectedFontId ?? -1}
            handleVisible={handleVisible}
          />
        )}
      </CharContainer>
    </>
  );
}
