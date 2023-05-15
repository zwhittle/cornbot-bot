import { format } from 'date-fns'
import { GuildMember } from 'discord.js'

export const CORN_ID = '311688013857947658'

export const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

export function formatDateLong(unformattedDate: Date) {
  return format(unformattedDate, 'd MMMM yyyy')
}

export function formattedTimestamp() {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss')
}

export function welcomeMessage(member: GuildMember) {
  const dude = member
  const welcomeMessages = []

  welcomeMessages.push(`Hey, everyone! ${dude} joined! Welcome!`)
  welcomeMessages.push(`Welcome, ${dude}!`)
  welcomeMessages.push(
    `We're not stuck in here with you, ${dude}. You're stuck in here with us. Welcome!`
  )
  welcomeMessages.push(`Everyone say hello to ${dude}! Welcome!`)
  welcomeMessages.push(`Finally, ${dude} is here and we can get this party started! Welcome!`)
  welcomeMessages.push(`A wild ${dude} appears! Welcome!`)
  welcomeMessages.push(`I smell a ${dude} somewhere nearby... Welcome!`)
  welcomeMessages.push(`Welcome, ${dude}! Now where's the pizza you promised to bring?`)

  const random = Math.floor(Math.random() * welcomeMessages.length)

  return welcomeMessages[random]
}

export function goodBotResponse() {
  const responses: string[] = []

  responses.push(`<3`)
  responses.push(`😎`)
  responses.push(`Thanks! I try really hard.`)
  responses.push(`And people say that you can't day drink and do your job well at the same time 😉`)
  responses.push(`You're corn damn right! 😎`)

  const random = Math.floor(Math.random() * responses.length)
  return responses[random]
}

export function badBotResponse() {
  const responses: string[] = []
  String.raw`¯\_(ツ)_/`

  responses.push(`Sorry. I'm kinda drubk right now.`)
  responses.push(`No need to get aggressive. I\'m just a bot made of corn.`)
  responses.push(`Bad human`)
  responses.push(`t(-_-t)`)
  responses.push(`¯\\\_(ツ)\_/¯`)
  responses.push(`🤷‍♂️`)
  responses.push(`🖕🖕🖕`)
  responses.push(`I don't know either.`)

  const random = Math.floor(Math.random() * responses.length)
  return responses[random]
}