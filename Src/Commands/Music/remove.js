const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'remove',
      description: 'Remove a song at specific position',
      options: [
         {
            name: 'position',
            description: 'The position of the song, press Queue button for information. Default is current song',
            type: ApplicationCommandOptionType.Integer,
            required: false,
         },
      ],
   },
   voiceChannel: true,

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         const position = interaction.options.getInteger('position') || 1
         const queue = interaction.client.player.getQueue(interaction.guild.id)

         if (!queue || !queue.playing) {
            embed.setDescription('✦ No music is currently playing')
            deleteMessage(await interaction.editReply({ embeds: [embed] }), 5000)
         } else if (queue.songs.length <= 1) {
            embed.setDescription('✦ Removed')
            try {
               await queue.stop()
               await queue.playerMessage.delete().catch(() => {})
            } catch {}
            deleteMessage(await interaction.editReply({ embeds: [embed] }), 5000)
         } else if (position < 1 || position > queue.songs.length) {
            embed.setDescription('✦ Please provide a valid song position in the queue')
         } else {
            if (position === 1) await queue.skip()
            const removedSong = queue.songs.splice(position - 1, 1)[0]
            embed
               .setThumbnail(removedSong.thumbnail)
               .setDescription(`✦ Removed [${removedSong.name}](${removedSong.url})・Requested by <@${removedSong.user.id}>`)

            await interaction.editReply({ embeds: [embed] })
         }
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌   ✦ Remove Error\n', error)
      }
   },
}
