import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../interfaces/Command'
import { ChatInputCommandInteraction } from 'discord.js'
import { ReportsAPI } from '../api/ReportsAPI'
import { submitReport } from '../utils/commands'

export const report: Command = {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report a user for breaking a rule')
    .addUserOption(option =>
      option.setName('member').setDescription('Select a member to report.').setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Why are you reporting this person?')
        .setRequired(true)
        .addChoices(
          { name: 'Rule #1: Be respectful, civil, and welcoming', value: 'Rule #1' },
          {
            name: 'Rule #2: No Spam or self-promotion outside of the appropriate channel',
            value: 'Rule #2',
          },
          { name: 'Rule #3: No obscene or offensive content.', value: 'Rule #3' }
        )
    ),
  run: async (interaction) => {
    const chatInteraction = interaction as ChatInputCommandInteraction
    const reportedMember = chatInteraction.options.getUser('member')
    if (!reportedMember) {
      await interaction.reply('Could not find the specified member.')
      return
    }
    const reportedMemberId = reportedMember.id
    const reason = chatInteraction.options.getString('reason') ?? ''
    const reportingMemberId = interaction.user.id
    const guildId = interaction.guildId ?? ''
    const channelId = interaction.channelId

    const newReport = await new ReportsAPI().create({
      reportedUserId: reportedMemberId,
      reason: reason,
      reportedById: reportingMemberId,
      guildId: guildId,
      channelId: channelId,
      userSubmitted: true,
    })
    await submitReport(newReport, interaction.client)
    await interaction.reply(`Your report has been submitted!`)
  },
}
