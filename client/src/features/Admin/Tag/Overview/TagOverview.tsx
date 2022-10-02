import {ButtonDeleteStyle, ButtonModifyStyle, NewTagItemStyle, TagItemStyle, TagWrapperStyle} from "./style";
import AddSVG from "../../../../assets/images/ic_add.svg";
import Image from "next/image";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_TAG, GET_TAG_ALL, UPDATE_TAG} from "./gql";
import {useCallback} from "react";
import {useRouter} from "next/router";

const refreshCurrentPage = () => location.reload();

type TagNewItemProps = {
    onClick: () => void;
}
const TagNewItem = ({onClick}: TagNewItemProps) => {
    return (
        <NewTagItemStyle onClick={onClick}>
            {/* TODO: button element width 100% 안되는 이유 찾아보기 */}
            <Image alt="button-add" src={AddSVG} width="36" height="36" className={`filter_main`}/>
        </NewTagItemStyle>
    )
}

const TagOverview = () => {
    const router = useRouter();
    const {loading, error, data} = useQuery(GET_TAG_ALL);
    const [updateTag] = useMutation(UPDATE_TAG);
    const [deleteTag] = useMutation(DELETE_TAG);

    const handleAdd = () => router.push('/admin/tag/create');

    const handleModify = useCallback(async (tag_id: string, name: string) => {
        console.log(`modify: ${tag_id}`);
        await updateTag(
            {
                variables: {id: tag_id, name},
                onCompleted: (data) => {
                    if (data) {
                        alert("수정을 완료하였습니다!");
                        refreshCurrentPage();
                    } else {
                        alert("잠시 후 다시 시도해주세요.")
                    }
                },
                onError: (error) => {
                    console.log(error.message);
                }
            }
        );
    }, []);

    const handleDelete = useCallback(async (tag_id: string) => {
        console.log(`delete: ${tag_id}`);
        const confirmed = confirm("정말 삭제하시겠습니까? 기존에 연결되어있던 태그들은 모두 해제됩니다.")
        if (!confirmed) return;

        await deleteTag(
            {
                variables: {tag_id},
                onCompleted: (data) => {
                    if (data) {
                        alert("수정을 완료하였습니다!");
                        refreshCurrentPage();
                    } else {
                        alert("잠시 후 다시 시도해주세요.")
                    }
                },
                onError: (error) => {
                    console.log(error.message);
                }
            }
        )
    }, []);


    if (loading || error) {
        return null;
    }

    return (
        <TagWrapperStyle>
            <TagNewItem onClick={handleAdd}/>
            {
                data &&
                data.getTagAll.map((item) => (
                    <TagItemStyle key={item.id}>
                        <div>{item.name}({item.fontTags.length})</div>
                        <ButtonModifyStyle onClick={() => handleModify(item.id, 'message')}>수정</ButtonModifyStyle>
                        <ButtonDeleteStyle onClick={() => handleDelete(item.id)}>삭제</ButtonDeleteStyle>
                    </TagItemStyle>
                ))
            }
        </TagWrapperStyle>
    );
}

export default TagOverview;