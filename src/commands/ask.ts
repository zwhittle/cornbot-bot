import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { ChatInputCommandInteraction } from 'discord.js'
import { FeedbacksAPI } from '../api/FeedbacksAPI'
import { submitFeedback } from '../utils/commands'
import { ChatbotAPI } from 'src/api/AskAPI'

type ChatResponse = {
  question: string
  answer: string
}

export const ask: Command = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask Cornbot a question!')
    .addStringOption(option =>
      option.setName('question').setDescription('Your question').setRequired(true)
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply()

    const submitterId = interaction.user.id
    const question = interaction.options.getString('question')
    const guildId = interaction.guildId
    const channelId = interaction.channelId

    const res = await fetch('http://127.0.0.1:5000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"question": "${question}"}`,
    })

    const data = await res.json()
    console.log(data)

     await interaction.editReply(data.answer)
  },
}
