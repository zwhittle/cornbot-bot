import { CommandInteraction } from 'discord.js'
import { EmbedBuilder } from '@discordjs/builders'
import { formatDateLong, months } from './utils'
import { Member } from '../interfaces/Member'
import { Guild } from '../interfaces/Guild'

export async function memberInfo(interaction: CommandInteraction, member: Member) {
  let birthday = 'None saved'
  if (member.birthdayMonth && member.birthdayDay) {
    birthday = `${member.birthdayDay} ${months[member.birthdayMonth]}`
  } 

  const embed = new EmbedBuilder()
    .setColor([108, 211, 190])
    .setTitle(`${member.name}`)
    .setThumbnail(member.avatar)
    .addFields(
      { name: 'Pronouns', value: member.pronouns },
      { name: 'Birthday', value: birthday },
      { name: 'Join Date', value: formatDateLong(new Date(member.joinedAt)) }
    )
    .setTimestamp()

  await interaction.reply({
    embeds: [embed],
    ephemeral: true,
  })
}

export async function serverInfo(interaction: CommandInteraction, guild: Guild) {
  const embed = new EmbedBuilder()
    .setColor([30, 92, 198])
    .setTitle(`${guild.name}`)
    .setThumbnail(guild.icon)
    .addFields(
      { name: 'Total Members', value: `${guild.memberCount}` },
      { name: 'Created Date', value: formatDateLong(new Date(guild.discordCreatedAt)) },
      {
        name: 'Bot Score',
        value: `${guild.goodBotCount - guild.badBotCount} = ${guild.goodBotCount} good votes; ${
          guild.badBotCount
        } bad votes`,
      }
    )
    .setTimestamp()
    .setFooter({
      text: `What is 'Bot Score'? That is the total score of 'good bot' and 'bad bot' votes I have received in in this guild.`,
    })

  await interaction.reply({ embeds: [embed], ephemeral: true })
}
