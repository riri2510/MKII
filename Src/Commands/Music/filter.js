const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { description, deleteMessage, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'filter',
      description: 'Modify filters',
      options: [],
   },
   voiceChannel: true,
   
   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         const queue = interaction.client.player.getQueue(interaction.guild.id)

         if (!queue || !queue.playing)
            return deleteMessage(await interaction.editReply({ embeds: [embed.setDescription('✦ No music is playing')] }), 10000)

         embed
            .setImage(interaction.client.config.embed.image)
            .setDescription(description(queue))
            .setAuthor({ name: interaction.client.config.embed.author.filter, iconURL: interaction.guild.iconURL() })
            .setFooter({ text: `🧩 • Requested by ${interaction.user.globalName}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()

         const buttons = [
            { id: '3d', label: '3D', style: 2 },
            { id: 'haas', label: 'Stereo', style: 2 },
            { id: 'vaporwave', label: 'Slowed', style: 2 },
            { id: 'nightcore', label: 'Nightcore', style: 2 },
            { id: 'filterClose', label: 'Close', style: 4 },
         ].map((button) => new ButtonBuilder().setCustomId(button.id).setLabel(button.label).setStyle(button.style))
         const row = new ActionRowBuilder().addComponents(buttons)

         const message = await interaction.editReply({ embeds: [embed], components: [row] })
         const filter = (i) => i.user.id === interaction.user.id
         const collector = message.createMessageComponentCollector({ filter, time: 120000 })

         collector.on('collect', async (button) => {
            await button.deferUpdate()
            const { customId } = button

            if (customId === 'filterClose') {
               collector.stop()
            } else if (['3d', 'haas', 'vaporwave', 'nightcore'].includes(customId)) {
               queue.filters.has(customId) ? queue.filters.remove(customId) : queue.filters.add(customId)
               embed.setDescription(description(queue))
               await button.editReply({ embeds: [embed], components: [row] })
            }
         })
         collector.on('end', () => deleteMessage(message, 100))
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌   ✦ Filter Error\n', error)
      }
   },
}
