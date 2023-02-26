import PageTitle from 'components/PageTitle';
import FontOverview from 'features/Admin/Font/Overview';
import { useRouter } from 'next/router';
import React from 'react';

export default function FontPage() {
  const router = useRouter();

  return (
    <>
      <PageTitle onClick={() => router.push('/')} title="Font Setting" />
      <FontOverview />
    </>
  );
}
