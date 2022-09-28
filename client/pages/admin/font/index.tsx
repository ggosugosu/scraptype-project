import PageTitle from 'components/PageTitle';
import { FontForm, Overview } from 'features/Admin/Font';
import { useRouter } from 'next/router';
import React from 'react';

export default function FontPage() {
  const router = useRouter();
  
  return (
    <>
    <PageTitle title="Font Setting" onClick={() => router.push('/')} />
    <Overview />
    </>
  )
}
