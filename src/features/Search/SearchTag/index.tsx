import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { GET_TAGS } from 'features/Search/SearchTag/gql';
import { useQuery } from '@apollo/client';
import SearchTagItem from 'features/Search/SearchTag/SearchTagItem';

import { SearchTagWrapper, Container, ButtonContainer } from 'features/Search/SearchTag/style';
import { ButtonNegative, ButtonPositive } from 'components/Button';
import PageTitle from 'components/PageTitle';

interface TagType {
  id: Number;
  name: String;
}

export default function SearchTag() {
  const router = useRouter();
  const {loading, error, data} = useQuery(GET_TAGS);
  const [selectedList, setSelectedList] = useState<TagType[]>([]);

  useEffect(() => {
    if (data == null) return;
    const list: TagType[] = data.getTagAll.map((item) => {
      item.id, item.name;
    });
    setSelectedList(list);
  }, [selectedList]);
  
  const selectedTag = (item: TagType) => {
    // eslint-disable-next-line react/prop-types
    if (selectedList.some((e) => e.id === item.id)) setSelectedList((props) => props.filter((p) => p.id !== item.id));
    else setSelectedList((props) => [...props, item]);
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
