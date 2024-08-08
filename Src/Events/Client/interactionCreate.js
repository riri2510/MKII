const { handleCommand, handleModalSubmit } = require('../../Functions')
const { InteractionType } = require('discord.js')

module.exports = {
   name: 'interactionCreate',
   run: async (client, interaction) => {
      try {
         if (!interaction.guild) return interaction.reply({ content: 'Use command in a server :3' })

         switch (interaction.type) {
            case InteractionType.ApplicationCommand:
               await handleCommand(interaction)
               break

            case InteractionType.ApplicationCommandAutocomplete:
               await client.commands.get(interaction.commandName).suggest(interaction)
               break

            case InteractionType.ModalSubmit:
               await handleModalSubmit(interaction)
               break
         }
      } catch (error) {
         console.log('❌   ✦ 🍉 Interaction Error\n', error)
      }
   }
}