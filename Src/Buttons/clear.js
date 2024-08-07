module.exports = {
   name: 'playerClear',
   run: async (interaction, queue) => {
      try {
         if (queue.songs.length > 1) queue.songs.splice(1, queue.songs.length - 1)

         queue.playerEmbed.setFooter({
            text: `🫓 Queue cleared by ${interaction.user.globalName}`,
            iconURL: interaction.user.avatarURL(),
         })
      } catch (error) {
         console.log('❌   ✦ Clear Error\n', error)
      }
   }
}