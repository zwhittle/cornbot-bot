import { MembersAPI } from '../api/MembersAPI'
import { GuildsAPI } from '../api/GuildsAPI'
import { fetchJoke, JokeCategory } from '../utils/jokes'
import { tourData } from '../data/tourdata'

export async function executeTool(
  toolName: string,
  toolInput: Record<string, unknown>
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

      default:
        return JSON.stringify({ error: `Unknown tool: ${toolName}` })
    }
  } catch (error) {
    console.error(`Tool execution error (${toolName}):`, error)
    return JSON.stringify({ error: `Failed to execute ${toolName}` })
  }
}
