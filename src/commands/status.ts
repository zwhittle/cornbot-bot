import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { Command } from '../interfaces/Command'

const startTime = Date.now()

export const status: Command = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check the bot status and health'),
  run: async (interaction) => {
    const uptime = Math.floor((Date.now() - startTime) / 1000)
    const hours = Math.floor(uptime / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = uptime % 60
    const uptimeStr = `${hours}h ${minutes}m ${seconds}s`

    const guildCount = interaction.client.guilds.cache.size

    let apiStatus = 'Unknown'
    try {
      const res = await fetch(process.env.API_DOMAIN as string)
      apiStatus = res.ok ? 'Healthy' : `Error (${res.status})`
    } catch {
      apiStatus = 'Unreachable'
    }

    const chatInteraction = interaction as ChatInputCommandInteraction
    await chatInteraction.reply({
      content: [
        `**Bot Status**`,
        `Uptime: ${uptimeStr}`,
        `Guilds: ${guildCount}`,
        `API: ${apiStatus}`,
        `Ping: ${interaction.client.ws.ping}ms`,
      ].join('\n'),
      ephemeral: true,
    })
  },
}
