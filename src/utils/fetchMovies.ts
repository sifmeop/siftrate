import { type Search } from '@/types/search.interface'
import axios from 'axios'
import { API_KEY, API_URL } from './constants'

export const fetchMovies = async (query: string): Promise<Search> => {
  const response = await axios.get<Search>(`${API_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query: query,
      language: 'ru-RU'
    }
  })

  return response.data
}
