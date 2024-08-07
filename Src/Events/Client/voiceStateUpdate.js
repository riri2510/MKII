const { autoJoin, updateDescription, unDeaf } = require('../../Functions')

module.exports = async (client, oldState, newState) => {
   try {
      if (client.config.autoJoin) autoJoin(client, oldState, newState)

      updateDescription(client, oldState, newState)
      unDeaf(client.player.getQueue(newState.guild.id))
   } catch (error) {
      console.error('❌   ✦ 🍉 VoiceStateUpdate Error\n', error)
   }
}