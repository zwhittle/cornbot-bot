import("dotenv/config")
import { EmbedBuilder } from '@discordjs/builders'
import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { tourData } from '../data/tourdata'
import { ChatInputCommandInteraction } from 'discord.js'
import { formatDateLong } from '../utils/utils'
import { addTourSubcommands } from '../utils/commands'
import { parseISO } from 'date-fns'

const STATIC_URL = process.env.STATIC_URL as string

const command = () => {
  const slashCommandBuilder = new SlashCommandBuilder()
    .setName('viewshow')
    .setDescription('See attendees for a PTH tour date')

  return addTourSubcommands(slashCommandBuilder)
}

export const viewShow: Command = {
  data: command(),
  run: async (interaction) => {
    const chatInteraction = interaction as ChatInputCommandInteraction
    const tourInput = chatInteraction.options.getSubcommand()
    const showInputRaw = chatInteraction.options.getString('show')
    if (!showInputRaw) return
    const showInput = showInputRaw.replace(/_/g, ' ')

    const tour = tourData.find(tour => tour.key === tourInput)
    if (!tour) {
      await interaction.reply({ content: 'Tour not found.', ephemeral: true })
      return
    }
    const show = tour.dates.find(date => date.role === showInputRaw)
    if (!show) {
      await interaction.reply({ content: 'Show not found.', ephemeral: true })
      return
    }

    const guild = interaction.guild
    if (!guild) {
      await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true })
      return
    }
    const role = guild.roles.cache.find(r => r.name === showInput)
    let attendeesString = ''

    try {
      if (role) {
        const attendees = role.members
        attendees.forEach(a => (attendeesString += `<@${a.id}>\n`))
      }
    } catch (error) {
      console.log("Failed fetching role members.")

      const rolesString = guild.roles.cache.map(role => role.name).join(',\n')
      console.log(`Roles: ${rolesString}`)
    }

    if (attendeesString === '') attendeesString = 'No attendees from this Discord :('

    const venueString = show.venue.maps_url
      ? `[${show.venue.name}](${show.venue.maps_url})`
      : show.venue.name

    const embed = new EmbedBuilder()
      .setColor(0xff7500)
      .setTitle(show.name)
      .setDescription(tour.description)
      .setThumbnail('attachment://image.jpeg')
      .addFields(
        { name: 'Tour', value: tour.name },
        { name: 'Date', value: formatDateLong(parseISO(show.date)) },
        { name: 'Venue', value: venueString },
        { name: 'Attendees', value: attendeesString }
      )
      .setTimestamp()

    await interaction.reply({
      embeds: [embed],
      files: [{ attachment: STATIC_URL + tour.poster, name: 'image.jpeg' }],
      ephemeral: true,
    })
  },
}
