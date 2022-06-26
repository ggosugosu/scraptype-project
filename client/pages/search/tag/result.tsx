import React from 'react'
import { useRouter } from 'next/router'
import SearchResult from 'features/Search/SearchResult';

export default function TagResultPage() {
  const router = useRouter();
  const {tags} = router.query;

  return (
    <SearchResult type="tag" keywords={tags?.toString()} />
  )
}
