import { GuildMember } from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { Member } from '../interfaces/Member'
import { welcomeMessage } from '../utils/utils'
import { AnalyticsAPI } from '../api/AnalyticsAPI'

export async function guildMemberAdd(member: GuildMember) {
  const guild = member.guild
  await new MembersAPI()
    .create(Member.fromDiscord(member))
    .then(newMember =>
      guild.systemChannel.send(welcomeMessage(member)).then(message => {
        console.log(`Sent message: ${message.content}`)
        new AnalyticsAPI()
          .create({
            type: 'event',
            event: 'memberAdd',
            guildId: guild.id,
            memberId: member.id,
          })
          .then(() => console.log(`Event logged`))
      })
    )
    .catch(console.error)
}
