var html = require('choo/html')
var rows = require('../templates/rows')
var datalist = require('../templates/datalist')

var TITLE = '🚂🚋🚋'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif">
      <h1 class="f2 ma2">
        Inventario
      </h1>

      <button class="f5 dim br-pill pv2 ph1 mb2 mh2 dib white bg-hot-pink bn pointer"
        onclick=${handleClick}>
        Agregar entrada
      </button>

      <table class="collapse ba br2 b--black-10 pv2 ph3 ma2">
        <tbody>
          <tr class="striped--near-white">
          <th class="pv2 ph1 tl f6 fw6 ttu">ISBN</th>
          <th class="pv2 ph1 tl f6 fw6 ttu">Autor</th>
          <th class="pv2 ph1 tl f6 fw6 ttu">Año</th>
          <th class="pv2 ph1 tl f6 fw6 ttu">Título</th>
          <th class="pv2 ph1 tl f6 fw6 ttu">Género</th>
          <th class="pv2 ph1 tl f6 fw6 ttu">Existencias</th>
          <th class="pv2 ph1 tl f6 fw6 ttu"></th>
          </tr>
          ${rows(state, emit)}
        </tbody>
      </table>

      ${datalist('genres', state.genres)}
    </body>
  `

  function handleClick () {
    emit('rows:add')
  }
}
