import { Command } from '../interfaces/Command'
import { report } from './report'

export const CommandList: Command[] = [
  report,
]

export const CommandMap = new Map(CommandList.map(cmd => [cmd.data.name, cmd]))
