import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { ChatInputCommandInteraction } from 'discord.js'
import { FeedbacksAPI } from '../api/FeedbacksAPI'
import { submitFeedback } from '../utils/commands'

export const feedback: Command = {
  data: new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('Submit feedback to Cornman')
    .addStringOption(option =>
      option.setName('comment').setDescription('Your feedback comment').setRequired(true)
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    const submitterId = interaction.user.id
    const comment = interaction.options.getString('comment')
    const guildId = interaction.guildId
    const channelId = interaction.channelId

    new FeedbacksAPI()
      .create({
        submitterId: submitterId,
        comment: comment,
        guildId: guildId,
        channelId: channelId,
      })
      .then(newFeedback => submitFeedback(newFeedback, interaction.client))
      .then(
        async newFeedback =>
          await interaction.reply(`Your feedback '${newFeedback.comment}' has been submitted!`)
      )
  },
}
