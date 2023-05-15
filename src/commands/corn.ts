import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { MembersAPI } from '../api/MembersAPI'

export const corn: Command = {
  data: new SlashCommandBuilder().setName('corn').setDescription('Replies with corn!'),
  run: async interaction => {
    interaction
      .reply('🌽')
      .then(async () => await new MembersAPI().incrementCorns(interaction.user.id))
  },
}
