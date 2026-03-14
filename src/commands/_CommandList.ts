import { Command } from '../interfaces/Command'
import { feedback } from './feedback'
import { report } from './report'

export const CommandList: Command[] = [
  feedback,
  report,
]

export const CommandMap = new Map(CommandList.map(cmd => [cmd.data.name, cmd]))
