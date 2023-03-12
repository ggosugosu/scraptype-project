import { useQuery } from '@apollo/client';
import CharContainer from 'components/CharContainer/CharContainer';
import AddCharItem from 'components/CharContainer/Item/AddCharItem';
import { CharItem } from 'components/CharContainer/Item/CharItem';
import { GET_FONT_ALL } from 'features/Admin/Font/Overview/gql';
import { useRouter } from 'next/router';

export default function FontOverview() {
  const router = useRouter();
  const {loading, error, data} = useQuery(GET_FONT_ALL);
  if (loading || error) {
    return null;
  }

  const handleClicked = (font_id: string) => {
    router.push(`/admin/font/${font_id}`);
  };

  return (
    <section>
      <CharContainer>
        <AddCharItem onClick={() => handleClicked(`create`)}/>
        {data &&
          data.getFontAll.map((item, index) => (
            <CharItem
              key={index}
              font_id={item.id}
              name={item.name}
              is_web_font={item.is_web_font}
              description={item.description}
              corporation={item.corporation}
              tags={item.fontTags.tags}
              webFont={item.webFont}
              isArchive={false}
              onClick={() => handleClicked(item.id)}/>
          ))}
      </CharContainer>
    </section>
  );
}
