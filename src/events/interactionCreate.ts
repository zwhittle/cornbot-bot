import { Interaction } from 'discord.js'
import { CommandList } from '../commands/_CommandList'
import { AnalyticsAPI } from '../api/AnalyticsAPI'

export async function interactionCreate(interaction: Interaction) {
  if (interaction.isCommand()) {
    for (const Command of CommandList) {
      if (interaction.commandName === Command.data.name) {
        Command.run(interaction).then(() => {
          new AnalyticsAPI()
            .create({
              type: 'command',
              event: interaction.commandName,
              guildId: interaction.guild.id,
              channelId: interaction.channel?.id,
              memberId: interaction.member.user.id,
            })
            .then(() => console.log(`Event logged`))
        })
        break
      }
    }
  }
}
