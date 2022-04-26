import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { DELETE_FONT_TAG, GET_FONT_TAG_ALL } from "./gql";

interface FontTag {
  id: number;
  font_name: string;
  tag_name: string;
}

const FontTagItem = (props) => {
  const [deleteFontTag, {data, error, loading}] = useMutation(DELETE_FONT_TAG);

  const handleDeleteItem = () => {
    const confirmMassage = confirm("정말 삭제하시겠습니까?");
    if (!confirmMassage.valueOf()) return;

    deleteFontTag({variables: {id: props.id}});
    console.log(`${props.id} & ${typeof(props.id)}`)
    if (error) {
      alert("잘못된 값입니다. 담덕에게 문의해주세요.");
      return;
    }
    console.log(JSON.stringify(data));
    if (data == null) alert ("삭제 완료하였습니다.")
  };
  return (
    <tr>
      <td>{props.font_name}</td>
      <td>{props.tag_name}</td>
      <td>
        <button onClick={handleDeleteItem}>삭제</button>
      </td>
    </tr>
  );
};

export default function FontTagTable() {
  const { data, error, loading } = useQuery(GET_FONT_TAG_ALL);

  if (loading) return <div>Loading</div>;
  if (error) return <div>잘못된 데이터입니다.</div>;
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={3}>FontTag</th>
        </tr>
      </thead>
      <tbody>
        {data.getFontTagAll.map((item, index) => {
          return <FontTagItem key={index} id={Number(item.id)} font_name={item.fonts.name} tag_name={item.tags.name} />;
        })}
      </tbody>
    </table>
  );
}
