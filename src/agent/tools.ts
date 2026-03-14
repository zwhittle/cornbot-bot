import Anthropic from '@anthropic-ai/sdk'

export const AGENT_TOOLS: Anthropic.Tool[] = [
  {
    name: 'lookup_member',
    description:
      'Look up information about a server member by their Discord user ID. Returns profile data from the API and live Discord info including roles, avatar, and account age.',
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
      'Look up information about the current Discord server/guild. Returns API data and live Discord info including roles, channels, boost status, and verification level.',
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
  {
    name: 'set_birthday',
    description:
      "Set a member's birthday. Use this when someone tells you their birthday.",
    input_schema: {
      type: 'object' as const,
      properties: {
        user_id: {
          type: 'string',
          description: 'The Discord user ID whose birthday to set',
        },
        month: {
          type: 'number',
          description: 'Birth month (1-12)',
        },
        day: {
          type: 'number',
          description: 'Birth day (1-31)',
        },
      },
      required: ['user_id', 'month', 'day'],
    },
  },
  {
    name: 'set_pronouns',
    description:
      "Set a member's preferred pronouns and update their Discord roles accordingly.",
    input_schema: {
      type: 'object' as const,
      properties: {
        user_id: {
          type: 'string',
          description: 'The Discord user ID whose pronouns to set',
        },
        pronouns: {
          type: 'string',
          description: 'The preferred pronouns',
          enum: [
            'none', 'any', 'he/him', 'she/her', 'they/them',
            'he/him or she/her', 'he/him or they/them',
            'she/her or he/him', 'she/her or they/them',
            'they/them or she/her', 'they/them or he/him',
          ],
        },
      },
      required: ['user_id', 'pronouns'],
    },
  },
  {
    name: 'attend_show',
    description:
      'Toggle attendance for a tour show. Adds the show role if the user does not have it, removes it if they do. Use get_tour_info first to find available shows and their role names.',
    input_schema: {
      type: 'object' as const,
      properties: {
        show_name: {
          type: 'string',
          description: 'The role name for the show (from tour date data, e.g. "Toronto_2022")',
        },
      },
      required: ['show_name'],
    },
  },
  {
    name: 'bot_status',
    description:
      'Check bot health and status. Returns uptime, guild count, API health, and WebSocket ping.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
]
