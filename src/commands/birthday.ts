import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { Command } from '../interfaces/Command'

export const birthday: Command = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Save your birthday to your Fartcord profile.')
    .addIntegerOption(option =>
      option
        .setName('day')
        .setDescription('Enter a number 1-31 for your birthday day')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('month')
        .setDescription(
          'Enter a number 1-12 for your birthday month (January is 1, February is 2, etc.)'
        )
        .setRequired(true)
    ),
  run: async (interaction) => {
    const chatInteraction = interaction as ChatInputCommandInteraction
    const day = chatInteraction.options.getInteger('day')
    const month = chatInteraction.options.getInteger('month')

    if (day === null || month === null) {
      await interaction.reply({ content: 'Day and month are required.' })
      return
    }

    const validMonth = month >= 1 && month <= 12
    const maxDays: Record<number, number> = {
      1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30,
      7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31,
    }
    const validDay = validMonth && day >= 1 && day <= (maxDays[month] ?? 31)

    if (validDay && validMonth) {
      await new MembersAPI().update(interaction.user.id, { birthdayMonth: month, birthdayDay: day })
      await interaction.reply({
        content: `Your birthday has been saved! You can view your Fartcord profile by using the \`/info member\` command or right-clicking yourself and clicking on \`Apps > Member Info\`.`,
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        content: `Yeah, no. That's not a real date. Try again.`,
      })
    }
  },
}
