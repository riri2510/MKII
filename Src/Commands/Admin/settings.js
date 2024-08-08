const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage, isOwner, isAdmin, strict, sendErrorEmbed } = require('../../Functions')

const settingsOptions = {
   'admin-id': (value, interaction) => isOwner(interaction) && (interaction.client.config.admin.id = value),
   api: (value, interaction) => (interaction.client.config.api = value),
   'dj-role': (value, interaction) => (interaction.client.config.users.roles = value.split(' ')),
   'embed-color': (value, interaction) => (interaction.client.config.embed.color = value),
   'embed-thumbnail': (value, interaction) => (interaction.client.config.embed.thumbnail = value),
   'embed-image': (value, interaction) => (interaction.client.config.embed.image = value),
   'presence-status': (value, interaction) => (interaction.client.config.presence.status = value),
   'presence-name': (value, interaction) => (interaction.client.config.presence.name = value),
   'presence-state': (value, interaction) => (interaction.client.config.presence.state = value),
   'presence-type': (value, interaction) => (interaction.client.config.presence.type = value),
   'invite-status': (value, interaction) => (interaction.client.config.invite.status = value),
   'author-youtube-small': (value, interaction) => (interaction.client.config.embed.author.youtubes = value),
   'author-youtube-large': (value, interaction) => (interaction.client.config.embed.author.youtubel = value),
   'author-spotify': (value, interaction) => (interaction.client.config.embed.author.spotify = value),
   'author-soundcloud': (value, interaction) => (interaction.client.config.embed.author.soundcloud = value),
   'icons-youtube': (value, interaction) => (interaction.client.config.embed.icons.youtube = value),
   'icons-spotify': (value, interaction) => (interaction.client.config.embed.icons.spotify = value),
   'icons-soundcloud': (value, interaction) => (interaction.client.config.embed.icons.soundcloud = value),
}

module.exports = {
   data: {
      name: 'settings',
      description: 'Edit settings of the bot',
      options: [
         {
            name: 'edit',
            description: 'Change various settings',
            type: ApplicationCommandOptionType.Subcommand,
            options: Object.keys(settingsOptions).map((name) => ({
               name,
               description: settingsOptions[name].description || `Set new ${name.replace(/-/g, ' ')}`,
               type: ApplicationCommandOptionType.String,
               required: false,
            })),
         },
         {
            name: 'view',
            description: 'View settings',
            type: ApplicationCommandOptionType.Subcommand,
         },
      ],
   },

   run: async (interaction) => {
      await interaction.deferReply()
      const embed = new EmbedBuilder().setColor(interaction.client.config.embed.color)

      try {
         if (!isOwner(interaction) && !isAdmin(interaction)) return strict(interaction)
         const subcommand = interaction.options.getSubcommand()

         if (subcommand === 'edit') {
            for (const option of interaction.options.data[0].options) {
               const handler = settingsOptions[option.name]
               if (handler) {
                  handler(option.value, interaction)
               }
            }
            deleteMessage(await interaction.editReply({ embeds: [embed.setDescription('Settings updated successfully')] }), 10000)
         } else if (subcommand === 'view') {
            embed.setAuthor({ name: interaction.client.config.embed.author.settings, iconURL: interaction.guild.iconURL() }).addFields(
               { name: '✦ Owner ID', value: interaction.client.config.owner.id, inline: true },
               { name: '✦ Admin ID', value: interaction.client.config.admin.id, inline: true },
               { name: '✦ Guild ID', value: interaction.client.config.guild.id, inline: true },
               { name: '✦ API', value: interaction.client.config.api || 'Not set', inline: false },
               { name: '✦ Embed Color', value: interaction.client.config.embed.color, inline: true },
               { name: '✦ Embed Thumbnail', value: interaction.client.config.embed.thumbnail, inline: true },
               { name: '✦ Embed Image', value: interaction.client.config.embed.image, inline: true },
               { name: '✦ Presence Name', value: interaction.client.config.presence.name, inline: true },
               { name: '✦ Presence Status', value: interaction.client.config.presence.status || 'Not set', inline: true },
               {
                  name: '✦ Presence Type',
                  value: interaction.client.config.presence.type !== undefined ? interaction.client.config.presence.type.toString() : 'Not set',
                  inline: true,
               },
               { name: '✦ Shard', value: interaction.client.config.shard ? 'Enabled' : 'Disabled', inline: true },
               { name: '✦ Invite Status', value: interaction.client.config.invite.status ? 'Enabled' : 'Disabled', inline: true },
               { name: '✦ DJ Role', value: interaction.client.config.users.roles.join(', ') || 'Not set', inline: true },
               { name: '✦ Icons YouTube', value: interaction.client.config.embed.icons.youtube, inline: true },
               { name: '✦ Icons Spotify', value: interaction.client.config.embed.icons.spotify, inline: true },
               { name: '✦ Icons SoundCloud', value: interaction.client.config.embed.icons.soundcloud, inline: true },
               { name: '✦ Author YouTube Small', value: interaction.client.config.embed.author.youtubes, inline: false },
               { name: '✦ Author YouTube Large', value: interaction.client.config.embed.author.youtubel, inline: false },
               { name: '✦ Author Spotify', value: interaction.client.config.embed.author.spotify, inline: false },
               { name: '✦ Author SoundCloud', value: interaction.client.config.embed.author.soundcloud, inline: false }
            )

            deleteMessage(await interaction.editReply({ embeds: [embed] }), 120000)
         }
      } catch (error) {
         console.log('❌  ✦ Setting Error', error)
      }
   }
}