var html = require('choo/html')
var nav = require('../templates/nav')

var TITLE = 'Registrar entradas'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`<body class="sans-serif">
    ${nav(state, emit)}
  </body>`
}
