var VueClipboard = require('./vue-clipboard.js')

global.VueClipboard = VueClipboard

window.App && global.App.use(VueClipboard)
