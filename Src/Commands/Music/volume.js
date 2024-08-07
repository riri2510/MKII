const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'volume',
      description: 'Adjust the volume of the music',
      options: [
         {
            name: 'volume',
            description: 'Type a number',
            type: ApplicationCommandOptionType.Integer,
            required: true,
         },
      ],
   },
   voiceChannel: true,

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         const maxVol = interaction.client.config.player.maxVol
         const vol = interaction.options.getInteger('volume')
         const queue = interaction.client.player.getQueue(interaction.guild.id)

         if (!queue || !queue.playing) {
            embed.setDescription('✦ No music is currently playing')
         } else if (queue.volume === vol) {
            embed.setDescription(`✦ Volume is already set to ${vol}`)
         } else if (!vol || vol < 1 || vol > maxVol) {
            embed.setDescription(`✦ Type a number between 1 and ${maxVol}`)
         } else {
            await queue.setVolume(vol)
            embed.setDescription(`✦ Set volume to ${vol}`)
         }

         deleteMessage(await interaction.editReply({ embeds: [embed] }), 10000)
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌  ✦ Set Volume Error\n', error)
      }
   },
}
