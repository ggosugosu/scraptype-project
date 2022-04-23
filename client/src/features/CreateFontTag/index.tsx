import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FONT, GET_TAG } from "../CreateFontTag/gql";
import { useRecoilState } from "recoil";
import { fontIdState, tagIdState } from "./atom";

const QueryMultiple = () => {
  const fonts = useQuery(GET_FONT);
  const tags = useQuery(GET_TAG);

  return { fonts, tags };
};

function CreateFontTag() {
  const query = QueryMultiple();
  const [fontId, setFontId] = useRecoilState(fontIdState);
  const [tagId, setTagId] = useRecoilState(tagIdState);

  if (query.fonts.loading || query.tags.loading) return <p>`Loading...`</p>;
  if (query.fonts.error || query.tags.error) {
    if (query.fonts.error) console.log(`Error ${query.fonts.error}`);
    if (query.tags.error) console.log(`Error ${query.tags.error}`);
    return null;
  }

  const handleApply = () => {
    console.log("success");
  };

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
