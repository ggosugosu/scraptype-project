import React from 'react'
import { useRouter } from 'next/router'

export default function TagResultPage() {
  const router = useRouter();
  const {tags} = router.query;
  return (
    <div>Tag List: {tags}</div>
  )
}
