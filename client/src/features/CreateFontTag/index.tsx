import React from "react";
import { useQuery } from "@apollo/client";
import { CREATE_FONT_TAG, GET_FONT, GET_TAG } from "../CreateFontTag/gql";
import { useRecoilState } from "recoil";
import { fontIdState, tagIdState } from "./atom";
import { useMutation } from "@apollo/react-hooks";

const QueryMultiple = () => {
  const fonts = useQuery(GET_FONT);
  const tags = useQuery(GET_TAG);

  return { fonts, tags };
};

function CreateFontTag() {
  const query = QueryMultiple();
  const [fontId, setFontId] = useRecoilState(fontIdState);
  const [tagId, setTagId] = useRecoilState(tagIdState);
  const [createFontTag, { data, error, loading, reset }] = useMutation(CREATE_FONT_TAG);

  if (query.fonts.loading || query.tags.loading) return <p>`Loading...`</p>;
  if (query.fonts.error || query.tags.error) return null;

  const handleApply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createFontTag({ variables: { font_id: fontId, tag_id: tagId } });
  };
  const selectedFontId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setFontId(Number(e.target.value));
  };
  const selectedTagId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setTagId(Number(e.target.value));
  };

  if (data){
    alert("추가했습니다.");
    reset();
  }

  if (error?.graphQLErrors[0].extensions.status == 400) {
    alert("이미 존재하는 관계입니다.");
    reset();
  }

  return (
    <div>
      <select value={fontId} onChange={(e) => selectedFontId(e)}>
        {query.fonts.data.getFontAll.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
      <select value={tagId} onChange={(e) => selectedTagId(e)}>
        {query.tags.data.getTagAll.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
      <button onClick={handleApply}>적용</button>
    </div>
  );
}

export default CreateFontTag;
