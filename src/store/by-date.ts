import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ByDateState {
  selectedYear: number
  setSelectedYear: (year: number) => void
  selectedMonth: number
  setSelectedMonth: (month: number) => void
}

export const useByDateStore = create<ByDateState>()(
  devtools((set) => ({
    selectedYear: new Date().getFullYear(),
    setSelectedYear: (selectedYear: number) =>
      set(() => ({ selectedYear }), false, 'setSelectedYear'),
    selectedMonth: new Date().getMonth() + 1,
    setSelectedMonth: (selectedMonth: number) =>
      set(() => ({ selectedMonth }), false, 'setSelectedMonth')
  }))
)
