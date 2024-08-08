const config = require('./Src/config')
const MeowBot = require('./Src/Bot')

const meow = new MeowBot(config)
meow.server()