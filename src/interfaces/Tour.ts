export interface Address {
  street: string
  city: string
  state_province: string
  country: 'US' | 'CA'
  postal: string
}

export interface Venue {
  name: string
  address?: Address
  maps_url?: string
}

export interface TourDate {
  name: string
  date: string
  time?: string
  venue: Venue
  role: string
  ticket_url?: string
}

export interface Tour {
  key: string
  name: string
  description: string
  poster: string
  active: boolean
  dates: TourDate[]
}
