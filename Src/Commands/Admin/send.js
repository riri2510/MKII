const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage, strict, isOwner, isAdmin, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'send',
      description: 'Send a message to a channel',
      options: [
         {
            name: 'channel',
            description: 'Specify the channel ID',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
         },
         {
            name: 'message',
            description: 'Message content',
            type: ApplicationCommandOptionType.String,
            required: true,
         },
      ],
   },

   suggest: async (interaction) => {
      try {
         if (!isOwner(interaction) && !isAdmin(interaction)) return await interaction.respond({ name: `I'm sleeping`, value: ' ' })

         const query = interaction.options.getFocused()
         const choices = [
            { name: '🌱・chat', value: '684975114923933781' },
            { name: '🧩・commands', value: '753275189084553276' },
            { name: '🥪・ryo.o', value: '1259958972757049486' },
            { name: '🥪・liltuan', value: '1259547237218779207' },
         ]

         const filtered = choices.filter((choice) => choice.name.includes(query))
         const response = filtered.map((choice) => ({ name: choice.name, value: choice.value }))

         await interaction.respond(response)
      } catch (error) {
         console.log('❌  ✦ Send Message Suggest Error', error)
      }
   },

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         if (!isOwner(interaction) && !isAdmin(interaction)) return strict(interaction)
         const channelID = interaction.options.getString('channel')
         const messageContent = interaction.options.getString('message')

         const channel = interaction.client.channels.cache.get(channelID)
         if (!channel) {
            embed.setDescription(`There is no channel with the provided ID`)
            return deleteMessage(await interaction.editReply({ embeds: [embed] }), 5000)
         }

         await channel.send(messageContent)

         embed.setDescription(`Sent message to <#${channel.id}>: ${messageContent}`)
         deleteMessage(await interaction.editReply({ embeds: [embed] }), 20000)
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌  ✦ Send Message Error', error)
      }
   },
}
