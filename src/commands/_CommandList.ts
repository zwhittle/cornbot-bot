import { Command } from '../interfaces/Command'
import { corn } from './corn'
import { feedback } from './feedback'
import { report } from './report'
import { info } from './info'
import { birthday } from './birthday'
import { pronouns } from './pronouns'
import { viewShow } from './viewshow'
import { attendShow } from './attendshow'
import { ctxUserInfo } from './ctxUserInfo'
import { joke } from './joke'
import { status } from './status'

export const CommandList: Command[] = [
  corn,
  joke,
  feedback,
  report,
  info,
  birthday,
  pronouns,
  viewShow,
  attendShow,
  ctxUserInfo,
  status,
]

export const CommandMap = new Map(CommandList.map(cmd => [cmd.data.name, cmd]))
