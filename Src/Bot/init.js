const { Collection } = require('discord.js')
const { DisTube } = require('distube')
const fs = require('fs').promises

module.exports = async (client) => {
   client.player = new DisTube(client, client.config.plugins)
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

const loadFiles = async (path, callback) => {
   try {
      const files = await fs.readdir(path)
      await Promise.all(files.map((file) => callback(require(`${path}/${file}`))))
   } catch (error) {
      console.log(error)
   }
}

const loadEvents = async (client, path) => {
   const emitter = path.includes('Client') ? client : client.player
   await loadFiles(path, async (event) => emitter.on(event.name, event.run.bind(null, client)))
}

const loadCommands = async (client, path) => {
   const i = path.includes('Admin') ? 0 : 1

   await loadFiles(path, async (command) => {
      client.interface[i].push(command.data)
      client.commands.set(command.data.name, command)
   })
}

const loadButtons = async (client, path) => {
   await loadFiles(path, async (button) => client.buttons.set(button.name, button.run))
}