module.exports = {
   name: 'playerSkip',
   run: async (interaction, queue) => {
      try {
         await queue.skip().catch(() => {
            queue.playerEmbed.setFooter({ text: `🥙 No song`, iconURL: interaction.user.avatarURL() })
         })
      } catch (error) {
         console.log('❌   ✦ Skip Error\n', error)
      }
   }
}