import React, { useEffect, useState } from "react";
import Image from "next/image";
import back from "../../assets/images/ic_back.svg";

import { GET_TAGS } from "./gql";
import { useQuery } from "@apollo/client";
import SearchTagItem from "../../features/SearchTagItem";

import { Title, SearchTagWrapper, Container } from "./style";
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

  const selectedTag = (item: TagType) => {
    console.log("selected");
    console.log(`${JSON.stringify(item.id)}`);
    console.log(`${selectedList.some((e) => e.id === item.id)}`);
    if (selectedList.some((e) => e.id === item.id)) setSelectedList((props) => props.filter((p) => p.id !== item.id));
    else setSelectedList((props) => [...props, item]);
  };

  if (loading || error) return null;

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
        {selectedList.length == 0 ? (
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
    </>
  );
}
