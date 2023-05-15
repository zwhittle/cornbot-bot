import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { tourData } from '../data/tourdata'
import { ChatInputCommandInteraction } from 'discord.js'
import { formatDateLong } from '../utils/utils'
import { parseISO } from 'date-fns'

const command = () => {
  const slashCommandBuilder = new SlashCommandBuilder()
    .setName('viewshow')
    .setDescription('See attendees for a PTH tour date')

  tourData.map(tour => {
    let choices = []
    tour.dates.map(date =>
      choices.push({
        name: date.name,
        value: date.role,
      })
    )

    slashCommandBuilder.addSubcommand(subcommand =>
      subcommand
        .setName(tour.key)
        .setDescription(tour.description)
        .addStringOption(option =>
          option
            .setName('show')
            .setDescription(tour.description)
            .setRequired(true)
            .setChoices(...choices)
        )
    )
  })

  return slashCommandBuilder
}

export const viewShow: Command = {
  data: command(),
  run: async (interaction: ChatInputCommandInteraction) => {
    const tourInput = interaction.options.getSubcommand()
    const showInputRaw = interaction.options.getString('show')
    const showInput = showInputRaw.replace(/_/g, ' ')

    const tour = tourData.find(tour => tour.key === tourInput)
    const show = tour.dates.find(date => date.role === showInputRaw)

    const guild = interaction.guild
    const role = guild.roles.cache.find(r => r.name === showInput)
    const attendees = role.members

    let attendeesString = ''
    attendees.map(a => (attendeesString += `<@${a.id}>\n`))
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
      files: [{ attachment: tour.poster, name: 'image.jpeg' }],
      ephemeral: true,
    })
  },
}
