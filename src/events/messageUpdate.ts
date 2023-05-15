import { Message, PartialMessage } from 'discord.js'
import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { UserReport } from '../interfaces/UserReport'
import { submitReport } from '../utils/commands'
import { badBotResponse, goodBotResponse } from '../utils/utils'

export async function messageUpdate(
  oldMessage: Message<boolean> | PartialMessage,
  newMessage: Message<boolean> | PartialMessage
) {
  const newContent = newMessage.content
  const botId = newMessage.client.user.id
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()

  const guild = await guildsApi.one(newMessage.guild.id)
  const member = await membersApi.one(newMessage.member.user.id)

  if (member.id != botId) {
    if (newContent.includes('🌽')) {
      newMessage
        .react('🌽')
        .then(value => membersApi.incrementCorns(member.id))
        .catch(console.error)
    }

    if (newContent.toLowerCase() === 'good bot') {
      newMessage
        .reply(goodBotResponse())
        .then(value => guildsApi.incrementGoodBotCount(guild.id))
        .catch(console.error)
    } else if (newContent.toLowerCase() === 'bad bot') {
      newMessage
        .reply(badBotResponse())
        .then(value => guildsApi.incrementBadBotCount(guild.id))
        .catch(console.error)
    }

    if (newContent.includes('@everyone')) {
      const report: UserReport = {
        reportedUserId: member.id,
        reason: '@everyone tagged in a message',
        reportedById: botId,
        guildId: guild.id,
        channelId: newMessage.channel.id,
        userSubmitted: false,
      }

      await submitReport(report, newMessage.client)
    }
  }
}
