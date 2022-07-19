import { FontForm, Overview } from 'features/Admin/Font';
import { useRouter } from 'next/router';
import React from 'react';

export default function Font() {
  const router = useRouter();
  const { font_id } = router.query;
  return <FontForm fontId={font_id?.toString() ?? `create`} />
}
