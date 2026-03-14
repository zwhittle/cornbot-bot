import {
  Client,
  GuildScheduledEventCreateOptions,
  GuildScheduledEventPrivacyLevel,
} from 'discord.js'
import { tourData } from '../data/tourdata'
import { CORNSERV_ID } from './utils'

const STATIC_URL = process.env.STATIC_URL as string

export async function launchVolitionXTour(client: Client) {
  const cornserv = await client.guilds.fetch(CORNSERV_ID)
  const volitionTour = tourData.find(tour => tour.key === 'volition2024')
  if (!volitionTour) return

  const events: GuildScheduledEventCreateOptions[] = volitionTour.dates.map(show => {
    const venue = show.venue
    const address = venue.address

    let description = 'Volition X North America 2024\n\n'
    description += `${venue.name}\n`
    description += `${address?.street}\n`
    description += `${address?.city}, ${address?.state_province} ${address?.postal}\n`
    description += `Maps Link: ${venue.maps_url}\n\n`
    description += `Tickets: ${show.ticket_url}`

    const startTime = show.time ? `${show.date}T${show.time}` : `${show.date}T20:00:00-04:00`

    return {
      name: show.name,
      scheduledStartTime: startTime,
      scheduledEndTime: `${show.date}T23:00:00-07:00`,
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
      entityType: 3 as const,
      description: description,
      entityMetadata: { location: venue.name },
      image: STATIC_URL + volitionTour.poster,
    }
  })

  await Promise.all(events.map(async event => {
    const e = await cornserv.scheduledEvents.create(event)
    console.log(`${e.name} created`)
  }))
}

export async function launchHalloween2023Tour(client: Client) {
  const cornserv = await client.guilds.fetch('847637234613878824')
  const halloweenTour = tourData.find(tour => tour.key === 'halloween2023')
  if (!halloweenTour) return

  const events: GuildScheduledEventCreateOptions[] = halloweenTour.dates.map(show => {
    const venue = show.venue
    const address = venue.address

    let description = 'Halloween Is For Always - North America 2023 Tour\n'
    description += 'https://halloweenisforalways.com/\n\n'
    description += `${venue.name}\n`
    description += `${address?.street}\n`
    description += `${address?.city}, ${address?.state_province} ${address?.postal}\n`
    description += `Maps Link: ${venue.maps_url}\n\n`
    description += `Tickets: ${show.ticket_url}`

    console.log(`${show.date}T${show.time}`)

    const startTime = show.time ? `${show.date}T${show.time}` : `${show.date}T19:00:00-05:00`

    return {
      name: show.name,
      scheduledStartTime: startTime,
      scheduledEndTime: `${show.date}T23:00:00-06:00`,
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
      entityType: 3 as const,
      description: description,
      entityMetadata: { location: venue.name },
      image: STATIC_URL + halloweenTour.poster,
    }
  })

  await Promise.all(events.map(async event => {
    const e = await cornserv.scheduledEvents.create(event)
    console.log(`${e.name} created`)
  }))

  console.log(`${events.length} events created`)
}

export async function deleteAllEvents(client: Client) {
  const cornserv = await client.guilds.fetch(CORNSERV_ID)
  const events = await cornserv.scheduledEvents.fetch()
  const count = events.entries.length
  await Promise.all(events.map(async event => {
    const e = await event.delete()
    console.log(`${e.name} deleted`)
  }))
  console.log(`${count} events deleted`)
}
