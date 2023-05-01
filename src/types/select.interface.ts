export interface Option {
  value: string
  label: string
  count: number
}

export type OptionsFilter = Omit<Option, 'count'>
