import { Guild as DiscordGuild } from 'discord.js'

export class Guild {
  id: string
  name: string
  description: string
  joinedAt: Date
  discordCreatedAt: Date
  memberCount: number
  cornScore: number
  goodBotCount: number
  badBotCount: number
  icon: string

  constructor(
    id: string,
    name: string,
    description: string,
    joinedAt: Date,
    discordCreatedAt: Date,
    memberCount: number,
    cornScore: number,
    goodBotCount: number,
    badBotCount: number,
    icon: string
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.joinedAt = joinedAt
    this.discordCreatedAt = discordCreatedAt
    this.memberCount = memberCount
    this.cornScore = cornScore
    this.goodBotCount = goodBotCount
    this.badBotCount = badBotCount
    this.icon = icon
  }

  static fromDiscord(guildData: DiscordGuild) {
    return new this(
      guildData.id,
      guildData.name,
      guildData.description,
      guildData.joinedAt,
      guildData.createdAt,
      guildData.memberCount,
      0,
      0,
      0,
      guildData.iconURL()
    )
  }
}
