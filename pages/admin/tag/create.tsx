import PageTitle from "components/PageTitle";
import React from "react";
import { useRouter } from "next/router";
import CreateTag from "features/Admin/Tag/New";

const CreateTagPage = () => {
  const router = useRouter();

  return (
    <section>
      <PageTitle
        title="Tag Setting / Add"
        onClick={() => router.push("/admin/tag")}
      />
      <CreateTag/>
    </section>
  );
};

export default CreateTagPage;
