'use client'
import React from 'react'
import Link from 'next/link'

export default function HandSelection() {
  return (
    <>
      <h1>Hand Selection</h1>
      <Link href='/Hand/North'>North</Link>
      <Link href='/Hand/East'>East</Link>
      <Link href='/Hand/South'>South</Link>
      <Link href='/Hand/West'>West</Link>
    </>
  )
}
