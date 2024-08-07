const { getAddListEmbed } = require('../../Functions')

module.exports = async (client, queue, list) => {
   try {
      queue.textChannel.send({ embeds: [getAddListEmbed(client, list)] }).catch(() => {})
   } catch (error) {
      console.log('❌   ✦ 🥝 AddList Error\n', error)
   }
}