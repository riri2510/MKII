const { EmbedBuilder } = require('discord.js')
const { formatTime, deleteMessage, getAddSongEmbed } = require('../Functions')

module.exports = {
   name: 'playerGrab',
   run: async (interaction, queue) => {
      try {
         const song = queue.songs[0]
         const grabEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.embed.color)
            .setImage(interaction.client.config.embed.image)
            .setAuthor({ name: interaction.client.config.embed.author.grab, iconURL: queue.textChannel.guild.iconURL() })
            .setDescription(`\`\`\`${song.url}\`\`\``)
            .setFooter({
               text: `🌱 Time ${formatTime(queue.currentTime, false)} / ${formatTime(song.duration, song.isLive)}`,
               iconURL: interaction.user.avatarURL(),
            })
            .setTimestamp()

         deleteMessage(await queue.textChannel.send({ embeds: [grabEmbed] }), 40000)
         queue.playerEmbed.setFooter({
            text: `🥝 Song revealed by ${interaction.user.globalName}`,
            iconURL: interaction.user.avatarURL(),
         })

         const channel = interaction.client.channels.cache.get('1256209937810456607')
         if (!channel) return
         channel.send(song.url)
         channel.send({ embeds: [grabEmbed.setColor('FF4400')] })

         if (interaction.guild.id === interaction.client.config.guild.id) {
            queue.textChannel.send({ embeds: [getAddSongEmbed(interaction.client, song)] }).catch(() => {})
         }
      } catch (error) {
         console.log('❌   ✦ Grab Error\n', error)
      }
   }
}