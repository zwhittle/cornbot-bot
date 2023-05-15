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
    )
    .addStringOption(option =>
      option
        .setName('public')
        .setDescription('Do you want to make your birthday public? (Default is "yes")')
        .setRequired(true)
        .addChoices({ name: 'yes', value: 'yes' }, { name: 'no', value: 'no' })
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    const day = interaction.options.getInteger('day')
    const month = interaction.options.getInteger('month')

    const validDay = day >= 1 && day <= 31
    const validMonth = month >= 1 && month <= 12

    if (validDay && validMonth) {
      new MembersAPI()
        .update(interaction.user.id, { birthdayMonth: month, birthdayDay: day })
        .then(async member => {
          await interaction.reply({
            content: `Your birthday has been saved! You can view your Fartcord profile by using the \`/info member\` command or right-clicking yourself and clicking on \`Apps > Member Info\`.`,
            ephemeral: true,
          })
        })
    } else {
      await interaction.reply({
        content: `Yeah, no. That's not a real date. Try again.`,
      })
    }
  },
}
