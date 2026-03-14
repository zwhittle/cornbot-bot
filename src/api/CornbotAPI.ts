import * as dotenv from 'dotenv'
dotenv.config()

export interface CornbotAPIResponse<T = unknown> {
  status: number
  data: T
}

export class CornbotAPI<T> {
  path: string
  baseUrl = process.env.API_DOMAIN as string

  constructor(path: string) {
    this.path = path
  }

  _url(id?: string | number): string {
    let prefix = '/'
    let url = this.baseUrl + prefix + this.path

    if (id) url += '/' + id

    return url
  }

  private async _fetch(url: string, options?: RequestInit): Promise<Response | null> {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        console.error(`API ${options?.method ?? 'GET'} ${url} returned ${res.status}`)
      }
      return res
    } catch (error) {
      console.error(`API ${options?.method ?? 'GET'} ${url} failed:`, error)
      return null
    }
  }

  private async _parseJson(res: Response | null): Promise<T | null> {
    if (!res) return null
    try {
      return await res.json() as T
    } catch {
      console.error(`Failed to parse JSON from ${res.url}`)
      return null
    }
  }

  async _sync(items: { id: string | number; data: T }[]) {
    await Promise.all(items.map(async item => {
      const id = item.id
      const data = item.data
      const logTag = `${id}`

      console.log(`Creating ${logTag}...`)
      const postRes = await this._post(data)
      if (!postRes) return
      if (postRes.status === 200) console.log(`${logTag} Created`)
      else if (postRes.status === 409) {
        console.log(`${logTag} already exists. Updating...`)
        const putRes = await this._put(id, data)
        if (!putRes) return
        if (putRes.status !== 200) console.error(`PutResError: status ${putRes.status}`)
        else console.log(`${logTag} Updated`)
      } else {
        console.error(`PostResError: status ${postRes.status}`)
      }
    }))
  }

  async _post(data: T): Promise<CornbotAPIResponse<T> | null> {
    const dstr = JSON.stringify(data)
    const res = await this._fetch(this._url(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dstr,
    })
    if (!res) return null

    const parsed = await this._parseJson(res)
    return { status: res.status, data: parsed as T }
  }

  async _put(id: string | number, data: T): Promise<CornbotAPIResponse<T> | null> {
    const dstr = JSON.stringify(data)
    const res = await this._fetch(this._url(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: dstr,
    })
    if (!res) return null

    const parsed = await this._parseJson(res)
    return { status: res.status, data: parsed as T }
  }

  async _patch(id: string | number, body: object): Promise<CornbotAPIResponse<T> | null> {
    const res = await this._fetch(this._url(id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res) return null

    const parsed = await this._parseJson(res)
    return { status: res.status, data: parsed as T }
  }

  async _delete(id: string | number): Promise<CornbotAPIResponse<T> | null> {
    const res = await this._fetch(this._url(id), { method: 'DELETE' })
    if (!res) return null

    const parsed = await this._parseJson(res)
    return { status: res.status, data: parsed as T }
  }

  async one(id: string | number): Promise<T | null> {
    const res = await this._fetch(this._url(id))
    return this._parseJson(res)
  }

  async all(): Promise<T[]> {
    const res = await this._fetch(this._url())
    if (!res) return []
    try {
      return await res.json() as T[]
    } catch {
      console.error(`Failed to parse JSON array from ${this._url()}`)
      return []
    }
  }

  async create(data: T): Promise<T | null> {
    const res = await this._post(data)
    return res?.data ?? null
  }

  async replace(id: string | number, data: T): Promise<T | null> {
    const res = await this._put(id, data)
    return res?.data ?? null
  }

  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    const res = await this._patch(id, data)
    return res?.data ?? null
  }
}
