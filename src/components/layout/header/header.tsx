import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { BsCalendarDate } from 'react-icons/bs'
import { FaStar, FaUser } from 'react-icons/fa'
import { MdOutlineRateReview } from 'react-icons/md'
import { useHeaderScroll } from '~/hooks/useHeaderScroll'
import { cn } from '~/utils/cn'
import { ROUTES } from '~/utils/constants'
import styles from './header.module.scss'

export const links = [
  {
    label: 'Рейтинг',
    href: ROUTES.RATING,
    icon: <FaStar className={styles.icon} />
  },
  {
    label: 'По датам',
    href: ROUTES.BY_DATE,
    icon: <BsCalendarDate className={styles.icon} />
  },
  {
    label: 'Оценить',
    href: ROUTES.RATE,
    icon: <MdOutlineRateReview className={styles.icon} />
  },
  {
    label: 'Профиль',
    href: ROUTES.HOME,
    icon: <FaUser className={styles.icon} />
  }
]

export const Header = () => {
  const { pathname } = useRouter()
  const { isScrolled } = useHeaderScroll()

  const headerRef = useRef<HTMLElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  const updateHeight = (
    variableName: string,
    ref: React.MutableRefObject<HTMLElement | null>
  ) => {
    if (ref.current) {
      const doc = document.documentElement
      doc.style.setProperty(variableName, `${ref.current.offsetHeight}px`)
    }
  }

  useEffect(() => {
    if (!headerRef.current) return
    const resizeObserver = new ResizeObserver(() =>
      updateHeight('--header-height', headerRef)
    )
    resizeObserver.observe(headerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!navRef.current || !navRef.current) return
    const resizeObserver = new ResizeObserver(() =>
      updateHeight('--nav-height', navRef)
    )
    resizeObserver.observe(navRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <header
      ref={headerRef}
      className={cn(styles.header, {
        [styles.active_scroll!]: isScrolled
      })}>
      <Link href={ROUTES.HOME} className={styles.logo}>
        <Image width={220} height={27} src='/logo.svg' alt='Logo' priority />
      </Link>
      <nav ref={navRef} className={styles.nav}>
        <ul>
          {links.map(({ label, href, icon }) => (
            <li
              key={label}
              className={cn(styles.item, {
                [styles.active_link!]: pathname === href
              })}>
              <Link href={href}>
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
