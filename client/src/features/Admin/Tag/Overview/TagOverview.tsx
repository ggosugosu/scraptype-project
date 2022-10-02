import {
    ButtonNegativeStyle,
    ButtonPositiveStyle,
    NewTagItemStyle,
    TagItemStyle,
    TagItemWrapperStyle,
    TagWrapperStyle
} from "./style";
import AddSVG from "../../../../assets/images/ic_add.svg";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_TAG, GET_TAG_ALL, UPDATE_TAG } from "./gql";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import InputText from "../../../../components/InputText";

const refreshCurrentPage = () => location.reload();

type TagNewItemProps = {
    onClick: () => void;
}
const TagNewItem = ({onClick}: TagNewItemProps) => {
    return (
        <TagItemWrapperStyle>
            <NewTagItemStyle onClick={onClick}>
                {/* TODO: button element width 100% 안되는 이유 찾아보기 */}
                <Image alt="button-add" src={AddSVG} width="36" height="36" className={`filter_main`}/>
            </NewTagItemStyle>
        </TagItemWrapperStyle>
    )
}

type TagItemProps = {
    id: string
    name: string
    fontTags: string[]
}

const TagItem = (item: TagItemProps) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [modifiedTagName, setModifyTagName] = useState<string>(item.name);
    const prevTagName = useRef<string>(item.name);

    const [updateTag] = useMutation(UPDATE_TAG);
    const [deleteTag] = useMutation(DELETE_TAG);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setModifyTagName(e.target.value);
    }, []);

    const handleCancel = useCallback(() => {
        setModifyTagName(prevTagName.current);
        setOpen(false);
    }, []);

    const handleModifyCompleted = useCallback(async (e) => {
        e.preventDefault();

        await updateTag(
            {
                variables: {id: item.id, name: modifiedTagName},
                onCompleted: (data) => {
                    if (data) {
                        alert("수정을 완료하였습니다!");
                        setOpen(false);
                    } else {
                        alert("잠시 후 다시 시도해주세요.")
                    }
                },
                onError: (error) => {
                    console.log(error.message);
                }
            }
        );
    }, [modifiedTagName, item.id]);

    const handleShowModifyView = useCallback(async () => {
        prevTagName.current = modifiedTagName;
        setOpen(true);
    }, [modifiedTagName]);


    const handleDelete = useCallback(async () => {
        const confirmed = confirm("정말 삭제하시겠습니까? 기존에 연결되어있던 태그들은 모두 해제됩니다.")
        if (!confirmed) return;

        await deleteTag(
            {
                variables: {tag_id: item.id},
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
    }, [deleteTag, item.id]);

    return (
        <TagItemWrapperStyle>
            {
                isOpen
                    ?
                    <TagItemStyle as={"form"} key={item.id} onSubmit={handleModifyCompleted}>
                        <label htmlFor={"input-tag-name"} className={"hidden"}>{modifiedTagName}의 태그 이름을 수정하세요.</label>
                        <InputText id={"input-tag-name"} value={modifiedTagName} onChange={handleChange}
                                   height={"36px"}/>
                        <ButtonPositiveStyle onClick={handleModifyCompleted} type={"submit"}>완료</ButtonPositiveStyle>
                        <ButtonNegativeStyle onClick={handleCancel} type={"button"}>취소</ButtonNegativeStyle>
                    </TagItemStyle>
                    :
                    <TagItemStyle key={item.id}>
                        <div>{modifiedTagName}({item.fontTags.length})</div>
                        <ButtonPositiveStyle
                            onClick={handleShowModifyView}>수정</ButtonPositiveStyle>
                        <ButtonNegativeStyle onClick={handleDelete}>삭제</ButtonNegativeStyle>
                    </TagItemStyle>
            }
        </TagItemWrapperStyle>

    );
};

const TagOverview = () => {
    const router = useRouter();
    const {loading, error, data} = useQuery(GET_TAG_ALL);


    const handleAdd = () => router.push('/admin/tag/create');


    if (loading || error) {
        return null;
    }

    return (
        <section>
            <TagWrapperStyle>
                <TagNewItem onClick={handleAdd}/>
                {
                    data &&
                    data.getTagAll.map((item) => (
                        <TagItem key={item.id} id={item.id} name={item.name} fontTags={item.fontTags}/>
                    ))
                }
            </TagWrapperStyle>
        </section>
    );
}

export default TagOverview;