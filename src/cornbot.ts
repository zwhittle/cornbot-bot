import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Partials } from 'discord.js'
import { IntentOptions } from './config/IntentOptions'
import { validateEnv } from './utils/validateEnv'
import { interactionCreate } from './events/interactionCreate'
import { ready } from './events/ready'
import { guildMemberAdd } from './events/guildMemberAdd'
import { messageCreate } from './events/messageCreate'
import { messageUpdate } from './events/messageUpdate'

const main = async () => {
  if (!validateEnv()) return

  const BOT = new Client({ intents: IntentOptions, partials: [Partials.Channel] })

  BOT.on('ready', async () => await ready(BOT))
  BOT.on('interactionCreate', async interaction => await interactionCreate(interaction))
  BOT.on('guildMemberAdd', async member => await guildMemberAdd(member))
  BOT.on('messageCreate', async message => await messageCreate(message))
  BOT.on(
    'messageUpdate',
    async (oldMessage, newMessage) => await messageUpdate(oldMessage, newMessage)
  )

  await BOT.login(process.env.BOT_TOKEN).then(value => console.log('Connected'))
}

main()
