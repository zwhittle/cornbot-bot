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
  {
    name: 'submit_feedback',
    description:
      'Submit feedback about the bot to the bot owner. Use when a user wants to give feedback or suggestions.',
    input_schema: {
      type: 'object' as const,
      properties: {
        comment: {
          type: 'string',
          description: 'The feedback comment',
        },
      },
      required: ['comment'],
    },
  },
  {
    name: 'submit_report',
    description:
      'Report a user for breaking a server rule. Note: reports submitted this way are visible in the channel. For private reports, users should use the /report slash command.',
    input_schema: {
      type: 'object' as const,
      properties: {
        user_id: {
          type: 'string',
          description: 'The Discord user ID of the user being reported',
        },
        reason: {
          type: 'string',
          description: 'The reason for the report',
        },
      },
      required: ['user_id', 'reason'],
    },
  },
]
