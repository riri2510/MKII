const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require('@distube/spotify')
const { YouTubePlugin } = require('@distube/youtube')

require('dotenv').config()

module.exports = {
   token: process.env.token,
   key: process.env.key || '',
   autoJoin: Boolean(process.env.autoJoin),
   plugins: { plugins: [new YouTubePlugin(), new SpotifyPlugin(), new SoundCloudPlugin()] },

   guild: { id: '677858109145874433' },
   owner: { id: '677857271530651649' },
   admin: { id: process.env.admin || '873558627359789086' },
   users: { roles: [process.env.role || '753284454952337589'] },

   embed: {
      color: process.env.color || '2B2D31',
      thumbnail: process.env.thumbnail || 'https://cdn.discordapp.com/attachments/1236634193019277322/1248996386532233248/mikogif.gif?ex=6665b207&is=66646087&hm=e3373b433b6a9ca9b814592f175c4ebfd82c6e10d63348289675a8cba6d04c2c&',
      image: 'https://cdn.discordapp.com/attachments/1236634193019277322/1256240007169970258/NOW_WITH_MONA.gif?ex=66800c2d&is=667ebaad&hm=99aa0bd08020875ff5e204b6be7de9a2bdfda34b1a46f085cbcf1649a0b29708&',
      
      imageRoxy: {
         high: 'https://cdn.discordapp.com/attachments/1236634193019277322/1265318497857044620/roxy-migurdia-mushoku-tensei.gif?ex=66a1132e&is=669fc1ae&hm=178602d117c07565a5636e3e8927d2971755586f572e213bfe892594147f217e&',
         dance: 'https://cdn.discordapp.com/attachments/1236634193019277322/1265319106740224010/roxy-roxy-greyrat.gif?ex=66a113bf&is=669fc23f&hm=1cbfa8aa50f09b5e9d7da2a0f33a7d4bd60872b010fb410abfb000348f6ec6cd&',
      },

      author: {
         youtubes:   '───── ✦  𝗟 𝗜 𝗩 𝗘 🪐 ✦ ─────',
         youtubel:   '✦ ──── ──── ✦  𝗟 𝗜 𝗩 𝗘 🪐 ✦ ──── ──── ✦',
         spotify:    '✦ ──── ──── ✦  𝗟 𝗜 𝗩 𝗘 🪐 ✦ ──── ──── ✦',
         soundcloud: '✦ ──── ──── ✦  𝗟 𝗜 𝗩 𝗘 🪐 ✦ ──── ──── ✦',

         queue:   '✦ ───── ───── ✦  𝗣 𝗟 𝗔 𝗬  𝗟 𝗜 𝗦 𝗧 ❤️‍🔥 ✦ ───── ───── ✦',
         filter:  '✦ ───── ───── ✦  𝗙 𝗜 𝗟 𝗧 𝗘 𝗥 𝗦 🥝 ✦ ───── ───── ✦',
         search:  '✦ ───── ───── ✦  𝗥 𝗘 𝗦 𝗨 𝗟 𝗧 𝗦 🌸 ✦ ───── ───── ✦',
         grab:    '✦ ──── ──── ✦  𝗜 𝗡 𝗙 𝗢 𝗥 𝗠 𝗔 𝗧 𝗜 𝗢 𝗡 💖 ✦ ──── ──── ✦',
         help:    '✦ ───── ────── ────── ✦  𝗛 𝗘 𝗟 𝗣 🌕 ✦ ────── ────── ───── ✦',
      },
      icons: {
         youtube: 'https://cdn.discordapp.com/attachments/1236634193019277322/1265340646286163999/ytt.png?ex=66a127ce&is=669fd64e&hm=635cfcf631da2611485e90f6538a27aab7d945f509dff527014d822e8782e178&',
         spotify: 'https://cdn.discordapp.com/attachments/1236634193019277322/1265340646059937935/sp.png?ex=66a127ce&is=669fd64e&hm=e79be782efd972329c9bcfab23ae0868fb2fde9f685a58ec8fc943a8674311c9&',
         soundcloud: 'https://cdn.discordapp.com/attachments/1236634193019277322/1265340646558924913/sc.png?ex=66a127cf&is=669fd64f&hm=71ab291e0ef26098ba1d58243abd589cf9e04ca6dd16fd5cf7e933999a1f3548&',
      }
   },

   buttons: {
      shuf:    { id: '1268644355539992716' },
      prev:    { id: '1268562654067167303' },
      stop:    { id: '1268643214726795264' },
      skip:    { id: '1268562668357292113' },
      loop:    { id: '1268640178105225348' },
      
      queue:   { id: '1268577653519159422' },
      add:     { id: '1268652273765187744' },
      pause:   { id: '1268577758389469244' },
      resume:  { id: '1268651393401618512' },
      grab:    { id: '1268644302297239562' },
      clear:   { id: '1268577854652940360' },
   },

   presence: {
      status: process.env.status,
      
      name: process.env.name || '',
      state: process.env.state || '',
      type: parseInt(process.env.type) || 0,
   },

   invite: {
      status: Boolean(process.env.invite),
      vote: 'https://top.gg/bot/1236709052331982978/vote',
      url: 'https://discord.com/oauth2/authorize?client_id=1236709052331982978',
      guild: 'https://discord.gg/fTuGFk9ayG',
   },

   player: {
      maxVol: 100,
   },

   test: {
      status: Boolean(process.env.test),
   }
}