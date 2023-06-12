import { Client } from 'discord.js'
import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { AnalyticsAPI } from '../api/AnalyticsAPI'
import { CronJob } from 'cron'

export const ready = async (BOT: Client) => {
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()
  const analyticsAPI = new AnalyticsAPI()

  const connectedGuilds = BOT.guilds.cache

  analyticsAPI
    .create({
      type: 'event',
      event: 'ready',
    })
    .then(() => console.log(`Event logged`))

  console.log('Syncing Guilds...')
  guildsApi.sync(connectedGuilds)

  connectedGuilds.map(async connGuild => {
    await connGuild.members.fetch().then(members => {
      console.log(`Syncing ${connGuild.name} Members...`)
      membersApi.sync(members)
    })
  })

  const dailyBirthdayCheck = new CronJob('00 00 09 * * *', async () => {
    // This should run every day at 09:00:00
    const birthdayMembers = await membersApi.todaysBirthdays()
    let guildsWithBirthday = []
    birthdayMembers.map(member => {
      if (guildsWithBirthday.filter(element => element.id == member.guildId).length == 0) {
        guildsWithBirthday.push(member.guildId)
      }
    })

    guildsWithBirthday.map(async guildId => {
      const guildBirthdayMembers = birthdayMembers.filter(member => member.guildId === guildId)
      if (guildBirthdayMembers.length >= 1) {
        const guild = await BOT.guilds.fetch(guildId)
        const birthdayMembersString = birthdayMembers.map(member => `<@${member.id}>`).join(', ')
        const output = `Happy Birthday to ${birthdayMembersString}`
        guild.systemChannel.send(output)
      }
    })
  })

  dailyBirthdayCheck.start() // start
}
