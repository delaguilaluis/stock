var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var type = state.params.type

  return html`<nav class="pa3 pa4-ns">
    <a class="link dim ${!type ? 'black b' : 'gray'} f6 f5-ns dib mr3"
      href="/" title="Inicio">
      Inventario
    </a>

    <a class="link dim ${type === 'in' ? 'black b' : 'gray'} f6 f5-ns dib mr3"
      href="/register/in" title="Registrar entradas">
      Registrar entradas
    </a>

    <a class="link dim ${type === 'out' ? 'black b' : 'gray'} f6 f5-ns dib mr3"
      href="/register/out" title="Registrar salidas">
      Registrar salidas
    </a>
  </nav>`
}
