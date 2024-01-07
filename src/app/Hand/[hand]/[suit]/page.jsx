'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
//
// Saved form values
//
let handfilters

export default function SuitFilter(params) {
  const [hcpsuitF, sethcpsuitF] = useState('')
  const [hcpsuitT, sethcpsuitT] = useState('')
  const [messagehcpsuit, setMessagehcpsuit] = useState('')
  //
  //  Unpack parameters
  //
  const hand = params.params.hand
  const suit = params.params.suit
  //
  //  Get hand number
  //
  const handlookup = {
    North: 0,
    East: 1,
    South: 2,
    West: 3
  }
  const handNum = handlookup[hand]
  //
  //  Get suit number
  //
  const suitlookup = {
    Spades: 0,
    Hearts: 1,
    Diamonds: 2,
    Clubs: 3
  }
  const suitNum = suitlookup[suit]
  //
  //  First time load saved values
  //
  useEffect(() => {
    //
    //  Filters
    //
    handfilters = JSON.parse(sessionStorage.getItem('handfilters'))
    //
    //  Restore the form values
    //
    const hcpsuitF = handfilters[handNum].suits[suitNum].hcpsuitF
    const hcpsuitT = handfilters[handNum].suits[suitNum].hcpsuitT
    sethcpsuitF(hcpsuitF)
    sethcpsuitT(hcpsuitT)
    // eslint-disable-next-line
  }, [])
  //-------------------------------------------------------------------------------
  const HandleInput_hcpsuitF = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcpsuit, 0, 10, value)
    sethcpsuitF(numeric)
    handfilters[handNum].suits[suitNum].hcpsuitF = numeric
    handleSave()
    if (numeric > hcpsuitT) setMessagehcpsuit('From cannot be after To range')
  }
  const HandleInput_hcpsuitT = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcpsuit, 0, 10, value)
    sethcpsuitT(numeric)
    handfilters[handNum].suits[suitNum].hcpsuitT = numeric
    handleSave()
    if (numeric < hcpsuitF) setMessagehcpsuit('To cannot be before From range')
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
    sessionStorage.setItem('handfilters', JSON.stringify(handfilters))
  }
  //-------------------------------------------------------------------------------
  return (
    <>
      <h1>
        Suit Filter: {hand} / {suit}
      </h1>
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
            id='hcpsuitF'
            value={hcpsuitF}
            onChange={HandleInput_hcpsuitF}
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcpsuitT'
            value={hcpsuitT}
            onChange={HandleInput_hcpsuitT}
          />
        </div>
        <div className={styles.item}>
          <p style={{ color: 'red' }}>{messagehcpsuit}</p>
        </div>
      </div>
    </>
  )
}
