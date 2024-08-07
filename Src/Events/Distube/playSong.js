const { EmbedBuilder } = require('discord.js')
const { formatTime, updateEmbed, auth, reject, isFit } = require('../../Functions')

module.exports = async (client, queue, song) => {
   try {
      const { color, thumbnail, imageRoxy, author, icons } = client.config.embed
      const { name, url, duration, isLive, user, source } = song
      const { actionRows, textChannel, voiceChannel } = queue

      queue.playerEmbed = new EmbedBuilder()
         .setTimestamp()
         .setColor(color)
         .setDescription(`**[${name}](${url})\n<#${voiceChannel.id}>・${formatTime(duration, isLive)}**`)
         .setFooter({ text: `🧩 Requested by ${user.globalName}`, iconURL: user.avatarURL() })

      const options = {
         youtube: {
            thumbnail,
            image: song.thumbnail,
            author: (await isFit(song.thumbnail)) ? author.youtubel : author.youtubes,
            icon: icons.youtube,
         },
         spotify: {
            thumbnail: song.thumbnail,
            image: Math.random() < 0.5 ? imageRoxy.high : imageRoxy.dance,
            author: author.spotify,
            icon: icons.spotify,
         },
         soundcloud: {
            thumbnail: song.thumbnail,
            image: Math.random() < 0.5 ? imageRoxy.high : imageRoxy.dance,
            author: author.soundcloud,
            icon: icons.soundcloud,
         },
      }[source]

      queue.playerEmbed.setThumbnail(options.thumbnail).setImage(options.image).setAuthor({ name: options.author, iconURL: options.icon })
      queue.playerMessage = await textChannel.send({ embeds: [queue.playerEmbed], components: actionRows })

      queue.listener = queue.playerMessage.createMessageComponentCollector()
      queue.listener.on('collect', async (interaction) => {
         if (interaction.customId !== 'playerAdd') await interaction.deferUpdate()
         if (!auth(interaction)) return await reject(interaction, 1)

         await client.buttons.get(interaction.customId)(interaction, queue).catch((e) => console.log('❌  ✦ 🥙 Button Error\n', e))
         if (!['playerStop', 'playerAdd'].includes(interaction.customId)) await updateEmbed(queue)
      })
   } catch (error) {
      console.log('❌   ✦ 🥝 PlaySong Error\n', error)
   }
}