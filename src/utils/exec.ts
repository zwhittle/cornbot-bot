import {
  Client,
  GuildScheduledEventCreateOptions,
  GuildScheduledEventPrivacyLevel,
} from 'discord.js'
import { tourData } from '../data/tourdata'
import { CORNSERV_ID } from './utils'

const STATIC_URL = process.env.STATIC_URL as string

export async function launchTour(client: Client, tourKey: string) {
  const cornserv = await client.guilds.fetch(CORNSERV_ID)
  const tour = tourData.find(t => t.key === tourKey)

  if (!tour) {
    console.error(`Tour not found: ${tourKey}`)
    return
  }

  const events: GuildScheduledEventCreateOptions[] = tour.dates.map(show => {
    const venue = show.venue
    const address = venue.address

    let description = `${tour.name}\n\n`
    description += `${venue.name}\n`
    if (address) {
      description += `${address.street}\n`
      description += `${address.city}, ${address.state_province} ${address.postal}\n`
    }
    if (venue.maps_url) description += `Maps Link: ${venue.maps_url}\n\n`
    if (show.ticket_url) description += `Tickets: ${show.ticket_url}`

    const startTime = show.time ? `${show.date}T${show.time}` : `${show.date}T20:00:00-04:00`

    return {
      name: show.name,
      scheduledStartTime: startTime,
      scheduledEndTime: `${show.date}T23:00:00-04:00`,
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
      entityType: 3 as const,
      description: description,
      entityMetadata: { location: venue.name },
      image: STATIC_URL + tour.poster,
    }
  })

  let created = 0
  for (const event of events) {
    try {
      const e = await cornserv.scheduledEvents.create(event)
      console.log(`${e.name} created`)
      created++
    } catch (error) {
      console.error(`Failed to create event ${event.name}:`, error)
    }
  }

  console.log(`${created}/${events.length} events created for ${tour.name}`)
}

export async function deleteAllEvents(client: Client) {
  const cornserv = await client.guilds.fetch(CORNSERV_ID)
  const events = await cornserv.scheduledEvents.fetch()
  let deleted = 0
  for (const [, event] of events) {
    try {
      await event.delete()
      console.log(`${event.name} deleted`)
      deleted++
    } catch (error) {
      console.error(`Failed to delete event ${event.name}:`, error)
    }
  }
  console.log(`${deleted} events deleted`)
}
