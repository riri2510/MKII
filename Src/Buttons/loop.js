const { biModeLoop } = require('../Functions')

module.exports = {
   name: 'playerLoop',
   run: async (interaction, queue) => {
      try {
         await biModeLoop(queue)
         const loopMode = ['🍟 Loop off', '🫓 Loop song', '🫓 Loop queue']
         queue.playerEmbed.setFooter({
            text: `${loopMode[queue.repeatMode]} by ${interaction.user.globalName}`,
            iconURL: interaction.user.avatarURL(),
         })
      } catch (error) {
         console.log('❌   ✦ Loop Error\n', error)
      }
   }
}