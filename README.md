# Cornbot
This repo is a Typescript update to [this repo](https://github.com/zwhittle/cornbot-node).

Cornbot is available to members of the [FartCord](http://fartcord.com) Discord server.

This is mostly a fun side project for me and is not necessarily an example of Good Programming.

## Architecture
Cornbot-ts is built on [discord.js](https://discord.js.org/), written in Typescript, and uses [this repo](https://github.com/zwhittle/cornbot-api) to communicate with the database.

## Installation
Prerequisite: Create a bot at https://discord.com/developers/applications and add it to your Discord server.

1. Clone and run [the api](https://github.com/zwhittle/cornbot-api).
2. Clone this repo
3. Create a .env file in the root directory with these variables
```
DISCORD_TOKEN=your token here
CLIENT_ID=your client id here
```
4. `npm install`
5. `npm run deploy`
6. `npm run bot`
7. You can now issue `/` commands to your bot in your guild!
