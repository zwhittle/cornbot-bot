import { Message, PartialMessage } from 'discord.js'
import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { AnalyticsAPI } from '../api/AnalyticsAPI'
import { MessagesAPI } from '../api/MessagesAPI'
import { handleMessageReactions } from '../utils/messageReactions'

export async function messageUpdate(
  oldMessage: Message<boolean> | PartialMessage,
  newMessage: Message<boolean> | PartialMessage
) {
  if (!newMessage.guild || !newMessage.member) return

  const newContent = newMessage.content ?? ''
  const botId = newMessage.client.user.id
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()

  new MessagesAPI()
    .update(newMessage.id, { content: newMessage.content ?? undefined })
    .then(() => console.log(`Message logged`))
    .catch(error => console.error('Failed to log message update:', error))

  new AnalyticsAPI()
    .create({
      type: 'event',
      event: 'messageUpdate',
      guildId: newMessage.guild?.id,
      memberId: newMessage.author?.id,
      channelId: newMessage.channel?.id,
      messageId: newMessage.id
    })
    .then(() => console.log(`Event logged`))
    .catch(error => console.error('Failed to log analytics:', error))

  await handleMessageReactions(newMessage, newContent, botId, guildsApi, membersApi)
}
