import { GuildMember } from 'discord.js'

export class Member {
  id: string
  name: string
  avatar: string
  displayHexColor: string
  displayName: string
  nickname: string
  pending: boolean
  premiumSince: Date
  guildId: string
  pronouns: string
  birthdayMonth: number
  birthdayDay: number
  birthdayPublic: Boolean
  joinedAt: Date
  corns: number

  constructor(
    id: string,
    name: string,
    avatar: string,
    displayHexColor: string,
    displayName: string,
    nickname: string,
    pending: boolean,
    premiumSince: Date,
    guildId: string,
    pronouns: string,
    birthdayMonth: number,
    birthdayDay: number,
    birthdayPublic: Boolean,
    joinedAt: Date,
    corns: number
  ) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.displayHexColor = displayHexColor
    this.displayName = displayName
    this.nickname = nickname
    this.pending = pending
    this.premiumSince = premiumSince
    this.guildId = guildId
    this.pronouns = pronouns
    this.birthdayMonth = birthdayMonth
    this.birthdayDay = birthdayDay
    this.birthdayPublic = birthdayPublic
    this.joinedAt = joinedAt
    this.corns = corns
  }

  static fromDiscord(memberData: GuildMember) {
    return new this(
      memberData.id,
      memberData.user.username,
      memberData.user.avatarURL(),
      memberData.displayHexColor,
      memberData.displayName,
      memberData.nickname,
      memberData.pending,
      memberData.premiumSince,
      memberData.guild.id,
      'None saved',
      undefined,
      undefined,
      false,
      memberData.joinedAt,
      0
    )
  }
}
