module.exports = {
   name: 'playerShuf',
   run: async (interaction, queue) => {
      try {
         await queue.shuffle()
         queue.playerEmbed.setFooter({
            text: `🌱 Shuffled by ${interaction.user.globalName}`,
            iconURL: interaction.user.avatarURL(),
         })
      } catch (error) {
         console.log('❌   ✦ Shuffle Error\n', error)
      }
   }
}