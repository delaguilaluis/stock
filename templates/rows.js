'use strict'

var html = require('choo/html')
var extend = require('extend')

module.exports = template

function template (state, emit) {
  return state.rows.map(function (row) {
    return html`<tr>
      <td>
        <input class="ba" id="title${row.id}" value="${str(row['title'])}"
          onchange=${handleInput('title', row)}/>
      </td>
      <td>
        <input class="ba" id="author${row.id}" value="${str(row['author'])}"
          onchange=${handleInput('author', row)}/>
      </td>
      <td>
        <input class="ba" id="year${row.id}" value="${str(row['year'])}"
          onchange=${handleInput('year', row)}/>
      </td>
      <td>
        <input class="ba" id="ISBN${row.id}" value="${str(row['ISBN'])}"
          onchange=${handleInput('ISBN', row)}/>
      </td>
      <td>
        <input class="ba" id="genre${row.id}" value="${str(row['genre'])}"
          onchange=${handleInput('genre', row)}/>
      </td>
      <td>
        <input class="ba" id="stock${row.id}" value="${str(row['stock'])}"
          onchange=${handleInput('stock', row)}/>
      </td>
      <td>
        <input class="ba" id="price${row.id}" value="${str(row['price'])}"
          onchange=${handleInput('price', row)}/>
      </td>
      <td>
        <input type="button" id="delete${row.id}" value="❌"
          onclick=${handleDeleteClick}/>
      </td>
    </tr>`
  })

  function str (x) {
    return x || ''
  }

  function handleInput (columnName, row) {
    return function (event) {
      var newRow = extend(row, {
        [columnName]: document.getElementById(`${columnName}${row.id}`).value
      })

      emit('input', newRow)
    }
  }

  function handleDeleteClick (e) {
    // Get row ID (number) from target's ID (string)
    emit('rows:delete', +e.target.id.replace('delete', ''))
  }
}
