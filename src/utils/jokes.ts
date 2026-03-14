export type Joke = {
  error: boolean
  category: JokeCategory
  type: JokeType
  joke?: string
  setup?: string
  delivery?: string
  flags: {
    nsfw: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
  }
  safe: boolean
  id: number
  lang: string
}

export const BASE_JOKE_URL = 'https://v2.jokeapi.dev/joke/'

export type JokeCategory = 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas' | 'Any'
export type JokeType = 'single' | 'twopart'
export type JokeBLFlag = 'nsfw' | 'religious' | 'political' | 'racist' | 'sexist' | 'explicit'

export type JokeUrlOptions = {
  category: JokeCategory[]
  type?: JokeType
  blacklist?: JokeBLFlag[]
}

export function buildJokeUrl({ category, type, blacklist }: JokeUrlOptions) {
  const url = new URL(category.join(','), BASE_JOKE_URL)
  if (blacklist) url.searchParams.append('blacklistFlags', blacklist.join())
  if (type) url.searchParams.append('type', type)
  return url
}

export async function fetchJoke(
  category: JokeCategory[] = ['Any'],
  blacklist?: JokeBLFlag[],
  type?: JokeType
): Promise<Joke | null> {
  const bl: JokeBLFlag[] = ['racist']
  if (blacklist) {
    for (const b of blacklist) {
      if (!bl.includes(b)) bl.push(b)
    }
  }

  const url = buildJokeUrl({ category: category, blacklist: bl, type: type })

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error(`JokeAPI returned status ${res.status}`)
      return null
    }

    const data = await res.json() as Joke
    if (data.error) {
      console.error('JokeAPI returned an error response')
      return null
    }

    return data
  } catch (error) {
    console.error('Failed to fetch joke:', error)
    return null
  }
}
