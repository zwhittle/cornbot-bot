import { Guild } from "./Guild"
import { Member } from "./Member"

export interface Message {
    id: string
    authorId: string
    author?: Member
    guildId: string
    guild?: Guild
    channelId: string
    content: string
    discordCreatedAt: Date
    editable: boolean
    url: string
  }
  