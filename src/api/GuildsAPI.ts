import { Collection, Guild as DiscordGuild } from 'discord.js'
import { Guild } from '../interfaces/Guild'
import { CornbotAPI } from './CornbotAPI'

export class GuildsAPI extends CornbotAPI<Guild> {
  constructor() {
    super('guilds')
  }

  sync(guildsData: Collection<string, DiscordGuild>) {
    this._sync(guildsData.map(guild => convertGuild(guild)))
  }

  async incrementGoodBotCount(id: string) {
    const guild = await this.one(id)
    await this.update(id, { goodBotCount: ++guild.goodBotCount })
  }

  async incrementBadBotCount(id: string) {
    const guild = await this.one(id)
    await this.update(id, { badBotCount: ++guild.badBotCount })
  }
}

const convertGuild = (guildData: DiscordGuild): { id: string; data: Guild } => {
  const convertedGuild = Guild.fromDiscord(guildData)
  return { id: convertedGuild.id, data: convertedGuild }
}
