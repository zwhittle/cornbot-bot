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

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
})

const main = async () => {
  if (!validateEnv()) return

  const BOT = new Client({ intents: IntentOptions, partials: [Partials.Channel] })

  BOT.on('ready', async () => {
    try { await ready(BOT) }
    catch (error) { console.error('Error in ready handler:', error) }
  })

  BOT.on('interactionCreate', async interaction => {
    try { await interactionCreate(interaction) }
    catch (error) { console.error('Error in interactionCreate handler:', error) }
  })

  BOT.on('guildMemberAdd', async member => {
    try { await guildMemberAdd(member) }
    catch (error) { console.error('Error in guildMemberAdd handler:', error) }
  })

  BOT.on('messageCreate', async message => {
    try { await messageCreate(message) }
    catch (error) { console.error('Error in messageCreate handler:', error) }
  })

  BOT.on('messageUpdate', async (oldMessage, newMessage) => {
    try { await messageUpdate(oldMessage, newMessage) }
    catch (error) { console.error('Error in messageUpdate handler:', error) }
  })

  const shutdown = () => {
    console.log('Shutting down gracefully...')
    BOT.destroy()
    process.exit(0)
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)

  await BOT.login(process.env.BOT_TOKEN).then(() => console.log('Connected'))
}

main()
