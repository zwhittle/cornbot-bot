import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  UserContextMenuCommandInteraction,
} from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { memberInfo } from '../utils/infoCommand'
import { Command } from '../interfaces/Command'

export const ctxUserInfo: Command = {
  data: new ContextMenuCommandBuilder()
    .setName('Member Information')
    .setType(ApplicationCommandType.User),
  run: async (interaction) => {
    const ctx = interaction as UserContextMenuCommandInteraction
    const member = await new MembersAPI().one(ctx.targetId)
    if (!member) {
      await interaction.reply({ content: 'Could not find member information.', ephemeral: true })
      return
    }
    await memberInfo(interaction, member)
  },
}
