const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { playMusic, deleteMessage } = require('../../Functions')

module.exports = {
   data: {
      name: 'play',
      description: 'Play music from various sources',
      options: [
         {
            name: 'name',
            description: 'Type music name or any YouTube, Spotify, or SoundCloud link :3',
            type: ApplicationCommandOptionType.String,
            required: true,
         },
         {
            name: 'position',
            description: 'Position of the song to be added',
            type: ApplicationCommandOptionType.Integer,
            required: false,
            autocomplete: true,
         },
      ],
   },
   voiceChannel: true,

   suggest: async (interaction) => {
      try {
         const query = interaction.options.getFocused()
         const choices = [1, 50, 100]
         const filtered = choices.filter((choice) => choice >= query)
         const response = filtered.map((choice) => ({ name: choice.toString(), value: choice }))
         await interaction.respond(response)
      } catch {}
   },

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)
      const name = interaction.options.getString('name')
      const position = interaction.options.getInteger('position')
      const message = await interaction.editReply({ embeds: [embed.setDescription('✦ Meowing')] })

      try {
         await playMusic(interaction, name, position)
         deleteMessage(message, 3000)
      } catch (error) {
         await interaction.editReply({ embeds: [embed.setDescription('✦ Not found')] })
         deleteMessage(message, 5000)
         console.log('❌  ✦ Play Error\n', error)
      }
   },
}
