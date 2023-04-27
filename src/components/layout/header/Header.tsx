import BurgerButton from '@/components/ui/BurgerButton/BurgerButton'
import { useHeaderScroll } from '@/hooks/useHeaderScroll'
import { links } from '@/utils/links'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './Header.module.scss'

const Header = () => {
  const { pathname } = useRouter()
  const { isScrolled } = useHeaderScroll()
  const [isOpen, setOpen] = useState(false)

  return (
    <header
      className={clsx(styles.header, {
        [styles.activeScroll as string]: isScrolled
      })}>
      <Link href='/' className={styles.logoWrapper}>
        <Image width={220} height={27} src='/logo.svg' alt='Logo' priority />
      </Link>
      <nav
        className={clsx(styles.menu, {
          [styles.menuOpen as string]: isOpen
        })}>
        <ul className={styles.list}>
          {links.map((item) => (
            <li
              key={item.title}
              className={clsx(styles.item, {
                [styles.activeLink as string]: pathname === item.link
              })}
              onClick={() => setOpen(false)}>
              <Link href={item.link} className={styles.link}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <BurgerButton isOpen={isOpen} setOpen={setOpen} />
    </header>
  )
}

export default Header
