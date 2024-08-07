const { EmbedBuilder } = require('discord.js')
const { deleteMessage, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'stop',
      description: 'Stop the music and clear the queue',
      options: [],
   },
   voiceChannel: true,

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         const queue = interaction.client.player.getQueue(interaction.guild.id)

         if (!queue || !queue.playing) {
            embed.setDescription('✦ No music is currently playing')
         } else {
            if (queue.playerMessage) await queue.playerMessage.delete().catch(() => {})
            await queue.stop()
            embed.setDescription('✦ Stopped the music and cleared the queue')
         }

         deleteMessage(await interaction.editReply({ embeds: [embed] }), 5000)
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌   ✦ Stop Error\n', error)
      }
   },
}
