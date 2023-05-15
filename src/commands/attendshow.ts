import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { tourData } from '../data/tourdata'
import { ChatInputCommandInteraction, GuildMember } from 'discord.js'

function command() {
  const slashCommandBuilder = new SlashCommandBuilder()
    .setName('attendshow')
    .setDescription(
      'Request a role that shows you attended (or are planning to attend) a PTH show.'
    )

  tourData.map(tour => {
    let choices = []
    tour.dates.map(date => choices.push({ name: date.name, value: date.role }))

    slashCommandBuilder.addSubcommand(subcommand =>
      subcommand
        .setName(tour.key)
        .setDescription(tour.description)
        .addStringOption(option =>
          option
            .setName('show')
            .setDescription('Which show?')
            .setRequired(true)
            .setChoices(...choices)
        )
    )
  })

  return slashCommandBuilder
}

export const attendShow: Command = {
  data: command(),
  run: async (interaction: ChatInputCommandInteraction) => {
    const show = interaction.options.getString('show').replace(/_/g, ' ')
    const guild = interaction.guild
    const role = guild.roles.cache.find(r => r.name === show)
    const guildMember = interaction.member as GuildMember

    if (guildMember.roles.cache.some(r => r.name === role.name)) {
      await guildMember.roles.remove(role)
      await interaction.reply({
        content: `${role.name} has been removed. Run this command again if you need to add it back.`,
        ephemeral: true,
      })
    } else {
      await guildMember.roles.add(role)
      await interaction.reply({
        content: `${role.name} has been added. Run this command again if you need to remove it.`,
        ephemeral: true,
      })
    }
  },
}
