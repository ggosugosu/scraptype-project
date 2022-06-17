import React from 'react'
import { useRouter } from 'next/router'
import SearchResult from 'features/Search/SearchResult';

export default function TagResultPage() {
  const router = useRouter();
  const {text} = router.query;

  console.log(`${typeof(text)}`);
  return (
    <SearchResult type="font" keywords={typeof(text) === "string" ? text : ""} />
  )
}
