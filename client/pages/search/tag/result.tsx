import React from 'react'
import { useRouter } from 'next/router'
import SearchResult from 'features/Search/SearchResult';

export default function TagResultPage() {
  const router = useRouter();
  const {tags} = router.query;

  console.log(`${typeof(tags)}`);
  return (
    <SearchResult type="tag" keywords={typeof(tags) === "string" ? tags : ""} />
  )
}
