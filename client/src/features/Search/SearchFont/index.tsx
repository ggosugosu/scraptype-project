import { ButtonPositive } from "components/Button";
import PageTitle from "components/PageTitle";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

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
  return (
    <section>
      <PageTitle title="Search Font" onClick={() => router.push("/")} />
      <Corporation>
        <option>null</option>
        <option>hi</option>
        <option>h2</option>
      </Corporation>
      <Font placeholder={"폰트를 입력하세요."} />
      <ButtonPositive
        enabled={true}
        text="SEARCH"
        onClick={() =>
          router.push({
            pathname: "/search/tag/result",
            query: { font: "" },
          })
        }
      />
    </section>
  );
}
