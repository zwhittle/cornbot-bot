import { Message, PartialMessage } from 'discord.js'
import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { UserReport } from '../interfaces/UserReport'
import { submitReport } from './commands'
import { badBotResponse, goodBotResponse } from './utils'

export async function handleMessageReactions(
  message: Message<boolean> | PartialMessage,
  content: string,
  botId: string,
  guildsApi: GuildsAPI,
  membersApi: MembersAPI
) {
  if (!message.member || !message.guild) return

  const guild = await guildsApi.one(message.guild.id)
  const member = await membersApi.one(message.member.user.id)
  if (!guild || !member) return

  if (member.id !== botId) {
    if (content.includes('🌽')) {
      message
        .react('🌽')
        .then(() => membersApi.incrementCorns(member.id))
        .catch(console.error)
    }

    if (content.toLowerCase() === 'good bot') {
      message
        .reply(goodBotResponse())
        .then(() => guildsApi.incrementGoodBotCount(guild.id))
        .catch(console.error)
    } else if (content.toLowerCase() === 'bad bot') {
      message
        .reply(badBotResponse())
        .then(() => guildsApi.incrementBadBotCount(guild.id))
        .catch(console.error)
    }

    if (content.includes('@everyone')) {
      const report: UserReport = {
        reportedUserId: member.id,
        reason: '@everyone tagged in a message',
        reportedById: botId,
        guildId: guild.id,
        channelId: message.channel.id,
        userSubmitted: false,
      }

      await submitReport(report, message.client)
    }
  }
}
