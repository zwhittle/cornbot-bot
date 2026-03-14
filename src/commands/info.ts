import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { GuildsAPI } from '../api/GuildsAPI'
import { Command } from '../interfaces/Command'
import { memberInfo, serverInfo } from '../utils/infoCommand'

export const info: Command = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or server')
    .addSubcommand(subcommand =>
      subcommand
        .setName('member')
        .setDescription("View a member's profile")
        .addUserOption(option => option.setName('member').setDescription('the member'))
    )
    .addSubcommand(subcommand =>
      subcommand.setName('server').setDescription('Info about the server')
    ),
  run: async (interaction) => {
    const chatInteraction = interaction as ChatInputCommandInteraction
    if (chatInteraction.options.getSubcommand() === 'member') {
      const target = chatInteraction.options.getUser('member') ?? interaction.user
      const member = await new MembersAPI().one(target.id)
      await memberInfo(interaction, member)
    } else if (chatInteraction.options.getSubcommand() === 'server') {
      if (!interaction.guild) {
        await interaction.reply('This command can only be used in a server.')
        return
      }
      const guild = await new GuildsAPI().one(interaction.guild.id)
      await serverInfo(interaction, guild)
    }
  },
}
