const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'skip',
      description: 'Skip current song',
      options: [
         {
            name: 'number',
            description: 'Amount to skip',
            type: ApplicationCommandOptionType.Number,
            required: false,
         },
      ],
   },
   voiceChannel: true,

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         const number = interaction.options.getNumber('number')
         const queue = interaction.client.player.getQueue(interaction.guild.id)

         if (!queue || !queue.playing) {
            embed.setDescription('✦ No music is currently playing')
         } else if (number) {
            if (number > queue.songs.length) embed.setDescription('✦ Exceeded current no of songs')
            if (isNaN(number) || number < 1) embed.setDescription('✦ Invalid Number')

            try {
               await interaction.client.player.jump(interaction, number)
               embed.setDescription(`✦ Skipped ${number} songs`)
            } catch {
               embed.setDescription('✦ No songs to skip')
            }
         } else {
            try {
               embed.setDescription(`✦ Skipped [${queue.songs[0].name}](${queue.songs[0].url})`)
               await queue.skip()
            } catch {
               embed.setDescription('✦ No song to skip')
            }
         }

         deleteMessage(await interaction.editReply({ embeds: [embed] }), 10000)
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌   ✦ Skip Error\n', error)
      }
   },
}
