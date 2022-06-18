import { useQuery } from "@apollo/client";
import { ButtonPositive } from "components/Button";
import PageTitle from "components/PageTitle";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GET_CORPORATION_ALL } from "./gql";
import ArrowDownSVG from "assets/images/ic_arrow_down.svg";
import { FlexWrapper, SelectorWrapper, Selector, Text } from "./style";

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
    <>
      <PageTitle title="Name search" onClick={() => router.push("/")} />
      <section>
      <FlexWrapper>
        <SelectorWrapper>
          <div className="arrow_wrapper">
            <Image alt="arrow" src={ArrowDownSVG} layout="fill" />
          </div>
          <Selector value={corporation} onChange={handleCorporationChange}>
            <option value={""}>제작사 전체</option>
            {data &&
              data.getCorporationAll.map((item, index) => (
                <option key={index} value={item.corporation}>
                  {item.corporation}
                </option>
              ))}
          </Selector>
        </SelectorWrapper>
        <Text placeholder={"Enter the name of the font you want"} value={text} onChange={handleTextChange} />
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
      </FlexWrapper>
    </section>
    </>
  );
}
