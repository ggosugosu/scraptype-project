import { useQuery } from "@apollo/client";
import { ButtonPositive } from "components/Button";
import PageTitle from "components/PageTitle";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { GET_CORPORATION_ALL } from "./gql";

const Corporation = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 270px;
  height: 60px;
`;

const Font = styled.input.attrs((props) => ({
  type: "text",
}))`
  width: 388px;
`;

export default function SearchFont() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CORPORATION_ALL);
  const [text, setText] = useState<string>("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  if (loading || error) return null;

  return (
    <section>
      <PageTitle title="Search Font" onClick={() => router.push("/")} />
      <Corporation>
        {data &&
          data.getCorporationAll.map((item, index) => (
            <option key={index} value={item.corporation}>
              {item.corporation}
            </option>
          ))}
      </Corporation>
      <Font placeholder={"폰트를 입력하세요."} value={text} onChange={handleTextChange} />
      <ButtonPositive
        enabled={true}
        text="SEARCH"
        onClick={() =>
          router.push({
            pathname: "/search/font/result",
            query: { type: "font", text: `${text}` },
          })
        }
      />
    </section>
  );
}
