import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { Message } from 'discord.js'
import { CORN_ID } from '../utils/utils'
import { deleteAllEvents, launchTour } from '../utils/exec'
import { AnalyticsAPI } from '../api/AnalyticsAPI'
import { MessagesAPI } from '../api/MessagesAPI'
import { handleMessageReactions } from '../utils/messageReactions'

export async function messageCreate(message: Message<boolean>) {
  const content = message.content
  const botId = message.client.user.id
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()

  new MessagesAPI()
    .create({
      id: message.id,
      authorId: message.author.id,
      guildId: message.guildId ?? '',
      channelId: message.channelId,
      content: message.content,
      discordCreatedAt: message.createdAt,
      editable: message.editable,
      url: message.url,
    })
    .then(() => {
      console.log(`Message logged`)

      new AnalyticsAPI()
        .create({
          type: 'event',
          event: 'messageCreate',
          guildId: message.guild?.id,
          channelId: message.channel?.id,
          memberId: message.author?.id,
          messageId: message.id,
        })
        .then(() => console.log(`Event logged`))
        .catch(error => console.error('Failed to log analytics:', error))
    })
    .catch(error => console.error('Failed to log message:', error))

  if (!message.guild && message.author.id === CORN_ID) {
    console.log(message.content, message.cleanContent)
    if (message.cleanContent.startsWith('exec')) {
      const command = message.content.substring(5)

      if (command === 'reboot') process.exit()
      else if (command === 'test') await message.reply(`test`)
      else if (command.startsWith('launch ')) {
        const tourKey = command.substring(7).trim()
        await launchTour(message.client, tourKey)
      } else if (command === 'delete all events') {
        await deleteAllEvents(message.client)
      }
    }
    return
  }

  await handleMessageReactions(message, content, botId, guildsApi, membersApi)
}
