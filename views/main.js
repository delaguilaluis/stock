var html = require('choo/html')
var rows = require('../templates/rows')
var nav = require('../templates/nav')
var datalist = require('../templates/datalist')

var TITLE = 'Inventario'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`<body class="sans-serif">
    ${nav(state, emit)}

    <button class="f4 dim b pv1 ph3 mb2 mh4 dib green b--light-silver pointer"
      onclick=${handleClick}>
      +
    </button>

    <table class="collapse ba br2 b--black-10 pv2 ph3 mv2 mh4">
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
  </body>`

  function handleClick () {
    emit('rows:add')
  }
}
