import { ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders'
import {
  CommandInteraction,
} from 'discord.js'

export interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    | ContextMenuCommandBuilder
  run: (interaction: CommandInteraction) => Promise<void>
}
