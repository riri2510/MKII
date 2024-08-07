const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { getSeconds, deleteMessage, formatTime, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'seek',
      description: 'Jump to the timestamp',
      options: [
         {
            name: 'time',
            description: 'Example: 2h 30m 2s',
            type: ApplicationCommandOptionType.String,
            required: true,
         },
         {
            name: 'type',
            description: 'Increase or decrease the current time',
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
               { name: 'Increase', value: 'add' },
               { name: 'Decrease', value: 'minus' },
            ],
         },
      ],
   },
   voiceChannel: true,

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         const queue = interaction.client.player.getQueue(interaction.guild.id)
         const type = interaction.options.getString('type')
         let position = getSeconds(interaction.options.getString('time'))
         await interaction.editReply({ embeds: [embed.setDescription('✦ Meowing')] })

         if (!queue || !queue.playing) {
            embed.setDescription('✦ No music playing')
         } else if (isNaN(position)) {
            embed.setDescription('✦ Usage: 2h 3m 4s')
         } else {
            if (type === 'add') position = Math.min(queue.currentTime + position, queue.songs[0].duration)
            else if (type === 'minus') position = Math.max(queue.currentTime - position, 0)

            await queue.seek(position)
            embed.setDescription(`✦ Seeked to ${formatTime(queue.currentTime, false)}`)
         }
         deleteMessage(await interaction.editReply({ embeds: [embed] }), 5000)
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌    Seek Error\n', error)
      }
   },
}
