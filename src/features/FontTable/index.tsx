import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_FONT_ALL } from 'features/FontTable/gql';

interface Font {
  font_name: string;
  tag_names: string[];
}

const FontItem = (props: Font) => {
  return (
    <tr>
      <td>{props.font_name}</td>
      <td>{props.tag_names.join(', ')}</td>
    </tr>
  );
};
export default function FontTable() {
  const {data, error, loading} = useQuery(GET_FONT_ALL);

  if (loading) return <div>Loading</div>;
  if (error) return <div>잘못된 데이터입니다.</div>;

  return (
    <table>
      <thead>
      <tr>
        <th colSpan={2}>Font</th>
      </tr>
      </thead>
      <tbody>
      {data.getFontAll.map((item, index) => {
        const tagNames = item.fontTags.map(item => item.tags.name);
        return <FontItem key={index} font_name={item.name} tag_names={tagNames} />;
      })}
      </tbody>
    </table>
  );
}
