import PageTitle from 'components/PageTitle';
import { FontForm, Overview } from 'features/Admin/Font';
import { useRouter } from 'next/router';
import React from 'react';

export default function Font() {
  const router = useRouter();
  const { font_id } = router.query;
  console.log(font_id);

  return (
    <>
      <PageTitle title={font_id?.toString() !== 'create' ? 'Edit' : 'Add'} onClick={() => router.back()} />
      <FontForm font_id={font_id?.toString() ?? `create`} />
    </>
  );
}
