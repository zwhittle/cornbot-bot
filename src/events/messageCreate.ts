import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { Message } from 'discord.js'
import { submitReport } from '../utils/commands'
import { UserReport } from '../interfaces/UserReport'
import { CORN_ID, badBotResponse, goodBotResponse } from '../utils/utils'
import { deleteAllEvents, launchHalloween2023Tour, launchVolitionXTour } from '../utils/exec'
import { AnalyticsAPI } from '../api/AnalyticsAPI'
import { MessagesAPI } from '../api/MessagesAPI'

export async function messageCreate(message: Message<boolean>) {
  const content = message.content
  const botId = message.client.user.id
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()

  new MessagesAPI()
    .create({
      id: message.id,
      authorId: message.author.id,
      guildId: message.guildId,
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
    })

  if (!message.guild && message.author.id === CORN_ID) {
    console.log(message.content, message.cleanContent)
    if (message.cleanContent.startsWith('exec')) {
      const command = message.content.substring(5)

      if (command === 'reboot') process.exit()
      else if (command === 'test') await message.reply(`test`)
      else if (command === 'launch halloween tour') {
        await launchHalloween2023Tour(message.client)
      }
      else if (command === 'launch volition x tour') {
        await launchVolitionXTour(message.client)
      } else if (command === 'delete all events') {
        await deleteAllEvents(message.client)
      }
    }
    return
  }

  if (message.member && message.guild) {
    const guild = await guildsApi.one(message.guild.id)
    const member = await membersApi.one(message.member.user.id)

    if (member.id != botId) {
      if (content.includes('🌽')) {
        message
          .react('🌽')
          .then(value => membersApi.incrementCorns(member.id))
          .catch(console.error)
      }

      if (content.toLowerCase() === 'good bot') {
        message
          .reply(goodBotResponse())
          .then(value => guildsApi.incrementGoodBotCount(guild.id))
          .catch(console.error)
      } else if (content.toLowerCase() === 'bad bot') {
        message
          .reply(badBotResponse())
          .then(value => guildsApi.incrementBadBotCount(guild.id))
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
}
