const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage, isOwner, isAdmin, strict, sendErrorEmbed } = require('../../Functions')

module.exports = {
   data: {
      name: 'settings',
      description: 'Edit settings of the bot',
      options: [
         {
            name: 'edit',
            description: 'Change various settings',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
               {
                  name: 'admin-id',
                  description: 'Set new admin ID',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'key',
                  description: 'Set new key',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'dj-role',
                  description: 'Who have this role can control the player',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'embed-color',
                  description: 'Set new embed color',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'embed-thumbnail',
                  description: 'Set embed thumbnail URL. The small image at the top right corner of the embed',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'embed-image',
                  description: 'Set embed image URL. The big image at the bottom of the embed',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'presence-status',
                  description: 'Set new presence status',
                  type: ApplicationCommandOptionType.String,
                  required: false,
                  choices: [
                     { name: 'Online', value: 'online' },
                     { name: 'Idle', value: 'idle' },
                     { name: 'Do Not Disturb', value: 'dnd' },
                  ],
               },
               {
                  name: 'presence-name',
                  description: 'Set new presence name',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'presence-state',
                  description: 'Set new presence state',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'presence-type',
                  description: 'Set new presence type',
                  type: ApplicationCommandOptionType.Integer,
                  required: false,
                  choices: [
                     { name: 'Playing', value: 0 },
                     { name: 'Streaming', value: 1 },
                     { name: 'Listening', value: 2 },
                     { name: 'Watching', value: 3 },
                     { name: 'Custom', value: 4 },
                     { name: 'Competing', value: 5 },
                  ],
               },
               {
                  name: 'invite-status',
                  description: 'Set invite status',
                  type: ApplicationCommandOptionType.Boolean,
                  required: false,
               },
               {
                  name: 'author-youtube',
                  description: 'Set author YouTube embed',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'author-spotify',
                  description: 'Set author Spotify embed',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'author-soundcloud',
                  description: 'Set author SoundCloud embed',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'icons-youtube',
                  description: 'Set YouTube icon URL',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'icons-spotify',
                  description: 'Set Spotify icon URL',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
               {
                  name: 'icons-soundcloud',
                  description: 'Set SoundCloud icon URL',
                  type: ApplicationCommandOptionType.String,
                  required: false,
               },
            ],
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
            interaction.options.data[0].options.forEach((option) => {
               switch (option.name) {
                  case 'admin-id':
                     if (!isOwner(interaction)) break
                     interaction.client.config.admin.id = option.value
                     break
                  case 'key':
                     interaction.client.config.key = option.value
                     break
                  case 'dj-role':
                     interaction.client.config.users.roles = option.value.split(' ')
                     break
                  case 'embed-color':
                     interaction.client.config.embed.color = option.value
                     break
                  case 'embed-thumbnail':
                     interaction.client.config.embed.thumbnail = option.value
                     break
                  case 'embed-image':
                     interaction.client.config.embed.image = option.value
                     break
                  case 'presence-status':
                     interaction.client.config.presence.status = option.value
                     break
                  case 'presence-name':
                     interaction.client.config.presence.name = option.value
                     break
                  case 'presence-state':
                     interaction.client.config.presence.state = option.value
                     break
                  case 'presence-type':
                     interaction.client.config.presence.type = option.value
                     break
                  case 'invite-status':
                     interaction.client.config.invite.status = option.value
                     break
                  case 'author-youtube':
                     interaction.client.config.embed.author.youtube = option.value
                     break
                  case 'author-spotify':
                     interaction.client.config.embed.author.spotify = option.value
                     break
                  case 'author-soundcloud':
                     interaction.client.config.embed.author.soundcloud = option.value
                     break
                  case 'icons-youtube':
                     interaction.client.config.embed.icons.youtube = option.value
                     break
                  case 'icons-spotify':
                     interaction.client.config.embed.icons.spotify = option.value
                     break
                  case 'icons-soundcloud':
                     interaction.client.config.embed.icons.soundcloud = option.value
                     break
               }
            })

            deleteMessage(await interaction.editReply({ embeds: [embed.setDescription('Settings updated successfully')] }), 10000)
         } else if (subcommand === 'view') {
            embed
               .setAuthor({ name: '✦ ───── ───── ✦  S E T T I N G S 🌕 ✦ ───── ───── ✦', iconURL: interaction.guild.iconURL() })
               .addFields(
                  { name: '✦ Owner ID', value: interaction.client.config.owner.id, inline: true },
                  { name: '✦ Admin ID', value: interaction.client.config.admin.id, inline: true },
                  { name: '✦ Guild ID', value: interaction.client.config.guild.id, inline: true },
                  { name: '✦ Embed Color', value: interaction.client.config.embed.color, inline: true },
                  { name: '✦ Embed Thumbnail', value: interaction.client.config.embed.thumbnail, inline: true },
                  { name: '✦ Embed Image', value: interaction.client.config.embed.image, inline: true },
                  { name: '✦ Max Volume', value: interaction.client.config.player.maxVol.toString(), inline: true },
                  { name: '✦ Presence Name', value: interaction.client.config.presence.name, inline: true },
                  { name: '✦ Presence Status', value: interaction.client.config.presence.status || 'Not set', inline: true },
                  { name: '✦ Shard', value: interaction.client.config.shard ? 'Enabled' : 'Disabled', inline: true },
                  { name: '✦ Invite Status', value: interaction.client.config.invite.status ? 'Enabled' : 'Disabled', inline: true },
                  { name: '✦ DJ Role', value: interaction.client.config.users.roles.join(', ') || 'Not set', inline: true },
                  { name: '✦ Icons YouTube', value: interaction.client.config.embed.icons.youtube, inline: true },
                  { name: '✦ Icons Spotify', value: interaction.client.config.embed.icons.spotify, inline: true },
                  { name: '✦ Icons SoundCloud', value: interaction.client.config.embed.icons.soundcloud, inline: true },
                  { name: '✦ Author YouTube', value: interaction.client.config.embed.author.youtube, inline: false },
                  { name: '✦ Author Spotify', value: interaction.client.config.embed.author.spotify, inline: false },
                  { name: '✦ Author SoundCloud', value: interaction.client.config.embed.author.soundcloud, inline: false }
               )
            deleteMessage(await interaction.editReply({ embeds: [embed] }), 120000)
         }
      } catch (error) {
         sendErrorEmbed(interaction, embed)
         console.log('❌  ✦ Setting Error', error)
      }
   },
}
