'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import CreateDatabase from '@/components/CreateDatabase/CreateDatabase'
let decksDb = []
let decksDbFilter = []
//
// Saved Filter values
//
let objFilters = {
  hcphand1: 0,
  hcphand2: 40,
  hcpsuit1: 0,
  hcpsuit2: 10
}
export default function Home() {
  const [dbSize, setDbSize] = useState('')
  const [messagedbsize, setMessagedbsize] = useState('')
  const [messagefilter, setMessagefilter] = useState('')
  //
  //  First time load saved values
  //
  useEffect(() => {
    //
    //  Restore the dbSize parameter
    //
    let json = sessionStorage.getItem('dbSize')
    if (json) setDbSize(JSON.parse(json))
    //
    //  Filters (if any)
    //
    const objFiltersJSON = sessionStorage.getItem('objFilters')
    objFiltersJSON
      ? (objFilters = JSON.parse(objFiltersJSON))
      : sessionStorage.setItem('objFilters', JSON.stringify(objFilters))
    //
    //  Set the status
    //
    if (decksDb.length > 0) setMessagedbsize('Created')
    // eslint-disable-next-line
  }, [])
  //-------------------------------------------------------------------------------
  const handleCreateDatabase = () => {
    setMessagedbsize('Loading...')
    decksDb = CreateDatabase(dbSize)
    setMessagedbsize('Created')
  }
  //-------------------------------------------------------------------------------
  const HandleInput_dbSize = event => {
    const value = event.target.value
    const numeric = validateRange(setMessagedbsize, 1, 500000, value)
    setDbSize(numeric)
    sessionStorage.setItem('dbSize', JSON.stringify(numeric))
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
  function handleFilter() {
    const handNum = 0
    const suitNum = 0
    setMessagefilter(`Calculating...`)
    decksDbFilter = decksDb.filter(function (deck) {
      //
      //  Hand HCP check
      //
      const hand = deck[handNum]
      const hand_hcp = hand.hand_hcp
      if (hand_hcp < objFilters.hcphand1 || hand_hcp > objFilters.hcphand2) return null
      //
      //  Suit HCP check (pass any)
      //
      const card_hcp = hand.suits[suitNum].cards_hcp
      if (card_hcp < objFilters.hcpsuit1 || card_hcp > objFilters.hcpsuit2) return null
      //
      //  Filter return
      //
      return deck
    })
    //
    //Save first part of database
    //
    const sampleNum = 30
    let sampleFilter
    decksDbFilter.length < sampleNum
      ? (sampleFilter = decksDbFilter)
      : (sampleFilter = decksDbFilter.slice(0, sampleNum))
    sessionStorage.setItem('sampleFilter', JSON.stringify(sampleFilter))
    //
    //  Calculate percentage
    //
    const percent = ((decksDbFilter.length / decksDb.length) * 100).toFixed(1)
    setMessagefilter(`${percent}%`)
  }
  // //-------------------------------------------------------------------------------
  // function handleFilterhcphand() {
  //   let hcp_pass = 0
  //   let hcp_tests = 0
  //   for (let deckNum = 0; deckNum < decksDb.length; deckNum++) {
  //     for (let handNum = 0; handNum < 4; handNum++) {
  //       hcp_tests++
  //       const value = decksDb[deckNum][handNum].hand_hcp
  //       if (value >= objFilters.hcphand1 && value <= objFilters.hcphand2) {
  //         hcp_pass++
  //       }
  //     }
  //   }
  //   const percent = ((hcp_pass / hcp_tests) * 100).toFixed(1)

  //   setMessagehcphand(`${percent}%`)
  // }
  // //-------------------------------------------------------------------------------
  // function handleFilterhcpsuit() {
  //   let hcpsuit_pass = 0
  //   let hcpsuit_tests = 0
  //   for (let deckNum = 0; deckNum < decksDb.length; deckNum++) {
  //     for (let handNum = 0; handNum < 4; handNum++) {
  //       for (let suitNum = 0; suitNum < 4; suitNum++) {
  //         hcpsuit_tests++
  //         const hand = decksDb[deckNum][handNum]
  //         const value = hand.suits[suitNum].cards_hcp
  //         if (value >= objFilters.hcpsuit1 && value <= objFilters.hcpsuit2) hcpsuit_pass++
  //       }
  //     }
  //   }
  //   const percent = ((hcpsuit_pass / hcpsuit_tests) * 100).toFixed(1)

  //   setMessagehcpsuit(`${percent}%`)
  // }
  //-------------------------------------------------------------------------------
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Database</h1>
        </div>

        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='dbSize'
            value={dbSize}
            onChange={HandleInput_dbSize}
          />
        </div>
        <div className={styles.item}>
          <p style={{ color: 'red' }}>{messagedbsize}</p>
        </div>

        <div className={styles.item}>
          <button className={styles.button} onClick={handleCreateDatabase}>
            Create
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Hand hcp</h1>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>{`${objFilters.hcphand1} to ${objFilters.hcphand2}`}</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Suit hcp</h1>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>{`${objFilters.hcpsuit1} to ${objFilters.hcpsuit2}`}</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.item}></div>
        <div></div>
        <div>
          <p style={{ color: 'red' }}>{messagefilter}</p>
        </div>
        <div className={styles.item}>
          <button className={styles.button} onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
    </>
  )
}
