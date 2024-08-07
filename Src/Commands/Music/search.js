const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { formatTime, deleteMessage, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'search',
      description: 'Search music',
      options: [
         {
            name: 'query',
            description: 'Type music name',
            type: ApplicationCommandOptionType.String,
            required: true,
         },
         {
            name: 'type',
            description: 'Select source type',
            type: ApplicationCommandOptionType.Integer,
            required: false,
            choices: [
               { name: 'Soundcloud', value: 2 },
               { name: 'Youtube', value: 0 },
            ],
         },
      ],
   },
   voiceChannel: true,

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         const query = interaction.options.getString('query')
         const type = interaction.options.getInteger('type') || 0
         const engine = interaction.client.player.plugins[type]
         const searchOptions = { type: 'video', limit: 10, safeSearch: false }
         const songs = type === 0 ? await engine.search(query, searchOptions) : await engine.search(query)

         if (!songs || !songs.length) return deleteMessage(await interaction.editReply({ embeds: [embed.setDescription('✦ No result')] }), 5000)

         embed
            .setAuthor({ name: interaction.client.config.embed.author.search, iconURL: interaction.guild.iconURL() })
            .setDescription(
               songs
                  .map((song, i) => `${i + 1}. [${song.name}](${song.url})・${song.uploader.name}・${formatTime(song.duration, song.isLive)}`)
                  .join('\n')
            )
            .setFooter({ text: `✨ • Choose a song` })

         const buttons = songs.map((_, i) =>
            new ButtonBuilder()
               .setCustomId(`search${i + 1}`)
               .setLabel(`${i + 1}`)
               .setStyle(2)
         )

         const rows = []
         for (let i = 0; i < buttons.length; i += 5) rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)))

         rows.push(new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Close').setStyle(4).setCustomId('searchClose')))

         const message = await interaction.editReply({ embeds: [embed], components: rows })
         const filter = (i) => i.user.id === interaction.user.id
         const listener = message.createMessageComponentCollector({ filter, time: 30000 })

         listener.on('collect', async (button) => {
            if (button.customId === 'searchClose') {
               listener.stop()
               return deleteMessage(message, 100)
            }
            if (button.customId.startsWith('search')) {
               deleteMessage(message, 100)
               await interaction.client.player.play(interaction.member.voice.channel, songs[Number(button.customId.replace('search', '')) - 1].url, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction,
               })
               listener.stop()
            }
         })

         listener.on('end', () => deleteMessage(message, 100))
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.error('❌    Search Error\n', error)
      }
   },
}
