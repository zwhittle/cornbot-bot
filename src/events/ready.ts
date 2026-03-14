import { Client } from 'discord.js'
import { GuildsAPI } from '../api/GuildsAPI'
import { MembersAPI } from '../api/MembersAPI'
import { ToursAPI } from '../api/ToursAPI'
import { AnalyticsAPI } from '../api/AnalyticsAPI'
import { tourData } from '../data/tourdata'
import { CronJob } from 'cron'

export const ready = async (BOT: Client) => {
  const guildsApi = new GuildsAPI()
  const membersApi = new MembersAPI()
  const analyticsAPI = new AnalyticsAPI()

  const connectedGuilds = BOT.guilds.cache

  // analyticsAPI
  //   .create({
  //     type: 'event',
  //     event: 'ready',
  //   })
  //   .then(() => console.log(`Event logged`))

  console.log('Syncing Guilds...')
  guildsApi.sync(connectedGuilds)

  console.log('Syncing Tours...')
  new ToursAPI().sync(tourData)

  await Promise.all(connectedGuilds.map(async connGuild => {
    const members = await connGuild.members.fetch()
    console.log(`Syncing ${connGuild.name} Members...`)
    await membersApi.sync(members)
  }))

  const dailyBirthdayCheck = new CronJob('00 00 08 * * *', async () => {
    // This should run every day at 08:00:00 UTC
    const birthdayMembers = await membersApi.todaysBirthdays()
    const guildsWithBirthday: string[] = []
    birthdayMembers.forEach(member => {
      if (!guildsWithBirthday.includes(member.guildId)) {
        guildsWithBirthday.push(member.guildId)
      }
    })

    await Promise.all(guildsWithBirthday.map(async guildId => {
      const guildBirthdayMembers = birthdayMembers.filter(member => member.guildId === guildId)
      if (guildBirthdayMembers.length >= 1) {
        const guild = await BOT.guilds.fetch(guildId)
        const birthdayMembersString = guildBirthdayMembers.map(member => `<@${member.id}>`).join(', ')
        const output = `Happy Birthday to ${birthdayMembersString}!`
        if (guild.systemChannel) {
          guild.systemChannel.send(output)
        }
      }
    }))
  })

  dailyBirthdayCheck.start() // start
}
