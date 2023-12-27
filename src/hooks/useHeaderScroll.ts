import { useEffect, useState } from 'react'

export const useHeaderScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      if (scrollTop > 0 && !isScrolled) {
        setIsScrolled(true)
      } else if (scrollTop === 0 && isScrolled) {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  return { isScrolled }
}
