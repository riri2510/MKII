const { showModal } = require('../Functions')

module.exports = {
   name: 'playerAdd',
   run: async (interaction) => {
      try {
         await showModal(interaction, 'playerAddModal', 'Add Music', 'playerAddInput', 'Name', 'Enter music name or link')
      } catch (error) {
         console.log('❌   ✦ Add Error\n', error)
      }
   }
}