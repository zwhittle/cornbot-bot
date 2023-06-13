import { Message } from "./Message"

export interface AnalyticsEvent {
  id?: number
  type: string
  event: string
  guildId?: string
  channelId?: string
  memberId?: string
  messageId?: string
  message?: Message
  timestamp?: Date
}
