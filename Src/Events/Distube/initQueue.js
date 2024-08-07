const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { deleteMessage, isMainGuild } = require('../../Functions')

module.exports = async (client, queue) => {
   try {
      if(isMainGuild(queue.textChannel.guild.id, client.config.guild.id)) await queue.voice.setSelfDeaf(false)
      await queue.setRepeatMode(2)
      await queue.setVolume(99)

      queue.actionRows = [
         new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerShuf', style: 2, emoji: client.config.buttons.shuf }),
            new ButtonBuilder({ custom_id: 'playerPrev', style: 2, emoji: client.config.buttons.prev }),
            new ButtonBuilder({ custom_id: 'playerStop', style: 4, emoji: client.config.buttons.stop }),
            new ButtonBuilder({ custom_id: 'playerSkip', style: 2, emoji: client.config.buttons.skip }),
            new ButtonBuilder({ custom_id: 'playerLoop', style: 2, emoji: client.config.buttons.loop }),
         ),
         new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerQueue', style: 2, emoji: client.config.buttons.queue }),
            new ButtonBuilder({ custom_id: 'playerAdd',   style: 2, emoji: client.config.buttons.add }),
            new ButtonBuilder({ custom_id: 'playerPause', style: 2, emoji: client.config.buttons.pause }),
            new ButtonBuilder({ custom_id: 'playerGrab',  style: 2, emoji: client.config.buttons.grab }),
            new ButtonBuilder({ custom_id: 'playerClear', style: 2, emoji: client.config.buttons.clear }),
         ),
      ]

      deleteMessage(await queue.textChannel.send({ embeds: [client.greeting[0]], components: [client.greeting[1]] }), 80000)
   } catch (error) {
      console.log('❌   ✦ 🥝 InitQueue Error\n', error)
   }
}