var html = require('choo/html')
var rows = require('../templates/rows')
var nav = require('../templates/nav')
var datalist = require('../templates/datalist')
var tableHeader = require('../templates/table-header')
var button = require('../templates/button')

var TITLE = 'Inventario'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif">
      ${nav(state, emit)}
      ${button('+', handleClick)}

      <table class="collapse ba br2 b--black-10 pv2 ph3 mv2 mh4">
        <tbody>
          <tr class="striped--near-white">
            ${tableHeader('ISBN')}
            ${tableHeader('Autor')}
            ${tableHeader('Año')}
            ${tableHeader('Título')}
            ${tableHeader('Género')}
            ${tableHeader('Existencias')}
            ${tableHeader('')}
          </tr>
          ${rows(state, emit)}
        </tbody>
      </table>

      ${datalist('genres', state.genres)}
    </body>
  `

  function handleClick () {
    emit('books:add')
  }
}
