import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface QueryLoadingState {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const useQueryLoadingStore = create<QueryLoadingState>()(
  devtools((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) =>
      set(() => ({ isLoading }), false, 'setIsLoading')
  }))
)
