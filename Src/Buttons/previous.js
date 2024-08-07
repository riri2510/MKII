module.exports = {
   name: 'playerPrev',
   run: async (interaction, queue) => {
      try {
         await queue.previous().catch(() => {
            queue.playerEmbed.setFooter({ text: `🌵 No song`, iconURL: interaction.user.avatarURL() })
         })
      } catch (error) {
         console.log('❌   ✦ Previous Error\n', error)
      }
   }
}