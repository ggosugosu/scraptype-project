import PageTitle from "components/PageTitle";
import { FontForm, Overview } from "features/Admin/Font";
import { DeleteFontButton } from "features/Admin/Font/Form/FontForm";
import { useRouter } from "next/router";
import React from "react";

export default function Font() {
  const router = useRouter();
  const { font_id } = router.query ?? "create";
  console.log(font_id);

  return (
    <>
      <PageTitle
        title={font_id?.toString() !== "create" ? "Edit" : "Add"}
        endItem={
          font_id?.toString() !== "create" && (
            <DeleteFontButton font_id={font_id!!.toString()} />
          )
        }
        onClick={() => router.back()}
      />
      <FontForm font_id={font_id?.toString() ?? `create`} />
    </>
  );
}
