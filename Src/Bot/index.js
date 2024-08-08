const { Client, GatewayIntentBits} = require('discord.js')

module.exports = class MeowBot {
   #client

   constructor(config) {
      this.#client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] })
      this.#client.config = config

      require('./init')(this.#client)
      require('./login')(this.#client)
   }

   arise() {
      require('express')().get('/', (_, res) => res.send('🪐')).listen(4000)
   }
}