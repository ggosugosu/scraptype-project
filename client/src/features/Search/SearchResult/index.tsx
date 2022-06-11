import React from 'react'

interface Props {
  keywords: String
} 
const toArray = (keywords: String) => keywords.split(',');

export default function index(props: Props) {
  return (
    <div></div>
  )
}
