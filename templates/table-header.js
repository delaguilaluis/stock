var html = require('choo/html')

module.exports = view

function view (header) {
  return html`
    <th class="pv2 ph1 tl f6 fw6 ttu">
      ${header}
    </th>
  `
}
