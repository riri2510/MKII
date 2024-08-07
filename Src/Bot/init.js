const { Collection } = require('discord.js')
const { DisTube } = require('distube')
const fs = require('fs').promises
const Cache = require('./cache')

module.exports = async (client) => {
   client.player = new DisTube(client, client.config.plugins)
   //client.cache = new Cache(client.player)
   client.commands = new Collection()
   client.buttons = new Collection()
   client.interface = [[], []]

   await Promise.all([
      loadEvents(client, __dirname + '/../Events/Client'),
      loadEvents(client, __dirname + '/../Events/Distube'),
      loadCommands(client, __dirname + '/../Commands/Admin'),
      loadCommands(client, __dirname + '/../Commands/Music'),
      loadButtons(client, __dirname + '/../Buttons'),
   ])
}

const loadEvents = async (client, path) => {
   try {
      const files = await fs.readdir(path)
      const emitter = path.includes('Client') ? client : client.player

      await Promise.all(
         files.map((file) => {
            const fn = require(path + '/' + file)
            emitter.on(file.split('.')[0], fn.bind(null, client))
         })
      )
   } catch (error) {
      console.log(error)
   }
}

const loadCommands = async (client, path) => {
   try {
      const files = await fs.readdir(path)
      const interface = path.includes('Admin') ? client.interface[0] : client.interface[1]

      await Promise.all(
         files.map((file) => {
            const command = require(path + '/' + file)

            client.commands.set(command.data.name, command)
            interface.push(command.data)
         })
      )
   } catch (error) {
      console.log(error)
   }
}

const loadButtons = async (client, path) => {
   try {
      const files = await fs.readdir(path)
      await Promise.all(
         files.map((file) => {
            const button = require(path + '/' + file)
            client.buttons.set(button.name, button.run)
         })
      )
   } catch (error) {
      console.log(error)
   }
}