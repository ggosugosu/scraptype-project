import React, { useEffect, useState } from "react";
import Image from "next/image";
import back from "../../assets/images/ic_back.svg";
import Link from "next/link";

import { GET_TAGS } from "./gql";
import { useQuery } from "@apollo/client";
import SearchTagItem from "../../features/SearchTagItem";

import { Title, SearchTagWrapper, Container, ButtonContainer } from "./style";
import { ButtonNegative } from "../../common/globalStyle";
import { ButtonPositive } from "../../common/svgs";
interface Props {
  title: String;
}
interface TagType {
  id: Number;
  name: String;
}

function PageTitle(props: Props) {
  return (
    <Title>
      <Image src={back} alt="back" />
      <span>{props.title}</span>
    </Title>
  );
}

export default function SearchTag() {
  const { loading, error, data } = useQuery(GET_TAGS);
  const [selectedList, setSelectedList] = useState<TagType[]>([]);

  useEffect(() => {
    if (data == null) return;
    const list: TagType[] = data.getTagAll.map((item) => {
      item.id, item.name;
    });
  }, [selectedList]);

  
  // 버튼 핸들러
  const selectedTag = (item: TagType) => {
    if (selectedList.some((e) => e.id === item.id)) setSelectedList((props) => props.filter((p) => p.id !== item.id));
    else setSelectedList((props) => [...props, item]);
  };

  if (loading || error) return null;

  const resetSelectedTag = () => {
    setSelectedList([]);
  };

  return (
    <>
      <PageTitle title="Search Tag" />
      <SearchTagWrapper>
        {data.getTagAll.map((value) => (
          <SearchTagItem
            key={value.id}
            name={value.name}
            selected={selectedList.some((e) => e.id === value.id)}
            onClick={() => selectedTag({ id: value.id, name: value.name })}
          />
        ))}
      </SearchTagWrapper>
      <Container>
        {selectedList.length === 0 ? (
          <span>
            Choose the tags for
            <br />
            the keywords
            <br />
            you want
          </span>
        ) : (
          <span>{selectedList.map((item) => item.name).join(", ")}</span>
        )}
      </Container>
      <ButtonContainer>
        <ButtonNegative enabled={true} onClick={resetSelectedTag}>
          CLEAR
        </ButtonNegative>
        <Link
          href={{
            pathname: "/search/tag/result",
            query: { tags: `${selectedList.map((item) => item.id)}` },
          }}
          passHref
        >
          <ButtonPositive enabled={selectedList.length !== 0} text="SEARCH" />
        </Link>
      </ButtonContainer>
    </>
  );
}
