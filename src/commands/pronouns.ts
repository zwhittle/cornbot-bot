import {
  ChatInputCommandInteraction,
  GuildMemberRoleManager,
  SlashCommandBuilder,
} from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { Command } from '../interfaces/Command'

export const pronouns: Command = {
  data: new SlashCommandBuilder()
    .setName('pronouns')
    .setDescription('Edit info about yourself!')
    .addStringOption(option =>
      option
        .setName('pronouns')
        .setDescription('Select your preferred pronouns')
        .setRequired(true)
        .setChoices(
          { name: 'none', value: 'none' },
          { name: 'any', value: 'any' },
          { name: 'he/him', value: 'he/him' },
          { name: 'she/her', value: 'she/her' },
          { name: 'they/them', value: 'they/them' },
          { name: 'he/him or she/her', value: 'he/him or she/her' },
          { name: 'he/him or they/them', value: 'he/him or they/them' },
          { name: 'she/her or he/him', value: 'she/her or he/him' },
          { name: 'she/her or they/them', value: 'she/her or they/them' },
          { name: 'they/them or she/her', value: 'they/them or she/her' },
          { name: 'they/them or he/him', value: 'they/them or he/him' }
        )
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    const choice = interaction.options.getString('pronouns')
    const guildRoles = interaction.guild.roles.cache

    await new MembersAPI().update(interaction.user.id, { pronouns: choice })

    const sheRole = guildRoles.find(role => role.name === 'she/her')
    const heRole = guildRoles.find(role => role.name === 'he/him')
    const theyRole = guildRoles.find(role => role.name === 'they/them')

    const memberRoles = interaction.member.roles as GuildMemberRoleManager
    await memberRoles.remove([sheRole, heRole, theyRole])

    if (choice === 'any') await memberRoles.add([sheRole, heRole, theyRole])
    
    else {
      if (choice.includes('he/him')) await memberRoles.add(heRole)
      if (choice.includes('she/her')) await memberRoles.add(sheRole)
      if (choice.includes('they/them')) await memberRoles.add(theyRole)
    }

    await interaction.reply({
      content: `Your preferred pronouns have been saved! You can view your Fartcord profile by using the \`/info member\` command or right-clicking yourself and clicking on \`Apps > Member Info\`.`,
      ephemeral: true,
    })
  },
}
