'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
//
// Saved form values
//
let objFilters = {
  hcphand1: 0,
  hcphand2: 0,
  hcpsuit1: 0,
  hcpsuit2: 0
}
export default function Filters() {
  const [hcphand1, sethcphand1] = useState('')
  const [hcphand2, sethcphand2] = useState('')
  const [messagehcphand, setMessagehcphand] = useState('')
  const [hcpsuit1, setHcpsuit1] = useState('')
  const [hcpsuit2, setHcpsuit2] = useState('')
  const [messagehcpsuit, setMessagehcpsuit] = useState('')
  //
  //  First time load saved values
  //
  useEffect(() => {
    //
    //  Restore the form values
    //
    objFilters = JSON.parse(sessionStorage.getItem('objFilters'))
    sethcphand1(objFilters.hcphand1)
    sethcphand2(objFilters.hcphand2)
    setHcpsuit1(objFilters.hcpsuit1)
    setHcpsuit2(objFilters.hcpsuit2)
    // eslint-disable-next-line
  }, [])
  //-------------------------------------------------------------------------------
  const HandleInput_hcphand1 = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcphand, 0, 40, value)
    sethcphand1(numeric)
    objFilters.hcphand1 = numeric
    handleSave()
    if (numeric > hcphand2) setMessagehcphand('From cannot be after To range')
  }
  const HandleInput_hcphand2 = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcphand, 0, 40, value)
    sethcphand2(numeric)
    objFilters.hcphand2 = numeric
    handleSave()
    if (numeric < hcphand1) setMessagehcphand('To cannot be before From range')
  }
  const HandleInput_hcpsuit1 = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcpsuit, 0, 10, value)
    setHcpsuit1(numeric)
    objFilters.hcpsuit1 = numeric
    handleSave()
    if (numeric > hcpsuit2) setMessagehcpsuit('From cannot be after To range')
  }
  const HandleInput_hcpsuit2 = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagehcpsuit, 0, 10, value)
    setHcpsuit2(numeric)
    objFilters.hcpsuit2 = numeric
    handleSave()
    if (numeric < hcpsuit1) setMessagehcpsuit('To cannot be before From range')
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
    sessionStorage.setItem('objFilters', JSON.stringify(objFilters))
  }
  //-------------------------------------------------------------------------------
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Hand hcp</h1>
        </div>

        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcphand1'
            value={hcphand1}
            onChange={HandleInput_hcphand1}
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcphand2'
            value={hcphand2}
            onChange={HandleInput_hcphand2}
          />
        </div>
        <div className={styles.item}>
          <p style={{ color: 'red' }}>{messagehcphand}</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Suit hcp</h1>
        </div>

        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcpsuit1'
            value={hcpsuit1}
            onChange={HandleInput_hcpsuit1}
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcpsuit2'
            value={hcpsuit2}
            onChange={HandleInput_hcpsuit2}
          />
        </div>
        <div className={styles.item}>
          <p style={{ color: 'red' }}>{messagehcpsuit}</p>
        </div>
      </div>
    </>
  )
}
