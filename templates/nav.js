var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var type = state.params.type

  return html`
    <nav class="pa3 pa4-ns">
      <a class="link ${!type ? 'black b' : 'gray dim'} f6 f5-ns dib mr3"
        href="/" title="Inicio">
        Inventario
      </a>

      <a class="link ${type === 'in' ? 'black b' : 'gray dim'} f6 f5-ns dib mr3"
        href="/register/in" title="Registrar entradas">
        Registrar entradas
      </a>

      <a class="link ${type === 'out' ? 'black b' : 'gray dim'} f6 f5-ns dib mr3"
        href="/register/out" title="Registrar salidas">
        Registrar salidas
      </a>
    </nav>
  `
}
