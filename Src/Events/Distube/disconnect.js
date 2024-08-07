module.exports = async (client, queue) => {
   try {
      if (queue.playerMessage) await queue.playerMessage.delete().catch(() => {})
      if (queue) await queue.stop()
   } catch (error) {
      console.log('❌   ✦ 🥝 Disconnect Error\n', error)
   }
}