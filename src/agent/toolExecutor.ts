import { Message } from 'discord.js'
import { MembersAPI } from '../api/MembersAPI'
import { GuildsAPI } from '../api/GuildsAPI'
import { FeedbacksAPI } from '../api/FeedbacksAPI'
import { ReportsAPI } from '../api/ReportsAPI'
import { fetchJoke, JokeCategory } from '../utils/jokes'
import { submitFeedback, submitReport } from '../utils/commands'
import { tourData } from '../data/tourdata'

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
        const member = await new MembersAPI().one(toolInput.user_id as string)
        if (!member) return JSON.stringify({ error: 'Member not found' })
        return JSON.stringify(member)
      }

      case 'lookup_guild': {
        const guild = await new GuildsAPI().one(toolInput.guild_id as string)
        if (!guild) return JSON.stringify({ error: 'Guild not found' })
        return JSON.stringify(guild)
      }

      case 'give_corn': {
        await new MembersAPI().incrementCorns(toolInput.user_id as string)
        return JSON.stringify({ success: true, message: 'Corn given!' })
      }

      case 'tell_joke': {
        const category = (toolInput.category as JokeCategory) || 'Any'
        const joke = await fetchJoke([category])
        if (!joke) return JSON.stringify({ error: 'Failed to fetch joke' })
        if (joke.type === 'single') {
          return JSON.stringify({ joke: joke.joke })
        }
        return JSON.stringify({ setup: joke.setup, delivery: joke.delivery })
      }

      case 'get_tour_info': {
        const tourKey = toolInput.tour_key as string | undefined
        if (tourKey) {
          const tour = tourData.find(t => t.key === tourKey)
          if (!tour) return JSON.stringify({ error: `Tour '${tourKey}' not found`, available: tourData.map(t => t.key) })
          return JSON.stringify(tour)
        }
        return JSON.stringify(
          tourData.map(t => ({
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

        const role = guild.roles.cache.find(r => r.name === showName)
        if (!role) return JSON.stringify({ error: `Role not found for show: ${showName}` })

        const member = await guild.members.fetch(context.message.author.id)
        if (member.roles.cache.some(r => r.name === role.name)) {
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

      case 'submit_feedback': {
        const comment = toolInput.comment as string
        const feedback = {
          submitterId: context.message.author.id,
          comment,
          guildId: context.message.guildId ?? '',
          channelId: context.message.channelId,
        }
        await new FeedbacksAPI().create(feedback)
        await submitFeedback(feedback, context.message.client)
        return JSON.stringify({ success: true, message: 'Feedback submitted!' })
      }

      case 'submit_report': {
        const reportedUserId = toolInput.user_id as string
        const reason = toolInput.reason as string
        const report = {
          reportedUserId,
          reason,
          reportedById: context.message.author.id,
          guildId: context.message.guildId ?? '',
          channelId: context.message.channelId,
          userSubmitted: true,
        }
        await new ReportsAPI().create(report)
        await submitReport(report, context.message.client)
        return JSON.stringify({ success: true, message: 'Report submitted.' })
      }

      default:
        return JSON.stringify({ error: `Unknown tool: ${toolName}` })
    }
  } catch (error) {
    console.error(`Tool execution error (${toolName}):`, error)
    return JSON.stringify({ error: `Failed to execute ${toolName}` })
  }
}
