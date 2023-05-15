import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ContextMenuCommandInteraction,
} from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { memberInfo } from '../utils/infoCommand'
import { Command } from '../interfaces/Command'

export const ctxUserInfo: Command = {
  data: new ContextMenuCommandBuilder()
    .setName('Member Information')
    .setType(ApplicationCommandType.User),
  run: async (interaction: ContextMenuCommandInteraction) => {
    new MembersAPI().one(interaction.targetId).then(async member => {
      await memberInfo(interaction, member)
    })
  },
}
