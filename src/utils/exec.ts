import {
  Client,
  GuildScheduledEventCreateOptions,
  GuildScheduledEventPrivacyLevel,
} from 'discord.js'
import { tourData } from '../data/tourdata'

export async function launchHalloween2023Tour(client: Client) {
  const cornserv = await client.guilds.fetch('847637234613878824')
  const halloweenTour = tourData.find(tour => tour.key === 'halloween2023')

  const events: GuildScheduledEventCreateOptions[] = []

  halloweenTour.dates.map(async show => {
    const venue = show.venue
    const address = venue.address

    let description = 'Halloween Is For Always - North America 2023 Tour\n'
    description += 'https://halloweenisforalways.com/\n\n'
    description += `${venue.name}\n`
    description += `${address.street}\n`
    description += `${address.city}, ${address.state_province} ${address.postal}\n`
    description += `Maps Link: ${venue.maps_url}\n\n`
    description += `Tickets: ${show.ticket_url}`

    console.log(`${show.date}T${show.time}`)

    const startTime = show.time ? `${show.date}T${show.time}` : `${show.date}T19:00:00-05:00`

    const showEvent: GuildScheduledEventCreateOptions = {
      name: show.name,
      scheduledStartTime: startTime,
      scheduledEndTime: `${show.date}T23:00:00-06:00`,
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
      entityType: 3,
      description: description,
      entityMetadata: { location: venue.name },
      image: halloweenTour.poster,
    }

    events.push(showEvent)
  })

  events.map(
    async event =>
      await cornserv.scheduledEvents.create(event).then(e => console.log(`${e.name} created`))
  )

  console.log(`${events.length} events created`)
}

export async function deleteAllEvents(client: Client) {
  const cornserv = await client.guilds.fetch('847637234613878824')
  const events = await cornserv.scheduledEvents.fetch()
  const count = events.entries.length
  events.map(event => event.delete().then(e => console.log(`${e.name} deleted`)))
  console.log(`${count} events deleted`)
}
