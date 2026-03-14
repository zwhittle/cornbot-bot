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
  run: async (interaction) => {
    const chatInteraction = interaction as ChatInputCommandInteraction
    const submitterId = interaction.user.id
    const comment = chatInteraction.options.getString('comment') ?? ''
    const guildId = interaction.guildId ?? ''
    const channelId = interaction.channelId

    const newFeedback = await new FeedbacksAPI().create({
      submitterId: submitterId,
      comment: comment,
      guildId: guildId,
      channelId: channelId,
    })
    const submittedFeedback = await submitFeedback(newFeedback, interaction.client)
    await interaction.reply(`Your feedback '${submittedFeedback.comment}' has been submitted!`)
  },
}
