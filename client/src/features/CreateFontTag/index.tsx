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
  const [createFontTag, {data, error, loading}] = useMutation(CREATE_FONT_TAG);

  if (query.fonts.loading || query.tags.loading) return <p>`Loading...`</p>;
  if (query.fonts.error || query.tags.error) {
    if (query.fonts.error) console.log(`Error ${query.fonts.error}`);
    if (query.tags.error) console.log(`Error ${query.tags.error}`);
    return null;
  }

  const handleApply = () => {
    console.log("success");
    createFontTag({variables: {font_id: fontId, tag_id: tagId}});
    console.log(`query send -> font: ${typeof(fontId)} / tag: ${typeof(tagId)}`)
  };

  if (data) alert("추가했습니다.");
  if (error) alert("담덕에게 문의하세요.");

  const selectedFontId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontId(Number(e.target.value))
  };

  const selectedTagId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setTagId(Number(e.target.value))
  };

  return (
    <div>
      <select value={fontId} onChange={(e) => selectedFontId(e)}>
        {query.fonts.data.getAllFont.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
      <select value={tagId} onChange={(e) => selectedTagId(e)}>
        {query.tags.data.getAllTag.map((value) => (
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
