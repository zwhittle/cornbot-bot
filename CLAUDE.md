# CLAUDE.md

## Project Overview

Cornbot is a Discord bot for the FartCord server, built as a TypeScript rewrite of an older Node.js version. It provides slash commands for member engagement, syncs guild/member data with a backend API, logs messages and analytics, and manages concert tour event announcements.

## Tech Stack

- **Runtime**: Node.js 16 (Docker) / ts-node for development
- **Language**: TypeScript (target ES2018, CommonJS modules)
- **Framework**: discord.js v14
- **HTTP**: Native `fetch` (with `node-fetch` v2 polyfill)
- **Scheduling**: `cron` for recurring tasks (e.g., daily birthday announcements)
- **Date handling**: `date-fns`
- **Deployment**: Heroku (Procfile) or Docker

## Project Structure

```
src/
├── cornbot.ts              # Main entry point - creates Discord client, registers event handlers
├── deployCommands.ts       # Utility to register slash commands with Discord API
├── api/                    # API client layer for backend communication
│   ├── CornbotAPI.ts       # Generic base class with CRUD operations
│   ├── MembersAPI.ts       # Member endpoints
│   ├── GuildsAPI.ts        # Guild endpoints
│   ├── AnalyticsAPI.ts     # Analytics event tracking
│   ├── FeedbacksAPI.ts     # Feedback submission
│   ├── ReportsAPI.ts       # User reports
│   └── MessagesAPI.ts      # Message logging
├── commands/               # Slash command implementations
│   ├── _CommandList.ts     # Command registry (all commands exported here)
│   ├── corn.ts, joke.ts, feedback.ts, report.ts, info.ts,
│   │   birthday.ts, pronouns.ts, viewshow.ts, attendshow.ts,
│   │   ctxUserInfo.ts
├── events/                 # Discord event handlers
│   ├── ready.ts            # Bot startup: guild/member sync, cron jobs
│   ├── interactionCreate.ts# Routes slash commands to handlers
│   ├── messageCreate.ts    # Message logging, auto-reactions, exec commands
│   ├── messageUpdate.ts    # Tracks message edits
│   └── guildMemberAdd.ts   # Welcome messages for new members
├── interfaces/             # TypeScript type definitions
│   ├── Command.ts          # Command interface (data + run)
│   ├── Member.ts, Guild.ts, Message.ts, Feedback.ts, UserReport.ts, AnalyticsEvent.ts
├── utils/                  # Helper functions
│   ├── validateEnv.ts      # Environment variable validation
│   ├── utils.ts            # Welcome messages, bot responses
│   ├── exec.ts             # Executive commands for tours/events
│   ├── commands.ts         # Command utilities
│   ├── jokes.ts            # Joke data
│   └── infoCommand.ts      # Info command utilities
├── data/
│   └── tourdata.ts         # Tour schedule (dates, venues, ticket links)
├── config/
│   └── IntentOptions.ts    # Discord gateway intents configuration
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
- `BOT_TOKEN` / `DISCORD_TOKEN` - Discord bot authentication token
- `CLIENT_ID` - Discord application client ID (for command registration)
- `API_DOMAIN` - Backend API base URL
- `STATIC_URL` - URL prefix for tour poster images

## Key Patterns

### Command Pattern
Each command exports an object matching the `Command` interface with `data` (SlashCommandBuilder) and `run` (async handler). New commands must be added to `src/commands/_CommandList.ts`.

### API Layer
`CornbotAPI<T>` is a generic base class providing CRUD operations (`_post`, `_put`, `_patch`, `_delete`, `one`, `all`). Subclasses (e.g., `MembersAPI`, `GuildsAPI`) extend it with a path string. The `_sync()` method handles create-or-update logic (POST, then PUT on 409 conflict).

### Event Handlers
Each Discord event has its own file in `src/events/`. The main entry point (`cornbot.ts`) registers them on the client. The `ready` event triggers guild/member data sync and starts cron jobs.

### Data Interfaces
Domain objects in `src/interfaces/` include static `fromDiscord()` factory methods to convert discord.js objects into API-compatible shapes.

## Conventions

- Use `async`/`await` for asynchronous operations
- Arrow functions for event handlers and command implementations
- Template literals for string formatting
- Environment variables loaded via `dotenv.config()` at entry points
- No strict linting or testing enforced - this is a community side project
- Output directory is `dist/` (compiled JS)
- Static assets (tour images) are copied to `dist/static/` during build
