module.exports = async (client, queue) => {
   try {
      if (queue.listener) await queue.listener.stop()
      if (queue.playerMessage) await queue.playerMessage.delete().catch(() => {})
   } catch (error) {
      console.log('❌   ✦ 🥝 FinishSong Error\n', error)
   }
}