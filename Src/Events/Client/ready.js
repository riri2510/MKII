const { Routes, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

module.exports = async (client) => {
   try {
      console.log('\x1b[35m%s\x1b[0m', '✔️   ✦ 💖 From Pooba Saga With Luv')
      console.log('\x1b[35m%s\x1b[0m', '✔️   ✦ 🪐 Logged in as -- ' + client.user.username)

      const { guild, global } = client.config.test.status
         ? { guild: client.interface.flat(), global: [] }
         : { guild: client.interface[0], global: client.interface[1] }

      await client.rest.put(Routes.applicationGuildCommands(client.user.id, client.config.guild.id), { body: guild })
      await client.rest.put(Routes.applicationCommands(client.user.id), { body: global })

      client.greeting = [
         new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setThumbnail(client.config.embed.thumbnail)
            .setDescription(
               '✦ Wish you a happy music time, moah moah\n' +
               '✦ Click buttons below for more info\n' +
               '✦ From Pooba Saga with luv\n' +
               '✦ ' + client.user.username +' :3'
            ),

         new ActionRowBuilder().addComponents(
            new ButtonBuilder({ label: 'Vote For Me', style: 5 }).setURL(client.config.invite.vote).setDisabled(!client.config.invite.status),
            new ButtonBuilder({ label: 'Invite Me', style: 5 }).setURL(client.config.invite.url).setDisabled(!client.config.invite.status),
            new ButtonBuilder({ label: 'Join Server', style: 5 }).setURL(client.config.invite.guild)
         ),
      ]
   } catch (error) {
      console.log('❌   ✦ 🍉 Ready Error\n', error)
   }
}