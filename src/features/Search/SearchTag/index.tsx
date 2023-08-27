import { useQuery } from '@apollo/client';
import { ButtonNegative, ButtonPositive } from 'components/Button';
import PageTitle from 'components/PageTitle';

import { GET_TAGS } from 'features/Search/SearchTag/gql';
import SearchTagItem from 'features/Search/SearchTag/SearchTagItem';

import { ButtonContainer, Container, SearchTagWrapper } from 'features/Search/SearchTag/style';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface TagType {
  id: Number;
  name: String;
}

export default function SearchTag() {
  const router = useRouter();
  const {loading, error, data} = useQuery(GET_TAGS);
  const [selectedList, setSelectedList] = useState<TagType[]>([]);

  const selectedTag = (item: TagType) => {
    if (selectedList.some((e) => e.id === item.id)) {
      setSelectedList((prev) => {
        return prev.filter((p: TagType) => p.id !== item.id);
      });
      return;
    }

    setSelectedList((prev) => [...prev, item]);
  };

  if (!router.isReady || loading || error) return null;

  const resetSelectedTag = () => {
    setSelectedList([]);
  };

  return (
    <>
      <PageTitle title="Tag search" onClick={() => router.push('/')} />
      <SearchTagWrapper>
        {data.getTagAll.map((value) => (
          <SearchTagItem
            key={value.id}
            name={value.name}
            selected={selectedList.some((e) => e.id === value.id)}
            onClick={() => selectedTag({id: value.id, name: value.name})}
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
          <span>{selectedList.map((item) => item.name).join(', ')}</span>
        )}
      </Container>
      <ButtonContainer>
        <ButtonNegative enabled={true} text="CLEAR" onClick={resetSelectedTag} />
        <ButtonPositive
          enabled={selectedList.length !== 0}
          text="SEARCH"
          onClick={() =>
            router.push({
              pathname: '/search/tag/result',
              query: {tags: `${selectedList.map((item) => item.id)}`},
            })
          }
        />
      </ButtonContainer>
    </>
  );
}
