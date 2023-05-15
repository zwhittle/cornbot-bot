import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
import { validateEnv } from './utils/validateEnv'
import { CommandList } from './commands/_CommandList'

const main = () => {
  if (!validateEnv()) return

  const clientId = process.env.CLIENT_ID as string
  const token = process.env.DISCORD_TOKEN as string

  const commandData = CommandList.map(command => command.data.toJSON())

  const rest = new REST({ version: '10' }).setToken(token)
  rest
    .put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.log('Successfully deleted all applications commands.'))
    .catch(console.error)

  rest
    .put(Routes.applicationCommands(clientId), { body: commandData })
    .then((data: any) =>
      console.log(`Successfully registered ${data.length} application commands.`)
    )
    .catch(console.error)
}

main()
