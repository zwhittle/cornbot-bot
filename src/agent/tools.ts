import Anthropic from '@anthropic-ai/sdk'

export const AGENT_TOOLS: Anthropic.Tool[] = [
  {
    name: 'lookup_member',
    description:
      'Look up information about a server member by their Discord user ID. Returns their name, display name, corns count, birthday, pronouns, join date, and other profile info.',
    input_schema: {
      type: 'object' as const,
      properties: {
        user_id: {
          type: 'string',
          description: 'The Discord user ID to look up',
        },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'lookup_guild',
    description:
      'Look up information about the current Discord server/guild. Returns server name, member count, corn score, good/bad bot counts, and creation date.',
    input_schema: {
      type: 'object' as const,
      properties: {
        guild_id: {
          type: 'string',
          description: 'The Discord guild ID to look up',
        },
      },
      required: ['guild_id'],
    },
  },
  {
    name: 'give_corn',
    description:
      'Give a corn (increment corn count) to a server member. Use this when someone asks you to give corns to a user or when you want to reward someone.',
    input_schema: {
      type: 'object' as const,
      properties: {
        user_id: {
          type: 'string',
          description: 'The Discord user ID to give corn to',
        },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'tell_joke',
    description: 'Fetch a random joke. Optionally specify a category.',
    input_schema: {
      type: 'object' as const,
      properties: {
        category: {
          type: 'string',
          description: 'Joke category',
          enum: ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas', 'Any'],
        },
      },
      required: [],
    },
  },
  {
    name: 'get_tour_info',
    description:
      'Get information about concert tours and show dates. If tour_key is omitted, lists all tours. If provided, returns details for that specific tour.',
    input_schema: {
      type: 'object' as const,
      properties: {
        tour_key: {
          type: 'string',
          description: 'The key of a specific tour to look up (optional)',
        },
      },
      required: [],
    },
  },
  {
    name: 'todays_birthdays',
    description:
      'Check if any server members have a birthday today. Returns a list of members whose birthday is today.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
]
