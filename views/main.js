var html = require('choo/html')
var rows = require('../templates/rows')

var TITLE = '🚂🚋🚋'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif">
      <h1 class="f2">
        Inventario
      </h1>

      <button class="f5 dim br-pill ph3 pv2 mb2 dib white bg-hot-pink bn pointer"
        onclick=${handleClick}>
        Agregar entrada
      </button>

      <table class="collapse ba br2 b--black-10 pv2 ph3">
        <tbody>
          <tr class="striped--near-white">
            <th class="pv2 ph3">Título</th>
            <th class="pv2 ph3">Autor</th>
            <th class="pv2 ph3">Año</th>
            <th class="pv2 ph3">ISBN</th>
            <th class="pv2 ph3">Género</th>
            <th class="pv2 ph3">Existencias</th>
            <th class="pv2 ph3">Precio (Q.)</th>
            <th class="pv2 ph3"></th>
          </tr>
          ${rows(state, emit)}
        </tbody>
      </table>
    </body>
  `

  function handleClick () {
    emit('rows:add')
  }
}
