'use client'
import React from 'react'
import styles from './page.module.css'

export default function DisplayFilters() {
  //
  //  Filters
  //
  const json = sessionStorage.getItem('handfilters')
  if (!json) return null

  const handfilters = JSON.parse(json)
  //
  //  Restore the form values
  //
  //
  //  Get hand number
  //
  const handName = ['North', 'East', 'South', 'West']
  const suitName = ['Spades', 'Hearts', 'Diamonds', 'Clubs']

  const tableRows = []
  let id = 0
  for (let handNum = 0; handNum < 4; handNum++) {
    const objHand = handfilters[handNum]
    id++
    const row = {
      id: id,
      handName: handName[handNum],
      hcphandF: objHand.hcphandF,
      hcphandT: objHand.hcphandT,
      suitNum: '',
      hcpsuitF: '',
      hcpsuitT: ''
    }
    if (row.hcphandF !== 0 || row.hcphandT !== 40) tableRows.push(row)

    for (let suitNum = 0; suitNum < 4; suitNum++) {
      const objSuits = handfilters[handNum].suits[suitNum]
      id++
      const row = {
        id: id,
        handName: handName[handNum],
        hcphandF: '',
        hcphandT: '',
        suitName: suitName[suitNum],
        hcpsuitF: objSuits.hcpsuitF,
        hcpsuitT: objSuits.hcpsuitT
      }

      if (row.hcpsuitF !== 0 || row.hcpsuitT !== 10) tableRows.push(row)
    }
  }
  //-------------------------------------------------------------------------------
  return (
    <>
      <table>
        <thead className={styles.header}>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>hand</th>
            <th>Suit</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {tableRows.map(item => (
            <tr key={item.id}>
              <td>{item.hcphandF}</td>
              <td>{item.hcphandT}</td>
              <td>{item.handName}</td>
              <td>{item.suitName}</td>
              <td>{item.hcpsuitF}</td>
              <td>{item.hcpsuitT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
