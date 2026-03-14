# CLAUDE.md

## Project Overview

Cornbot is a Discord bot for the FartCord server, built as a TypeScript rewrite of an older Node.js version. Most user-facing functionality is delivered through an AI-powered conversational agent (Claude Sonnet 4) that responds when @mentioned or replied to. The bot also syncs guild/member data with a backend API, logs messages and analytics, and manages concert tour event announcements.

## Tech Stack

- **Runtime**: Node.js 16 (Docker) / ts-node for development
- **Language**: TypeScript (strict mode, target ES2018, CommonJS modules)
- **Framework**: discord.js v14
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`) — Claude Sonnet 4 powers the conversational agent with 13 tools
- **HTTP**: `axios` for API calls, `node-fetch` v2 as fetch polyfill
- **Scheduling**: `cron` for recurring tasks (daily birthday announcements at 08:00 UTC)
- **Date handling**: `date-fns`
- **Deployment**: Heroku (Procfile worker) or Docker

## Project Structure

```
src/
├── cornbot.ts              # Main entry point - creates Discord client, registers event handlers
├── deployCommands.ts       # Utility to register slash commands with Discord API
├── agent/                  # Claude AI conversational agent
│   ├── index.ts            # Exports handleAgentMessage
│   ├── agentHandler.ts     # Agentic loop using Claude Sonnet 4 (claude-sonnet-4-20250514)
│   ├── tools.ts            # 13 agent tool definitions with input schemas
│   └── toolExecutor.ts     # Executes agent tool calls against backend APIs
├── api/                    # API client layer for backend communication
│   ├── CornbotAPI.ts       # Generic base class with CRUD operations
│   ├── MembersAPI.ts       # Member endpoints (incrementCorns, todaysBirthdays)
│   ├── GuildsAPI.ts        # Guild endpoints (incrementGoodBotCount/BadBotCount)
│   ├── ToursAPI.ts         # Concert tour CRUD and sync
│   ├── AttendanceAPI.ts    # Show attendance tracking (byUser, byShow, findRecord)
│   ├── AnalyticsAPI.ts     # Analytics event tracking
│   ├── FeedbacksAPI.ts     # Feedback submission
│   ├── ReportsAPI.ts       # User reports
│   └── MessagesAPI.ts      # Message logging
├── commands/               # Slash command implementations (most moved to agent tools)
│   ├── _CommandList.ts     # Command registry
│   ├── feedback.ts         # /feedback command
│   └── report.ts           # /report command
├── events/                 # Discord event handlers
│   ├── ready.ts            # Bot startup: guild/member sync, tour sync, birthday cron job
│   ├── interactionCreate.ts# Routes slash commands to handlers
│   ├── messageCreate.ts    # Message logging, auto-reactions, exec commands, agent trigger
│   ├── messageUpdate.ts    # Tracks message edits
│   └── guildMemberAdd.ts   # Welcome messages for new members
├── interfaces/             # TypeScript type definitions
│   ├── Command.ts          # Command interface (data + run)
│   ├── Member.ts           # Member model with fromDiscord() factory
│   ├── Guild.ts            # Guild model with fromDiscord() factory
│   ├── Message.ts          # Message model
│   ├── Tour.ts             # Tour, TourDate, Venue, Address models
│   ├── Attendance.ts       # Show attendance model
│   ├── Feedback.ts         # Feedback model
│   ├── UserReport.ts       # User report model
│   └── AnalyticsEvent.ts   # Analytics event model
├── utils/                  # Helper functions
│   ├── validateEnv.ts      # Environment variable validation
│   ├── utils.ts            # Welcome messages, good/bad bot responses, date formatting
│   ├── exec.ts             # Owner-only exec commands (tour launches, event management)
│   ├── commands.ts         # Feedback/report submission helpers
│   ├── jokes.ts            # JokeAPI integration
│   ├── infoCommand.ts      # Member/server info embed builders
│   └── messageReactions.ts # Auto-reactions (corn emoji, good/bad bot, @everyone reports)
├── data/
│   └── tourdata.ts         # Tour seed data (venues, dates, roles)
└── config/
    └── IntentOptions.ts    # Discord gateway intents (Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, DirectMessageReactions)
```

## Commands

```bash
npm run dev        # Run bot locally with ts-node
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled bot from dist/
npm run deploy     # Register slash commands with Discord API
```

There are no test or lint commands configured.

## Environment Variables

Required in `.env` (never committed):
- `BOT_TOKEN` / `DISCORD_TOKEN` — Discord bot authentication token
- `CLIENT_ID` — Discord application client ID (for command registration)
- `API_DOMAIN` — Backend API base URL
- `STATIC_URL` — URL prefix for tour poster images
- `ANTHROPIC_API_KEY` — API key for Claude AI agent

Optional (have defaults):
- `OWNER_ID` — Bot owner's Discord user ID (defaults to hardcoded value; used for exec commands)
- `GUILD_ID` — Primary guild ID (defaults to FartCord server ID; used for tour launches)

## Key Patterns

### AI Agent (Primary Interface)

The agent is the primary way users interact with the bot. When @mentioned or replied to, `messageCreate` triggers the Claude agent (`src/agent/`). The agent runs an agentic tool-use loop with 13 tools:

- `lookup_member` — Look up member info
- `lookup_guild` — Look up guild/server info
- `give_corn` — Give corns (server currency) to a member
- `tell_joke` — Tell a random joke
- `get_tour_info` — Get concert tour information
- `todays_birthdays` — Check today's birthdays
- `set_birthday` — Set a member's birthday
- `set_pronouns` — Set a member's pronouns
- `attend_show` — Mark attendance at a show
- `bot_status` — Check bot health/status
- `create_tour` — Create a new tour
- `add_tour_dates` — Add dates to an existing tour
- `update_tour` — Update tour details
- `show_attendees` — List attendees for a show
- `user_shows` — List shows a user is attending
- Built-in `web_search` — Web search for venue lookups

The agent fetches the last 20 channel messages for conversational context and includes guild/user info in its system prompt.

### Slash Commands

Only `/feedback` and `/report` remain as traditional slash commands. Most functionality was migrated to agent tools for a more natural conversational interface. Each command exports an object matching the `Command` interface with `data` (SlashCommandBuilder) and `run` (async handler). Commands are registered in `src/commands/_CommandList.ts`.

### API Layer

`CornbotAPI<T>` is a generic base class providing CRUD operations (`_post`, `_put`, `_patch`, `_delete`, `one`, `all`). Subclasses (e.g., `MembersAPI`, `GuildsAPI`, `ToursAPI`, `AttendanceAPI`) extend it with a path string. The `_sync()` method handles create-or-update logic (POST, then PUT on 409 conflict).

### Event Handlers

Each Discord event has its own file in `src/events/`. The main entry point (`cornbot.ts`) registers them on the client. The `ready` event triggers guild/member data sync, tour sync, and starts the daily birthday cron job.

### Exec Commands

The bot owner can send DM commands prefixed with `exec` for administrative tasks: `exec reboot`, `exec test`, `exec launch [tourKey]`, `exec delete all events`.

### Data Interfaces

Domain objects in `src/interfaces/` include static `fromDiscord()` factory methods to convert discord.js objects into API-compatible shapes (see `Member.ts`, `Guild.ts`).

### Message Reactions

`messageReactions.ts` handles automatic behaviors: reacting with corn emoji when messages contain it, responding to "good bot"/"bad bot", and auto-reporting `@everyone` usage.

## Deployment

- **Docker**: Uses Node.js 16 image, runs directly with `ts-node src/cornbot.ts` (no compile step)
- **Heroku**: Procfile runs as a `worker` process (`npm run build && npm run start`); no web dyno
- **Postinstall**: Automatically compiles TypeScript and copies `static/` to `dist/`

## Conventions

- Use `async`/`await` for asynchronous operations
- Arrow functions for event handlers and command implementations
- Template literals for string formatting
- Environment variables loaded via `dotenv.config()` at entry points
- No strict linting or testing enforced — this is a community side project
- Output directory is `dist/` (compiled JS)
- Static assets (tour images) are copied to `dist/static/` during build
