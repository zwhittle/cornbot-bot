import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { addTourSubcommands } from '../utils/commands'

function command() {
  const slashCommandBuilder = new SlashCommandBuilder()
    .setName('attendshow')
    .setDescription(
      'Request a role that shows you attended (or are planning to attend) a PTH show.'
    )

  return addTourSubcommands(slashCommandBuilder)
}

export const attendShow: Command = {
  data: command(),
  run: async (interaction) => {
    const chatInteraction = interaction as ChatInputCommandInteraction
    const showValue = chatInteraction.options.getString('show')
    if (!showValue || !interaction.guild) return
    const show = showValue.replace(/_/g, ' ')
    const guild = interaction.guild
    const role = guild.roles.cache.find(r => r.name === show)
    if (!role) {
      await interaction.reply({ content: 'Role not found for this show.', ephemeral: true })
      return
    }
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
