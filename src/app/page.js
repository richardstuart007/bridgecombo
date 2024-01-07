'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import CreateDatabase from '@/components/CreateDatabase/CreateDatabase'
import DisplayFilters from '@/components/DisplayFilters/DisplayFilters'
let decksDb = []
let decksDbFilter = []
let handfilters

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
    const handfiltersJSON = sessionStorage.getItem('handfilters')
    handfiltersJSON ? (handfilters = JSON.parse(handfiltersJSON)) : CreateDefaultFilters()
    //
    //  Set the status
    //
    if (decksDb.length > 0) setMessagedbsize('Created')
    // eslint-disable-next-line
  }, [])
  // --------------------------------------------------------------------------------
  // Create Default Filters
  // --------------------------------------------------------------------------------
  function CreateDefaultFilters() {
    //
    //  Suits
    //
    const objSuits = {
      hcpsuitF: 0,
      hcpsuitT: 10
    }
    const suits = []
    for (let suitNum = 0; suitNum < 4; suitNum++) {
      suits[suitNum] = objSuits
    }
    //
    //  Hands
    //
    const objHand = {
      hcphandF: 0,
      hcphandT: 40,
      suits: suits
    }
    handfilters = []
    for (let handNum = 0; handNum < 4; handNum++) {
      handfilters[handNum] = objHand
    }
    //
    //  Save
    //
    sessionStorage.setItem('handfilters', JSON.stringify(handfilters))
  }
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
    setMessagefilter(`Calculating...`)

    decksDbFilter = decksDb.filter(function (deck) {
      for (let handNum = 0; handNum < 4; handNum++) {
        //
        //  Hand
        //
        const hand = deck[handNum]
        //
        //  Hand HCP check
        //
        const hand_hcp = hand.hand_hcp

        if (hand_hcp < handfilters[handNum].hcphandF || hand_hcp > handfilters[handNum].hcphandT)
          return null
        //
        //  Suit HCP check
        //
        for (let suitNum = 0; suitNum < 4; suitNum++) {
          const card_hcp = hand.suits[suitNum].cards_hcp

          if (
            card_hcp < handfilters[handNum].suits[suitNum].hcpsuitF ||
            card_hcp > handfilters[handNum].suits[suitNum].hcpsuitT
          )
            return null
        }
      }
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

      <DisplayFilters></DisplayFilters>

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
