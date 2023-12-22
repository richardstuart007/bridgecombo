'use client'
import Image from 'next/image'
import styles from './page.module.css'
import ComboShuffle from '@/components/ComboShuffle/ComboShuffle'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Work out your percentages</h1>
        <button className={styles.logout} onClick={ComboShuffle}>
          Shuffle
        </button>
      </div>
    </div>
  )
}
