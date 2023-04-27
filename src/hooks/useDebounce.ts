import { useEffect, useState } from 'react'

export const useDebounce = (value: string): string => {
  const [debounced, setDebounced] = useState<string>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), 200)
    return () => clearTimeout(handler)
  }, [value])

  return debounced
}
