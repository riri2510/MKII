const { updateButtons } = require('../Functions')

module.exports = {
   name: 'playerPause',
   run: async (interaction, queue) => {
      try {
         if (queue.paused) {
            queue.resume()
            queue.actionRows[1].components[2].setStyle(2).setEmoji(interaction.client.config.buttons.pause)
         } else {
            queue.pause()
            queue.actionRows[1].components[2].setStyle(4).setEmoji(interaction.client.config.buttons.resume)
         }

         updateButtons(queue)
         queue.playerEmbed.setFooter({
            text: `${queue.paused ? '💤 Paused' : '🍕 Resumed'} by ${interaction.user.globalName}`,
            iconURL: interaction.user.avatarURL(),
         })
      } catch (error) {
         console.log('❌   ✦ Pause Error\n', error)
      }
   }
}