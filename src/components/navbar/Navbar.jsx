'use client'
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'

const links = [
  {
    id: 1,
    title: 'Home',
    url: '/'
  },

  {
    id: 2,
    title: 'Filters',
    url: '/Filters'
  }
]

export default function Navbar() {
  return (
    <div className={styles.container}>
      <Link href='/' className={styles.logo}>
        Bridge Combo
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map(link => (
          <Link className={styles.link} key={link.id} href={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
