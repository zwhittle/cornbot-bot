export interface AnalyticsEvent {
  id?: number
  type: string
  event: string
  guildId?: string
  channelId?: string
  memberId?: string
  timestamp?: Date
}
