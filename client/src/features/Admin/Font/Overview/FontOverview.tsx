import { useQuery } from "@apollo/client";
import CharContainer from "components/CharContainer/CharContainer";
import AddCharItem from "components/CharContainer/Item/AddCharItem";
import { WebFontCharBox } from "components/CharContainer/Item/CharItem";
import { useRouter } from "next/router";
import { GET_FONT_ALL } from "./gql";

export default function FontOverview() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_FONT_ALL);
  if (loading || error) {
    return null;
  }

  const handleClicked = (font_id: string) => {
    router.push(`/admin/font/${font_id}`);
  };

  return (
    <section>
      <CharContainer>
        <AddCharItem onClick={() => handleClicked(`create`)} />
        {data &&
          data.getFontAll.map((item, index) => (
            <WebFontCharBox
              key={index}
              font_id={item.id}
              name={item.name}
              description={item.description}
              corporation={item.corporation}
              tags={item.fontTags.tags}
              webFont={item.webFont}
              isArchive={false}
              onClick={() => handleClicked(item.id)}
            />
          ))}
      </CharContainer>
    </section>
  );
}
