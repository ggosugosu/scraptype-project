import React from "react";
import { useRouter } from "next/router";
import SearchResult from "features/Search/SearchResult";

export default function FontResultPage() {
  const router = useRouter();
  const { corporation, text } = router.query;
  
  return <SearchResult type="font" keywords={{ corporation: corporation?.toString() ?? "", text: text?.toString() ?? "" }} />;
}
