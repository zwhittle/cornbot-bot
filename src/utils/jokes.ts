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
) {
  const bl: JokeBLFlag[] = ['racist']
  if (blacklist)
    blacklist.map(b => {
      if (!bl.includes(b)) bl.push(b)
    })

  const url = buildJokeUrl({ category: category, blacklist: bl, type: type })
  console.log(url)
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data
}
