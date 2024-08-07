module.exports = {
   name: 'playerStop',
   run: async (interaction, queue) => {
      try {
         if(queue) await queue.stop()
         if(queue.playerMessage) await queue.playerMessage.delete()
      } catch (error) {
         console.log('❌   ✦ Stop Error\n', error)
      }
   }
}