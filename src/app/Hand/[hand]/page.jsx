'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
//
// Saved form values
//
let handFilters

export default function HandFilter(params) {
  const [hcphandF, sethcphandF] = useState('')
  const [hcphandT, sethcphandT] = useState('')
  const [messagehcphand, setMessagehcphand] = useState('')
  const hand = params.params.hand

  const handlookup = {
    North: 0,
    East: 1,
    South: 2,
    West: 3
  }
  const handNum = handlookup[hand]
  //
  //  First time load saved values
  //
  useEffect(() => {
    //
    //  Restore the form values
    //
    handFilters = JSON.parse(sessionStorage.getItem('handfilters'))
    sethcphandF(handFilters[handNum].hcphandF)
    sethcphandT(handFilters[handNum].hcphandT)
    // eslint-disable-next-line
  }, [])
  //-------------------------------------------------------------------------------
  const HandleInput_hcphandF = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcphand, 0, 40, value)
    sethcphandF(numeric)
    handFilters[handNum].hcphandF = numeric
    handleSave()
    if (numeric > hcphandT) setMessagehcphand('From cannot be after To range')
  }
  const HandleInput_hcphandT = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcphand, 0, 40, value)
    sethcphandT(numeric)
    handFilters[handNum].hcphandT = numeric
    handleSave()
    if (numeric < hcphandF) setMessagehcphand('To cannot be before From range')
  }

  //-------------------------------------------------------------------------------
  function validateRange(msgFunction, min, max, value) {
    //
    //  Strip out non-numerics
    //
    const numericString = value.replace(/\D/g, '')
    //
    //  Convert string to number
    //
    let numeric = Number(numericString)
    //
    // Error Message
    //
    numeric >= min && numeric <= max ? msgFunction('') : msgFunction(`Range ${min} and ${max}.`)
    //
    //  Return numeric value
    //
    return numeric
  }
  //-------------------------------------------------------------------------------
  function handleSave() {
    //
    //  Save
    //
    sessionStorage.setItem('handfilters', JSON.stringify(handFilters))
  }
  //-------------------------------------------------------------------------------
  return (
    <>
      <h1>Hand Filter: {hand}</h1>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>HCP</h1>
        </div>

        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcphandF'
            value={hcphandF}
            onChange={HandleInput_hcphandF}
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcphandT'
            value={hcphandT}
            onChange={HandleInput_hcphandT}
          />
        </div>
        <div className={styles.item}>
          <p style={{ color: 'red' }}>{messagehcphand}</p>
        </div>
      </div>

      <Link href={`/Hand/${hand}/Spades`}>Spades</Link>
      <Link href={`/Hand/${hand}/Hearts`}>Hearts</Link>
      <Link href={`/Hand/${hand}/Diamonds`}>Diamonds</Link>
      <Link href={`/Hand/${hand}/Clubs`}>Clubs</Link>
    </>
  )
}
