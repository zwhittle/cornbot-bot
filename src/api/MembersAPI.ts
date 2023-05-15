import { Collection, GuildMember } from 'discord.js'
import { Member } from '../interfaces/Member'
import { CornbotAPI } from './CornbotAPI'

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
}

const convertMember = (memberData: GuildMember): { id: string; data: Member } => {
  const convertedMember = Member.fromDiscord(memberData)
  return { id: convertedMember.id, data: convertedMember }
}
