export interface UserReport {
  id?: number
  reportedUserId: string
  reason: string
  reportedById: string
  guildId: string
  channelId: string
  userSubmitted: boolean
}
