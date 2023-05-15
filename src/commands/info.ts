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
  run: async (interaction: ChatInputCommandInteraction) => {
    if (interaction.options.getSubcommand() === 'member') {
      const target = interaction.options.getUser('member') ?? interaction.user
      new MembersAPI().one(target.id).then(async member => {
        await memberInfo(interaction, member)
      })
    } else if (interaction.options.getSubcommand() === 'server') {
      new GuildsAPI()
        .one(interaction.guild.id)
        .then(async guild => await serverInfo(interaction, guild))
    }
  },
}
