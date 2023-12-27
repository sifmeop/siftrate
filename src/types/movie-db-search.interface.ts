export interface MovieDBSearch {
  id: number
  title?: string
  name?: string
  poster_path?: string
  release_date?: string
  first_air_date?: string
  vote_average?: number
  media_type: MediaType
}

export type MediaType = 'tv' | 'movie' | 'person'
