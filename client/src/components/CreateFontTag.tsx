import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FONT, GET_TAG } from "../query/gql";

const QueryMultiple = ()=> {
  const fonts = useQuery(GET_FONT);
  const tags = useQuery(GET_TAG);

  return {fonts, tags}
}
function CreateFontTag() {
  const query = QueryMultiple();
  if (query.fonts.loading || query.tags.loading) return <p>`Loading...`</p>;
  if (query.fonts.error || query.tags.error) {
    if (query.fonts.error) console.log(`Error ${query.fonts.error}`);
    if (query.tags.error) console.log(`Error ${query.tags.error}`);
    return null;
  }

  return (
    <div>
      
      <select>
        {query.fonts.data.getAllFont.map((value) => (
          <option key={value.id} value={value.id}>{value.name}</option>
        ))}
      </select>
      <select>
        {query.tags.data.getAllTag.map((value) => (
          <option key={value.id} value={value.id}>{value.name}</option>
        ))}
      </select>
    </div>
  );
}

export default CreateFontTag;
