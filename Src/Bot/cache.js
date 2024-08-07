const { Collection } = require('discord.js')

module.exports = class Cache {
   constructor(distube) {
      this.distube = distube
      this.songCache = new Collection()
      this.playlistCache = new Collection()
      this.mixCache = new Collection()
   }

   async addMix(query, mix) {
      this.mixCache.set(query, mix)
   }
   getMix(query) {
      return this.mixCache.get(query)
   }

   async addPlaylist(query) {
      const resolved = await this.distube.handler.resolve(query)
      if (resolved) this.playlistCache.set(query, resolved)
   }
   getPlaylist(query) {
      return this.playlistCache.get(query)
   }

   async addSong(query) {
      const resolved = await this.distube.handler.resolve(query)
      if (resolved) this.songCache.set(query, resolved)
   }
   getSong(query) {
      return this.songCache.get(query)
   }
}