'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import CreateDatabase from '@/components/CreateDatabase/CreateDatabase'
let allDecks = []
export default function Home() {
  const [dbSize, setDbSize] = useState('')
  const [hcp1, setHcp1] = useState('')
  const [hcp2, setHcp2] = useState('')
  const [message1, setMessage1] = useState('')
  const [message2, setMessage2] = useState('')

  const handleCreateDatabase = () => {
    setMessage1('Loading')
    allDecks = CreateDatabase(dbSize)
    setMessage1('Created')
    // console.log(allDecks)
  }

  const HandleInput_dbSize = event => {
    const value = event.target.value
    const numeric = validateRange(setMessage1, 1, 500000, value)
    setDbSize(numeric)
  }

  const HandleInput_hcp1 = event => {
    const value = event.target.value
    const numeric = validateRange(setMessage2, 0, 40, value)
    setHcp1(numeric)
  }
  const HandleInput_hcp2 = event => {
    const value = event.target.value
    const numeric = validateRange(setMessage2, 0, 40, value)
    setHcp2(numeric)
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
  function handleCreateFilter() {
    let hcp_pass = 0

    let hcp_tests = 0
    for (let deckNum = 0; deckNum < allDecks.length; deckNum++) {
      for (let handNum = 0; handNum < 4; handNum++) {
        hcp_tests++
        const value = allDecks[deckNum][handNum].hand_hcp
        if (value >= hcp1 && value <= hcp2) hcp_pass++
      }
    }
    const percent = ((hcp_pass / hcp_tests) * 100).toFixed(0)

    setMessage2(`${percent}%`)
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
          <p style={{ color: 'red' }}>{message1}</p>
        </div>

        <div className={styles.item}>
          <button className={styles.button} onClick={handleCreateDatabase}>
            Create
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Hand</h1>
        </div>

        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcp1'
            value={hcp1}
            onChange={HandleInput_hcp1}
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.integer}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            id='hcp2'
            value={hcp2}
            onChange={HandleInput_hcp2}
          />
        </div>
        <div className={styles.item}>
          <p style={{ color: 'red' }}>{message2}</p>
        </div>

        <div className={styles.item}>
          <button className={styles.button} onClick={handleCreateFilter}>
            Filter
          </button>
        </div>
      </div>
    </>
  )
}
