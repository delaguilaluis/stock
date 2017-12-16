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

      <table class="ba">
        <tr>
          <td>Título</td>
          <td>Autor</td>
          <td>Año</td>
          <td>ISBN</td>
          <td>Género</td>
          <td>Existencias</td>
          <td>Precio</td>
        </tr>
        ${rows(state, emit)}
      </table>
    </body>
  `

  function handleClick () {
    emit('rows:add')
  }
}
