'use strict'

var html = require('choo/html')
var extend = require('extend')

module.exports = template

function template (state, emit) {
  return state.rows.map(function (row, i) {
    return html`<tr>
      <td>
        <input class="ba" id="title${i}" value="${str(row['title'])}"
          onchange=${handleInput('title', row, i)}/>
      </td>
      <td>
        <input class="ba" id="author${i}" value="${str(row['author'])}"
          onchange=${handleInput('author', row, i)}/>
      </td>
      <td>
        <input class="ba" id="year${i}" value="${str(row['year'])}"
          onchange=${handleInput('year', row, i)}/>
      </td>
      <td>
        <input class="ba" id="ISBN${i}" value="${str(row['ISBN'])}"
          onchange=${handleInput('ISBN', row, i)}/>
      </td>
      <td>
        <input class="ba" id="genre${i}" value="${str(row['genre'])}"
          onchange=${handleInput('genre', row, i)}/>
      </td>
      <td>
        <input class="ba" id="stock${i}" value="${str(row['stock'])}"
          onchange=${handleInput('stock', row, i)}/>
      </td>
      <td>
        <input class="ba" id="price${i}" value="${str(row['price'])}"
          onchange=${handleInput('price', row, i)}/>
      </td>
    </tr>`
  })

  function str (x) {
    return x || ''
  }

  function handleInput (columnName, row, index) {
    return function (/* event */) {
      var newRow = extend(row, {
        index: index,
        [columnName]: document.getElementById(`${columnName}${index}`).value
      })

      emit('input', newRow)
    }
  }
}
