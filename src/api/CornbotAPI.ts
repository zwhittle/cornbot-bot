import * as dotenv from 'dotenv'
dotenv.config()

export interface CornbotAPIResponse {
  status: number
  data: any
}

export class CornbotAPI<T> {
  apiKey: string
  path: string
  baseUrl = process.env.API_DOMAIN as string

  constructor(path: string, apiKey?: string) {
    this.apiKey = apiKey ?? 'not yet implemented'
    this.path = path
  }

  _url(id?: string | number): string {
    let prefix = '/'
    let url = this.baseUrl + prefix + this.path

    if (id) url += '/' + id

    return url
  }

  _sync(items: { id: string | number; data: T }[]) {
    items.map(async item => {
      const id = item.id
      const data = item.data
      const logTag = `${id}`

      console.log(`Creating ${logTag}...`)
      const postRes = await this._post(data)
      if (postRes.status === 200) console.log(`${logTag} Created`)
      else {
        console.log(`${logTag} already exists. Updating...`)
        const putRes = await this._put(id, data)
        if (putRes.status != 200) console.error(putRes)
        else console.log(`${logTag} Updated`)
      }
    })
  }

  async _post(data: T): Promise<CornbotAPIResponse> {
    const dstr = JSON.stringify(data)
    console.log(dstr)
    const res = await fetch(this._url(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dstr,
    })

    return { status: res.status, data: res.json() as T }
  }

  async _put(id: string | number, data: T): Promise<CornbotAPIResponse> {
    const dstr = JSON.stringify(data)
    const res = await fetch(this._url(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: dstr,
    })
    return { status: res.status, data: res.json() as T }
  }

  async _patch(id: string | number, body: object): Promise<CornbotAPIResponse> {
    const res = await fetch(this._url(id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return { status: res.status, data: res.json() as T }
  }

  async _delete(id: string | number): Promise<CornbotAPIResponse> {
    const res = await fetch(this._url(id), { method: 'DELETE' })
    return { status: res.status, data: res.json() as T }
  }

  async one(id: string | number): Promise<T> {
    const res = await fetch(this._url(id))
    return res.json()
  }

  async all(): Promise<T[]> {
    const res = await fetch(this._url())
    return res.json()
  }

  async create(data: T): Promise<T> {
    const res = await this._post(data)
    return res.data
  }

  async replace(id: string | number, data: T): Promise<T> {
    const res = await this._put(id, data)
    return res.data
  }

  async update(id: string | number, data: any): Promise<T> {
    const res = await this._patch(id, data)
    console.log(id, data, res)
    return res.data
  }
}
