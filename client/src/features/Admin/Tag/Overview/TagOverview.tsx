import {ButtonDeleteStyle, ButtonModifyStyle, NewTagItemStyle, TagItemStyle, TagWrapperStyle} from "./style";
import AddSVG from "../../../../assets/images/ic_add.svg";
import Image from "next/image";
import {useQuery} from "@apollo/client";
import {GET_TAG_ALL} from "./gql";
import {useCallback} from "react";

const TagNewItem = () => {
    return (
        <NewTagItemStyle>
            {/* TODO: button element width 100% 안되는 이유 찾아보기 */}
            <Image alt="button-add" src={AddSVG} width="36" height="36" className={`filter_main`}/>
        </NewTagItemStyle>
    )
}

const TagOverview = () => {
    const {loading, error, data} = useQuery(GET_TAG_ALL);

    const handleModify = useCallback((tag_id: string) => {
        console.log(`modify: ${tag_id}`);
    }, []);
    const handleDelete = useCallback((tag_id: string) => {
        console.log(`delete: ${tag_id}`);
    }, []);


    if (loading || error) {
        return null;
    }

    return (
        <TagWrapperStyle>
            <TagNewItem/>
            {
                data &&
                data.getTagAll.map((item, index) => (
                    <TagItemStyle key={item.tag_id}>
                        <div>{item.name}</div>
                        <ButtonModifyStyle onClick={() => handleModify(item.tag_id)}>수정</ButtonModifyStyle>
                        <ButtonDeleteStyle onClick={() => handleDelete(item.tag_id)}>삭제</ButtonDeleteStyle>
                    </TagItemStyle>
                ))
            }
        </TagWrapperStyle>
    );
}

export default TagOverview;