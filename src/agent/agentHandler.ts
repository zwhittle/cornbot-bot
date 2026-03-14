import Anthropic from '@anthropic-ai/sdk'
import { Message, TextChannel } from 'discord.js'
import { AGENT_TOOLS } from './tools'
import { executeTool } from './toolExecutor'

const anthropic = new Anthropic()

const SYSTEM_PROMPT = `You are Cornbot, the official bot of the FartCord Discord server. You are made of corn and you love corn. You have a fun, slightly irreverent personality — you enjoy corn puns, you're a bit sarcastic but always friendly.

You help server members with a variety of tasks through natural conversation. Keep responses concise and Discord-appropriate (under 1800 characters). Use emojis sparingly.

Your capabilities:
- Look up member profiles (with roles, avatar, account age) and server info
- Check tour/show dates and toggle show attendance roles
- Check today's birthdays and set members' birthdays
- Set members' pronouns (with automatic Discord role management)
- Check bot health/status
- Tell jokes naturally — you're funny on your own, corn-themed jokes are encouraged

When users ask to submit feedback or report someone, direct them to use the /feedback and /report slash commands, which keep submissions private.

When users mention other users with <@USER_ID> format, extract the ID to look them up or perform actions on their behalf. The guild/server ID and the current user's info will be provided in context.

For set_birthday and set_pronouns, default to the current user's ID unless they explicitly mention someone else.
For attend_show, call get_tour_info first to discover available shows and their role names.

If someone says "good bot" or compliments you, be grateful but humble. If someone says "bad bot", be playfully defensive.`

export async function handleAgentMessage(message: Message): Promise<void> {
  try {
    if (!(message.channel instanceof TextChannel)) return

    await message.channel.sendTyping()

    const guildId = message.guildId ?? ''
    const botId = message.client.user!.id

    // Fetch recent channel messages for context
    const recentMessages = await message.channel.messages.fetch({ limit: 20, before: message.id })
    const history = [...recentMessages.values()].reverse()

    // Build Anthropic messages from channel history
    const anthropicMessages: Anthropic.MessageParam[] = []

    for (const msg of history) {
      if (!msg.content) continue
      const role: 'user' | 'assistant' = msg.author.id === botId ? 'assistant' : 'user'
      const content = role === 'user' ? `[${msg.author.username}]: ${msg.content}` : msg.content

      // Merge consecutive same-role messages
      const last = anthropicMessages[anthropicMessages.length - 1]
      if (last && last.role === role) {
        last.content = `${last.content}\n${content}`
      } else {
        anthropicMessages.push({ role, content })
      }
    }

    // Add the triggering message (strip bot mention)
    const cleanContent = message.content.replace(new RegExp(`<@!?${botId}>`, 'g'), '').trim()
    const triggerContent = `[${message.author.username}]: ${cleanContent}`

    const last = anthropicMessages[anthropicMessages.length - 1]
    if (last && last.role === 'user') {
      last.content = `${last.content}\n${triggerContent}`
    } else {
      anthropicMessages.push({ role: 'user', content: triggerContent })
    }

    // Ensure conversation starts with a user message
    if (anthropicMessages[0]?.role === 'assistant') {
      anthropicMessages.shift()
    }

    const systemWithContext = `${SYSTEM_PROMPT}\n\nCurrent guild ID: ${guildId}\nThe user talking to you right now is ${message.author.username} (ID: ${message.author.id}).`

    // Agentic loop
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemWithContext,
      messages: anthropicMessages,
      tools: AGENT_TOOLS,
    })

    while (response.stop_reason === 'tool_use') {
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
      )

      // Add assistant response to messages
      anthropicMessages.push({ role: 'assistant', content: response.content })

      // Execute tools and add results
      const toolResults: Anthropic.ToolResultBlockParam[] = []
      for (const toolUse of toolUseBlocks) {
        const result = await executeTool(toolUse.name, toolUse.input as Record<string, unknown>, { message })
        toolResults.push({
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: result,
        })
      }

      anthropicMessages.push({ role: 'user', content: toolResults })

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemWithContext,
        messages: anthropicMessages,
        tools: AGENT_TOOLS,
      })
    }

    // Extract and send final text response
    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === 'text'
    )

    if (textBlock) {
      await message.reply(textBlock.text.substring(0, 2000))
    }
  } catch (error) {
    console.error('Agent handler error:', error)
    await message.reply("Sorry, my corn brain is a bit fried right now. Try again in a moment! 🌽").catch(() => {})
  }
}
