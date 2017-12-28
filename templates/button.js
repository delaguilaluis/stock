var html = require('choo/html')

module.exports = view

function view (text, handleClick) {
  return html`
    <button class="f4 dim b pv1 ph3 mb2 mh4 dib green b--light-silver pointer"
      onclick=${handleClick}>
      ${text}
    </button>
  `
}
