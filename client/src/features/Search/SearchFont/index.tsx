import { useQuery } from "@apollo/client";
import { ButtonPositive } from "components/Button";
import PageTitle from "components/PageTitle";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GET_CORPORATION_ALL } from "./gql";
import ArrowDownSVG from "assets/images/ic_arrow_down.svg";
import { FlexWrapperStyle, SelectorWrapperStyle, SelectorStyle } from "./style";
import InputText from "components/InputText";

export default function SearchFont() {
    const router = useRouter();
    const {loading, error, data} = useQuery(GET_CORPORATION_ALL);
    const [corporation, setCorporation] = useState<string>("");
    const [text, setText] = useState<string>("");

    const handleCorporationChange = (e) => {
        setCorporation(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await router.push({
            pathname: "/search/font/result",
            query: {type: "font", corporation: `${corporation}`, text: `${text}`},
        })
    }

    if (loading || error) return null;

    return (
        <>
            <PageTitle title="Name search" onClick={() => router.push("/")}/>
            <section>
                <FlexWrapperStyle onSubmit={handleSubmit}>
                    <SelectorWrapperStyle>
                        <label className={"hidden"} htmlFor={"selector-corporation"}>제작사 전체</label>
                        <div className="arrow_wrapper">
                            <Image alt="arrow" src={ArrowDownSVG} layout="fill"/>
                        </div>
                        <SelectorStyle id={"selector-corporation"} value={corporation} onChange={handleCorporationChange}>
                            <option value={""}>제작사 전체</option>
                            {data &&
                                data.getCorporationAll.map((item, index) => (
                                    <option key={index} value={item.corporation}>
                                        {item.corporation}
                                    </option>
                                ))}
                        </SelectorStyle>
                    </SelectorWrapperStyle>
                    <label className={"hidden"} htmlFor={"input-font-name"}>폰트 이름을 적어주세요.</label>
                    <InputText id={"input-font-name"} placeholder={"폰트 이름을 적어주세요."} value={text} fixed={false}
                               onChange={handleTextChange}/>
                    <ButtonPositive
                        enabled={(corporation || text)}
                        text="검색하기"
                        type="submit"
                    />
                </FlexWrapperStyle>
            </section>
        </>
    );
}
