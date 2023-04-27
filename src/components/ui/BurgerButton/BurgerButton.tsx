import clsx from 'clsx'
import { memo, useEffect } from 'react'
import styles from './BurgerButton.module.scss'

interface Props {
  isOpen: boolean
  setOpen: (prev: boolean) => void
}

const BurgerButton = ({ isOpen, setOpen }: Props) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <button
      className={clsx(styles.icon, {
        [styles.active as string]: isOpen
      })}
      onClick={() => setOpen(!isOpen)}>
      <span />
    </button>
  )
}

export default memo(BurgerButton)
