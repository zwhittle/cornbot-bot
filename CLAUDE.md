# CLAUDE.md

## Project Overview

Cornbot is a Discord bot for the FartCord server, built as a TypeScript rewrite of an older Node.js version. It provides slash commands for member engagement, syncs guild/member data with a backend API, logs messages and analytics, manages concert tour event announcements, and features an AI-powered conversational agent using Claude.

## Tech Stack

- **Runtime**: Node.js 16 (Docker) / ts-node for development
- **Language**: TypeScript (strict mode, target ES2018, CommonJS modules)
- **Framework**: discord.js v14
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`) — Claude Sonnet 4 powers the conversational agent
- **HTTP**: Native `fetch` (with `node-fetch` v2 polyfill)
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
│   ├── agentHandler.ts     # Agentic loop using Claude Sonnet 4
│   ├── tools.ts            # Tool definitions for the agent (6 tools)
│   └── toolExecutor.ts     # Executes agent tool calls against APIs
├── api/                    # API client layer for backend communication
│   ├── CornbotAPI.ts       # Generic base class with CRUD operations
│   ├── MembersAPI.ts       # Member endpoints (includes incrementCorns, todaysBirthdays)
│   ├── GuildsAPI.ts        # Guild endpoints (includes incrementGoodBotCount/BadBotCount)
│   ├── AnalyticsAPI.ts     # Analytics event tracking
│   ├── FeedbacksAPI.ts     # Feedback submission
│   ├── ReportsAPI.ts       # User reports
│   └── MessagesAPI.ts      # Message logging
├── commands/               # Slash command implementations
│   ├── _CommandList.ts     # Command registry (all commands exported here)
│   ├── corn.ts             # Give/check corns (server currency)
│   ├── joke.ts             # Tell a random joke
│   ├── feedback.ts         # Submit feedback
│   ├── report.ts           # Report a user
│   ├── info.ts             # Server/member info
│   ├── birthday.ts         # Set/view birthdays
│   ├── pronouns.ts         # Set pronouns
│   ├── viewshow.ts         # View tour/show info
│   ├── attendshow.ts       # Mark attendance at a show
│   ├── status.ts           # Bot health: uptime, guild count, API status, ping
│   └── ctxUserInfo.ts      # Context menu: user info
├── events/                 # Discord event handlers
│   ├── ready.ts            # Bot startup: guild/member sync, birthday cron job
│   ├── interactionCreate.ts# Routes slash commands to handlers
│   ├── messageCreate.ts    # Message logging, auto-reactions, exec commands, agent trigger
│   ├── messageUpdate.ts    # Tracks message edits
│   └── guildMemberAdd.ts   # Welcome messages for new members
├── interfaces/             # TypeScript type definitions
│   ├── Command.ts          # Command interface (data + run)
│   ├── Member.ts, Guild.ts, Message.ts, Feedback.ts, UserReport.ts, AnalyticsEvent.ts
├── utils/                  # Helper functions
│   ├── validateEnv.ts      # Environment variable validation
│   ├── utils.ts            # Welcome messages, good/bad bot responses
│   ├── exec.ts             # Executive commands for tours/events (bot owner only)
│   ├── commands.ts         # Feedback/report submission helpers
│   ├── jokes.ts            # Joke fetching
│   ├── infoCommand.ts      # Info command utilities
│   └── messageReactions.ts # Auto-reactions (corn emoji, good/bad bot, @everyone reports)
├── data/
│   └── tourdata.ts         # Tour schedule (dates, venues, ticket links)
├── config/
│   └── IntentOptions.ts    # Discord gateway intents (GuildMembers, MessageContent, DirectMessages)
static/                     # Tour poster images (JPEG/PNG)
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

### Command Pattern
Each command exports an object matching the `Command` interface with `data` (SlashCommandBuilder) and `run` (async handler). New commands must be added to `src/commands/_CommandList.ts`.

### API Layer
`CornbotAPI<T>` is a generic base class providing CRUD operations (`_post`, `_put`, `_patch`, `_delete`, `one`, `all`). Subclasses (e.g., `MembersAPI`, `GuildsAPI`) extend it with a path string. The `_sync()` method handles create-or-update logic (POST, then PUT on 409 conflict).

### Event Handlers
Each Discord event has its own file in `src/events/`. The main entry point (`cornbot.ts`) registers them on the client. The `ready` event triggers guild/member data sync and starts the daily birthday cron job.

### AI Agent
When the bot is @mentioned or replied to, `messageCreate` triggers the Claude agent (`src/agent/`). The agent runs an agentic tool-use loop with 6 tools: `lookup_member`, `lookup_guild`, `give_corn`, `tell_joke`, `get_tour_info`, and `todays_birthdays`. It fetches the last 20 channel messages for conversational context.

### Exec Commands
The bot owner can send DM commands prefixed with `exec` for administrative tasks: `exec reboot`, `exec test`, `exec launch [tourKey]`, `exec delete all events`.

### Data Interfaces
Domain objects in `src/interfaces/` include static `fromDiscord()` factory methods to convert discord.js objects into API-compatible shapes.

### Message Reactions
`messageReactions.ts` handles automatic behaviors: reacting with corn emoji when messages contain it, responding to "good bot"/"bad bot", and auto-reporting `@everyone` usage.

## Deployment

- **Docker**: Uses Node.js 16 image, runs directly with `ts-node src/cornbot.ts` (no compile step)
- **Heroku**: Procfile runs as a `worker` process (`npm run build && npm run start`); no web dyno

## Conventions

- Use `async`/`await` for asynchronous operations
- Arrow functions for event handlers and command implementations
- Template literals for string formatting
- Environment variables loaded via `dotenv.config()` at entry points
- No strict linting or testing enforced — this is a community side project
- Output directory is `dist/` (compiled JS)
- Static assets (tour images) are copied to `dist/static/` during build
