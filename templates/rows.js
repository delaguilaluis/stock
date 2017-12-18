'use strict'

var html = require('choo/html')
var extend = require('extend')

var types = {
  stock: 'integer',
  price: 'decimal'
}

module.exports = template

function template (state, emit) {
  return state.rows.map(function (row) {
    return html`<tr class="striped--near-white">
      <td>
        <input class="bg-transparent pv2 ph3" id="title${row.id}"
          maxlength="140"
          value="${str(row['title'])}" onchange=${handleChange('title', row)}/>
      </td>
      <td>
        <input class="bg-transparent pv2 ph3" id="author${row.id}"
          maxlength="140"
          value="${str(row['author'])}"
          onchange=${handleChange('author', row)}/>
      </td>
      <td>
        <input class="bg-transparent pv2 ph3" id="year${row.id}"
          type="number" min="0"
          value="${str(row['year'])}" onchange=${handleChange('year', row)}
          onkeypress=${handleMaxDigits(4)}/>
      </td>
      <td>
        <input class="bg-transparent pv2 ph3" id="ISBN${row.id}"
          type="number" min="0"
          value="${str(row['ISBN'])}" onchange=${handleChange('ISBN', row)}
          onkeypress=${handleMaxDigits(13)}/>
      </td>
      <td>
        <input class="bg-transparent pv2 ph3" id="genre${row.id}"
          maxlength="70"
          value="${str(row['genre'])}" onchange=${handleChange('genre', row)}/>
      </td>
      <td>
        <input class="bg-transparent pv2 ph3" id="stock${row.id}"
          type="number"
          value="${str(row['stock'])}" onchange=${handleChange('stock', row)}/>
      </td>
      <td>
        <input class="bg-transparent pv2 ph3" id="price${row.id}"
          type="number" placeholder="0.00" step="0.01" min="0.00"
          value="${str(row['price'])}" onchange=${handleChange('price', row)}/>
      </td>
      <td>
        <input class="bg-transparent red pv2 ph3" id="delete${row.id}"
          type="button" value="✖" onclick=${handleDeleteClick}/>
      </td>
    </tr>`
  })

  function str (x) {
    return x || ''
  }

  function handleChange (columnName, row) {
    return function (event) {
      var value = document.getElementById(`${columnName}${row.id}`).value

      var newRow = extend(row, {
        [columnName]: coerce(columnName, value)
      })

      emit('input', newRow)
    }
  }

  function handleMaxDigits (max) {
    return function (e) {
      // Only allow digit inputs
      if (e.code.indexOf('Digit') === -1) { e.preventDefault() }

      var value = document.getElementById(e.target.id).value
      if (String(value).length >= max) { e.preventDefault() }
    }
  }

  function coerce (columnName, value) {
    var type = types[columnName]

    switch (type) {
      case 'integer':
        return Math.round(parseFloat(value))
      case 'decimal':
        return parseFloat(value).toFixed(2)
    }

    return value
  }

  function handleDeleteClick (e) {
    // Get row ID (number) from target's ID (string)
    emit('rows:delete', +e.target.id.replace('delete', ''))
  }
}
