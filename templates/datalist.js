'use strict'

var html = require('choo/html')

module.exports = template

function template (id, list) {
  return html`
    <datalist id=${id}>
      ${list.map(option)}
    </datalist>
  `
}

function option (element) {
  return html`
    <option value=${element}>
  `
}
