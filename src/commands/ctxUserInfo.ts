import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { memberInfo } from '../utils/infoCommand'
import { Command } from '../interfaces/Command'

export const ctxUserInfo: Command = {
  data: new ContextMenuCommandBuilder()
    .setName('Member Information')
    .setType(ApplicationCommandType.User),
  run: async (interaction) => {
    const member = await new MembersAPI().one(interaction.user.id)
    await memberInfo(interaction, member)
  },
}
