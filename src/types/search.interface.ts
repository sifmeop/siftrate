export interface Search {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Movie {
  id: number
  title: string
  name: string
  poster_path: string | null
  vote_average: number
  release_date: string
  first_air_date: string
  media_type: string
}
