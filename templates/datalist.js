'use strict'

var html = require('choo/html')

module.exports = template

function template (id, list) {
  return html`<datalist id=${id}>
    ${list.map(function (element) { return html`<option value=${element}>` })}
  </datalist>`
}
