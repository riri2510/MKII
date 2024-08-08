const { getAddSongEmbed } = require('../../Functions')

module.exports = {
   name: 'addSong',
   run: async (client, queue, song) => {
      try {
         queue.textChannel.send({ embeds: [getAddSongEmbed(client, song)] }).catch(() => {})
      } catch (error) {
         console.log('❌   ✦ 🥝 AddSong Error\n', error)
      }
   }
}