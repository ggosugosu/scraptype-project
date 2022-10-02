import InputText from "../../../../components/InputText";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { ButtonPositive } from "../../../../components/Button";
import { useRouter } from "next/router";
import { CREATE_TAG } from "./gql";
import { useMutation } from "@apollo/client";
import { CreateForm } from "./style";

const CreateTag = () => {
    const router = useRouter();
    const [tagText, setTagText] = useState<string>('');
    const [createTag] = useMutation(CREATE_TAG);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTagText(e.target.value);
    }

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await createTag(
            {
                variables: {name: tagText},
                onCompleted: (data) => {
                    if (data) {
                        alert("추가하였습니다요!");
                        router.push('/admin/tag');
                    } else {
                        alert("잠시 후 다시 시도해주세요.");
                    }
                },
                onError: (error) => {
                    const status = error.graphQLErrors[0].extensions.status
                    if (status === 400) {
                        alert("이미 존재하는 태그 이름입니다.");
                    } else {
                    }
                }
            }
        )

    }, [tagText, createTag, router]);

    return (
        <section>
            <CreateForm onSubmit={handleSubmit}>
                <h1>새로운 태그를 추가하세요.</h1>
                <label id="input-new-tag" className="hidden">새로운 태그를 추가하세요.</label>
                <InputText id="input-new-tag" value={tagText} onChange={handleChange}/>
                <ButtonPositive enabled={tagText !== ''} text={"완료"} type={'submit'}/>
            </CreateForm>
        </section>
    );
}

export default CreateTag;