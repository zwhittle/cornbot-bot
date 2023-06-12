import { Collection, GuildMember } from 'discord.js'
import { Member } from '../interfaces/Member'
import { CornbotAPI } from './CornbotAPI'
import { startOfToday } from 'date-fns'

export class MembersAPI extends CornbotAPI<Member> {
  constructor() {
    super('members')
  }

  sync(membersData: Collection<string, GuildMember>) {
    this._sync(membersData.map(guildMember => convertMember(guildMember)))
  }

  async incrementCorns(id: string) {
    const member = await this.one(id)
    await this.update(id, { corns: ++member.corns })
  }

  async todaysBirthdays() {
    const members = await this.all()
    return members.filter(
      member =>
        member.birthdayDay === startOfToday().getDate() &&
        member.birthdayMonth === startOfToday().getMonth() + 1
    )
  }
}

const convertMember = (memberData: GuildMember): { id: string; data: Member } => {
  const convertedMember = Member.fromDiscord(memberData)
  return { id: convertedMember.id, data: convertedMember }
}
