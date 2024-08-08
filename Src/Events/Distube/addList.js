const { getAddListEmbed } = require('../../Functions')

module.exports = {
   name: 'addList',
   run: async (client, queue, list) => {
      try {
      } catch (error) {
         queue.textChannel.send({ embeds: [getAddListEmbed(client, list)] }).catch(() => {})
         console.log('❌   ✦ 🥝 AddList Error\n', error)
      }
   }
}