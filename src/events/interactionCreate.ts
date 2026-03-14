import { Interaction } from 'discord.js'
import { CommandMap } from '../commands/_CommandList'
import { AnalyticsAPI } from '../api/AnalyticsAPI'

export async function interactionCreate(interaction: Interaction) {
  if (interaction.isCommand()) {
    const command = CommandMap.get(interaction.commandName)

    if (!command) {
      console.warn(`Unknown command received: ${interaction.commandName}`)
      return
    }

    try {
      await command.run(interaction)

      new AnalyticsAPI()
        .create({
          type: 'command',
          event: interaction.commandName,
          guildId: interaction.guild?.id,
          channelId: interaction.channel?.id,
          memberId: interaction.member?.user?.id,
        })
        .then(() => console.log(`Event logged`))
        .catch(error => console.error('Failed to log analytics:', error))
    } catch (error) {
      console.error(`Error executing command ${interaction.commandName}:`, error)

      const errorMessage = { content: 'Something went wrong.', ephemeral: true }
      try {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorMessage)
        } else {
          await interaction.reply(errorMessage)
        }
      } catch {
        // Could not send error message to user
      }
    }
  } else {
    console.log(`Unhandled interaction type: ${interaction.type}`)
  }
}
