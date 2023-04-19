import { styled } from '@stitches/react';
import PageTitle from 'components/PageTitle';
import FontDetail from 'features/FontDetail';
import { useRouter } from 'next/router';
import React from 'react';

export default function FontDetailPage() {
  const router = useRouter();
  const font_id = router.query['font_id'] ?? '';

  return (
    <Section_FontDetailPage>
      <PageTitle title={'Detail View'} onClick={() => router.back()} />
      <FontDetail font_id={font_id.toString()} />
    </Section_FontDetailPage>
  );
}

const Section_FontDetailPage = styled('section', {});