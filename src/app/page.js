'use client'
import Image from 'next/image'
import styles from './page.module.css'
import ComboShuffle from '@/components/ComboShuffle/ComboShuffle'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Better design for your digital products.</h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the global tech industry.
        </p>
        <button className={styles.logout} onClick={ComboShuffle}>
          Shuffle
        </button>
      </div>
      <div className={styles.item}>
        <Image src='/hero.png' alt='' width={400} height={250} className={styles.img} />
      </div>
    </div>
  )
}
