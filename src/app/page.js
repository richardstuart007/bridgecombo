'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import CreateDatabase from '@/components/CreateDatabase/CreateDatabase'

export default function Home() {
  const [dbSize, setDbSize] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleCreateDatabase = () => {
    CreateDatabase(dbSize)
  }

  const handleInputChange = event => {
    const value = event.target.value
    setDbSize(value)

    // Validate if the value is an integer within the specified range
    const min = 2
    const max = 500000
    const isValid = /^[1-9]\d*$/.test(value) && Number(value) >= min && Number(value) <= max

    if (isValid || value === '') {
      setErrorMessage('')
    } else {
      setErrorMessage(`Valid integer between ${min} and ${max}.`)
    }
  }

  return (
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
          onChange={handleInputChange}
          // style={{ appearance: 'textfield' }} // Override default styling
        />
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>

      <div className={styles.item}>
        <button className={styles.button} onClick={handleCreateDatabase}>
          Create
        </button>
      </div>
    </div>
  )
}
