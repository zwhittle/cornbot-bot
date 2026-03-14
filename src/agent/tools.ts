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
  {
    name: 'create_tour',
    description:
      'Create a new tour. Owner-only. Provide the tour metadata; dates can be added separately with add_tour_dates.',
    input_schema: {
      type: 'object' as const,
      properties: {
        key: {
          type: 'string',
          description: 'Unique identifier for the tour (e.g. "spring2026")',
        },
        name: {
          type: 'string',
          description: 'Display name of the tour',
        },
        description: {
          type: 'string',
          description: 'Short description of the tour',
        },
        poster: {
          type: 'string',
          description: 'Poster image filename (optional)',
        },
        active: {
          type: 'boolean',
          description: 'Whether the tour is currently active',
        },
      },
      required: ['key', 'name', 'description'],
    },
  },
  {
    name: 'add_tour_dates',
    description:
      'Add one or more dates to an existing tour. Owner-only. Each date needs a name, date, venue, and role name for Discord. Discord roles are automatically created and their IDs stored.',
    input_schema: {
      type: 'object' as const,
      properties: {
        tour_key: {
          type: 'string',
          description: 'The key of the tour to add dates to',
        },
        dates: {
          type: 'array',
          description: 'Array of tour dates to add',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Show name (e.g. "Toronto, ON")' },
              date: { type: 'string', description: 'Date in YYYY-MM-DD format' },
              time: { type: 'string', description: 'Time in HH:MM:SS format (optional)' },
              venue_name: { type: 'string', description: 'Venue name' },
              venue_maps_url: { type: 'string', description: 'Google Maps URL (optional)' },
              venue_street: { type: 'string', description: 'Street address (optional)' },
              venue_city: { type: 'string', description: 'City (optional)' },
              venue_state_province: { type: 'string', description: 'State or province (optional)' },
              venue_country: { type: 'string', description: 'Country code: US or CA (optional)' },
              venue_postal: { type: 'string', description: 'Postal code (optional)' },
              role: { type: 'string', description: 'Discord role name for attendance (e.g. "Toronto_2026")' },
              ticket_url: { type: 'string', description: 'Ticket purchase URL (optional)' },
            },
            required: ['name', 'date', 'venue_name', 'role'],
          },
        },
      },
      required: ['tour_key', 'dates'],
    },
  },
  {
    name: 'update_tour',
    description:
      'Update tour metadata or set it as active/inactive. Owner-only.',
    input_schema: {
      type: 'object' as const,
      properties: {
        tour_key: {
          type: 'string',
          description: 'The key of the tour to update',
        },
        name: { type: 'string', description: 'New display name (optional)' },
        description: { type: 'string', description: 'New description (optional)' },
        poster: { type: 'string', description: 'New poster filename (optional)' },
        active: { type: 'boolean', description: 'Set active status (optional)' },
      },
      required: ['tour_key'],
    },
  },
  {
    name: 'show_attendees',
    description:
      'Get the list of users attending a specific show.',
    input_schema: {
      type: 'object' as const,
      properties: {
        tour_key: {
          type: 'string',
          description: 'The tour key',
        },
        show_role: {
          type: 'string',
          description: 'The show role name (e.g. "Toronto_2022")',
        },
      },
      required: ['tour_key', 'show_role'],
    },
  },
  {
    name: 'user_shows',
    description:
      'Get the list of shows a user has attended or is planning to attend.',
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
]
