import { Message } from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { GuildsAPI } from '../api/GuildsAPI'
import { ToursAPI } from '../api/ToursAPI'
import { TourDate, Address } from '../interfaces/Tour'
import { CORN_ID } from '../utils/utils'

export interface ToolContext {
  message: Message
}

const startTime = Date.now()

const VALID_PRONOUNS = [
  'none', 'any', 'he/him', 'she/her', 'they/them',
  'he/him or she/her', 'he/him or they/them',
  'she/her or he/him', 'she/her or they/them',
  'they/them or she/her', 'they/them or he/him',
]

const MAX_DAYS: Record<number, number> = {
  1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30,
  7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31,
}

export async function executeTool(
  toolName: string,
  toolInput: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  try {
    switch (toolName) {
      case 'lookup_member': {
        const userId = toolInput.user_id as string
        const member = await new MembersAPI().one(userId)
        if (!member) return JSON.stringify({ error: 'Member not found' })

        const result: Record<string, unknown> = { ...member }

        try {
          const guild = context.message.guild
          if (guild) {
            const discordMember = await guild.members.fetch(userId)
            result.roles = discordMember.roles.cache
              .filter(r => r.name !== '@everyone')
              .map(r => r.name)
            result.avatarURL = discordMember.user.displayAvatarURL()
            result.accountCreatedAt = discordMember.user.createdAt.toISOString()
          }
        } catch {
          // Discord data unavailable, return API data only
        }

        return JSON.stringify(result)
      }

      case 'lookup_guild': {
        const guildId = toolInput.guild_id as string
        const guild = await new GuildsAPI().one(guildId)
        if (!guild) return JSON.stringify({ error: 'Guild not found' })

        const result: Record<string, unknown> = { ...guild }

        try {
          const discordGuild = context.message.guild
          if (discordGuild && discordGuild.id === guildId) {
            result.channelCount = discordGuild.channels.cache.size
            result.roleCount = discordGuild.roles.cache.size
            result.boostLevel = discordGuild.premiumTier
            result.boostCount = discordGuild.premiumSubscriptionCount
            result.verificationLevel = discordGuild.verificationLevel
            const owner = await discordGuild.fetchOwner()
            result.owner = owner.user.username
          }
        } catch {
          // Discord data unavailable, return API data only
        }

        return JSON.stringify(result)
      }

      case 'get_tour_info': {
        const toursApi = new ToursAPI()
        const tourKey = toolInput.tour_key as string | undefined
        if (tourKey) {
          const tour = await toursApi.one(tourKey)
          if (!tour) {
            const allTours = await toursApi.all()
            return JSON.stringify({ error: `Tour '${tourKey}' not found`, available: allTours.map(t => t.key) })
          }
          return JSON.stringify(tour)
        }
        const allTours = await toursApi.all()
        return JSON.stringify(
          allTours.map(t => ({
            key: t.key,
            name: t.name,
            description: t.description,
            active: t.active,
            dateCount: t.dates.length,
          }))
        )
      }

      case 'todays_birthdays': {
        const birthdays = await new MembersAPI().todaysBirthdays()
        if (!birthdays.length) return JSON.stringify({ message: 'No birthdays today' })
        return JSON.stringify(birthdays)
      }

      case 'set_birthday': {
        const userId = toolInput.user_id as string
        const month = toolInput.month as number
        const day = toolInput.day as number
        const validMonth = month >= 1 && month <= 12
        const validDay = validMonth && day >= 1 && day <= (MAX_DAYS[month] ?? 31)
        if (!validMonth || !validDay) {
          return JSON.stringify({ error: 'Invalid date. Month must be 1-12 and day must be valid for that month.' })
        }
        await new MembersAPI().update(userId, { birthdayMonth: month, birthdayDay: day })
        return JSON.stringify({ success: true, message: 'Birthday saved!' })
      }

      case 'set_pronouns': {
        const userId = toolInput.user_id as string
        const pronouns = toolInput.pronouns as string
        if (!VALID_PRONOUNS.includes(pronouns)) {
          return JSON.stringify({ error: 'Invalid pronouns.', valid: VALID_PRONOUNS })
        }
        await new MembersAPI().update(userId, { pronouns })

        const guild = context.message.guild
        if (!guild) return JSON.stringify({ success: true, message: 'Pronouns saved (no guild context for role update).' })

        const guildRoles = guild.roles.cache
        const sheRole = guildRoles.find(role => role.name === 'she/her')
        const heRole = guildRoles.find(role => role.name === 'he/him')
        const theyRole = guildRoles.find(role => role.name === 'they/them')
        const pronounRoles = [sheRole, heRole, theyRole].filter((r): r is NonNullable<typeof r> => r !== undefined)

        const member = await guild.members.fetch(userId)
        await member.roles.remove(pronounRoles)

        if (pronouns === 'any') {
          await member.roles.add(pronounRoles)
        } else {
          if (pronouns.includes('he/him') && heRole) await member.roles.add(heRole)
          if (pronouns.includes('she/her') && sheRole) await member.roles.add(sheRole)
          if (pronouns.includes('they/them') && theyRole) await member.roles.add(theyRole)
        }

        return JSON.stringify({ success: true, message: `Pronouns set to ${pronouns} and roles updated.` })
      }

      case 'attend_show': {
        const showName = (toolInput.show_name as string).replace(/_/g, ' ')
        const guild = context.message.guild
        if (!guild) return JSON.stringify({ error: 'This can only be used in a server.' })

        // Try ID-based lookup first, fall back to name-based
        let foundRole: import('discord.js').Role | undefined
        const allTours = await new ToursAPI().all()
        for (const tour of allTours) {
          const tourDate = tour.dates.find(d => d.role.replace(/_/g, ' ') === showName)
          if (tourDate?.role_id) {
            foundRole = guild.roles.cache.get(tourDate.role_id)
            if (foundRole) break
          }
        }
        if (!foundRole) {
          foundRole = guild.roles.cache.find(r => r.name === showName)
        }
        if (!foundRole) return JSON.stringify({ error: `Role not found for show: ${showName}` })
        const role = foundRole

        const member = await guild.members.fetch(context.message.author.id)
        if (member.roles.cache.some(r => r.id === role.id)) {
          await member.roles.remove(role)
          return JSON.stringify({ success: true, message: `Removed ${role.name} role.`, action: 'removed' })
        } else {
          await member.roles.add(role)
          return JSON.stringify({ success: true, message: `Added ${role.name} role.`, action: 'added' })
        }
      }

      case 'bot_status': {
        const uptime = Math.floor((Date.now() - startTime) / 1000)
        const hours = Math.floor(uptime / 3600)
        const minutes = Math.floor((uptime % 3600) / 60)
        const seconds = uptime % 60

        const guildCount = context.message.client.guilds.cache.size
        const ping = context.message.client.ws.ping

        let apiStatus = 'Unknown'
        try {
          const res = await fetch(process.env.API_DOMAIN as string)
          apiStatus = res.ok ? 'Healthy' : `Error (${res.status})`
        } catch {
          apiStatus = 'Unreachable'
        }

        return JSON.stringify({
          uptime: `${hours}h ${minutes}m ${seconds}s`,
          guilds: guildCount,
          api: apiStatus,
          ping: `${ping}ms`,
        })
      }

      case 'create_tour': {
        if (context.message.author.id !== CORN_ID) {
          return JSON.stringify({ error: 'Only the bot owner can manage tours.' })
        }
        const tour = {
          key: toolInput.key as string,
          name: toolInput.name as string,
          description: toolInput.description as string,
          poster: (toolInput.poster as string) ?? '',
          active: (toolInput.active as boolean) ?? true,
          dates: [],
        }
        const created = await new ToursAPI().create(tour)
        if (!created) return JSON.stringify({ error: 'Failed to create tour.' })
        return JSON.stringify({ success: true, message: `Tour '${tour.name}' created.`, tour: created })
      }

      case 'add_tour_dates': {
        if (context.message.author.id !== CORN_ID) {
          return JSON.stringify({ error: 'Only the bot owner can manage tours.' })
        }
        const toursApi = new ToursAPI()
        const tourKey = toolInput.tour_key as string
        const tour = await toursApi.one(tourKey)
        if (!tour) return JSON.stringify({ error: `Tour '${tourKey}' not found.` })

        const rawDates = toolInput.dates as Array<Record<string, unknown>>
        const newDates: TourDate[] = rawDates.map(d => {
          const address: Address | undefined =
            d.venue_street && d.venue_city && d.venue_state_province && d.venue_country && d.venue_postal
              ? {
                  street: d.venue_street as string,
                  city: d.venue_city as string,
                  state_province: d.venue_state_province as string,
                  country: d.venue_country as 'US' | 'CA',
                  postal: d.venue_postal as string,
                }
              : undefined

          return {
            name: d.name as string,
            date: d.date as string,
            time: d.time as string | undefined,
            venue: {
              name: d.venue_name as string,
              address,
              maps_url: d.venue_maps_url as string | undefined,
            },
            role: d.role as string,
            ticket_url: d.ticket_url as string | undefined,
          }
        })

        // Auto-create Discord roles for each new date
        const guild = context.message.guild
        if (guild) {
          for (const date of newDates) {
            const roleName = date.role.replace(/_/g, ' ')
            const existingRole = guild.roles.cache.find(r => r.name === roleName)
            if (existingRole) {
              date.role_id = existingRole.id
            } else {
              const newRole = await guild.roles.create({ name: roleName })
              date.role_id = newRole.id
            }
          }
        }

        tour.dates.push(...newDates)
        const updated = await toursApi.replace(tourKey, tour)
        if (!updated) return JSON.stringify({ error: 'Failed to update tour with new dates.' })
        return JSON.stringify({ success: true, message: `Added ${newDates.length} date(s) to '${tour.name}'. Discord roles created.`, tour: updated })
      }

      case 'update_tour': {
        if (context.message.author.id !== CORN_ID) {
          return JSON.stringify({ error: 'Only the bot owner can manage tours.' })
        }
        const toursApi = new ToursAPI()
        const tourKey = toolInput.tour_key as string
        const tour = await toursApi.one(tourKey)
        if (!tour) return JSON.stringify({ error: `Tour '${tourKey}' not found.` })

        if (toolInput.name !== undefined) tour.name = toolInput.name as string
        if (toolInput.description !== undefined) tour.description = toolInput.description as string
        if (toolInput.poster !== undefined) tour.poster = toolInput.poster as string
        if (toolInput.active !== undefined) tour.active = toolInput.active as boolean

        const updated = await toursApi.replace(tourKey, tour)
        if (!updated) return JSON.stringify({ error: 'Failed to update tour.' })
        return JSON.stringify({ success: true, message: `Tour '${tour.name}' updated.`, tour: updated })
      }

      default:
        return JSON.stringify({ error: `Unknown tool: ${toolName}` })
    }
  } catch (error) {
    console.error(`Tool execution error (${toolName}):`, error)
    return JSON.stringify({ error: `Failed to execute ${toolName}` })
  }
}
