import { GuildMember } from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { Member } from '../interfaces/Member'
import { welcomeMessage } from '../utils/utils'

export async function guildMemberAdd(member: GuildMember) {
  const guild = member.guild
  await new MembersAPI()
    .create(Member.fromDiscord(member))
    .then(newMember =>
      guild.systemChannel
        .send(welcomeMessage(member))
        .then(message => console.log(`Sent message: ${message.content}`))
    )
    .catch(console.error)
}
