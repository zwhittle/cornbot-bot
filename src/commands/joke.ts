import { Command } from '../interfaces/Command'
import { Joke, JokeBLFlag, JokeCategory, JokeUrlOptions, fetchJoke } from '../utils/jokes'
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const joke: Command = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Tells a corny joke')
    .addStringOption(option =>
      option
        .setName('category')
        .setDescription('Pick a category (optional)')
        .addChoices(
          { name: 'Dark', value: 'Dark' },
          { name: 'Misc', value: 'Misc' },
          { name: 'Programming', value: 'Programming' },
          { name: 'Pun', value: 'Pun' },
          { name: 'Spooky', value: 'Spooky' },
          { name: 'Christmas', value: 'Christmas' }
        )
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option
        .setName('safesearch')
        .setDescription('Filter out explicit or offensive jokes (optional)')
        .setRequired(false)
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    const category = interaction.options.getString('category') as JokeCategory
    const safeBlacklist: JokeBLFlag[] = [
      'explicit',
      'nsfw',
      'political',
      'racist',
      'religious',
      'sexist',
    ]
    const safesearch = interaction.options.getBoolean('safesearch')
    const blacklist = safesearch ? safeBlacklist : undefined
    let joke: Joke
    if (category) joke = await fetchJoke([category], blacklist)
    else joke = await fetchJoke(undefined, blacklist)

    let content = ''
    if (joke.type === 'twopart') content = `${joke.setup}\n\n||${joke.delivery}||`
    else content = `${joke.joke}`
    await interaction.reply({ content: content, ephemeral: true })
  },
}
