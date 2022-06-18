import { useQuery } from "@apollo/client";
import { black, main } from "common/colors";
import { ButtonPositive } from "components/Button";
import PageTitle from "components/PageTitle";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { GET_CORPORATION_ALL } from "./gql";
import ArrowDownSVG from "assets/images/ic_arrow_down.svg";

const SearchWrapper = styled.div`
display: flex;
flex-flow: row wrap;
gap: 16px;
`;
const BoxWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
  height: auto;
  .arrow_wrapper {
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    width: 32px;
    height: 54px;
  }
`;
const Corporation = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  width: 270px;
  height: 54px;
  border: none;
  border-bottom: solid 2px ${black};
  padding: 0 16px;
  background-color: transparent;
  font-size: 20px;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  &:focus {
    outline: none;
    border-bottom: solid 2px ${main};
  }

  option {
    border: 1px solid ${main};
    padding: 16px;
    font-size: 20px;
  }
`;

const Font = styled.input.attrs((props) => ({
  type: "text",
}))`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  border-bottom: solid 2px ${black};
  flex: 1 1 auto;
  width: 0px;
  height: 54px;
  font-size: 20px;

  &:focus {
    outline: none;
    border-bottom: solid 2px ${main};
  }
`;

function SelectBox() {}

export default function SearchFont() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CORPORATION_ALL);
  const [corporation, setCorporation] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleCorporationChange = (e) => {
    setCorporation(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  if (loading || error) return null;

  return (
    <section>
      <PageTitle title="Search Font" onClick={() => router.push("/")} />
      <SearchWrapper>
      <BoxWrapper>
        <div className="arrow_wrapper">
          <Image alt="arrow" src={ArrowDownSVG} layout="fill" />
        </div>
        <Corporation value={corporation} onChange={handleCorporationChange}>
          <option value={""}>제작사 전체</option>
          {data &&
            data.getCorporationAll.map((item, index) => (
              <option key={index} value={item.corporation}>
                {item.corporation}
              </option>
            ))}
        </Corporation>
      </BoxWrapper>

      <Font placeholder={"Enter the name of the font you want"} value={text} onChange={handleTextChange} />
      <ButtonPositive
        enabled={true}
        text="SEARCH"
        onClick={() =>
          router.push({
            pathname: "/search/font/result",
            query: { type: "font", corporation: `${corporation}`, text: `${text}` },
          })
        }
      />
      </SearchWrapper>
    </section>
  );
}
