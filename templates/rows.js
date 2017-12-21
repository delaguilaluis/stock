'use strict'

require('isbn')
var html = require('choo/html')
var extend = require('extend')
var ISBN = window.ISBN

var types = {
  stock: 'integer',
  price: 'decimal'
}

module.exports = template

function template (state, emit) {
  return state.rows.map(function (row) {
    return html`<tr class="striped--near-white">
      <td>
        <input id="ISBN${row.id}" type="number" min="0"
          class="bg-transparent pa1 ${row.validISBN === false ? 'red' : ''}"
          value="${str(row['ISBN'])}" onchange=${handleISBNChange(row)}
          onkeypress=${handleMaxDigits(13)}/>
      </td>
      <td>
        <input class="bg-transparent pa1" id="author${row.id}"
          maxlength="140"
          value="${str(row['author'])}"
          onchange=${handleChange('author', row)}/>
      </td>
      <td>
        <input class="bg-transparent pa1" id="year${row.id}"
          type="number" min="0"
          value="${str(row['year'])}" onchange=${handleChange('year', row)}
          onkeypress=${handleMaxDigits(4)}/>
      </td>
      <td>
        <input class="bg-transparent pa1" id="title${row.id}"
          maxlength="140"
          value="${str(row['title'])}" onchange=${handleChange('title', row)}/>
      </td>
      <td>
        <input class="bg-transparent pa1" id="genre${row.id}"
          list="genres" value="${str(row['genre'])}"
          onchange=${handleListChange('genres', 'genre', row)}/>
      </td>
      <td>
        <input class="bg-transparent pa1" id="stock${row.id}"
          type="number" value="${str(row['stock'])}"
          onchange=${handleNumberChange('stock', row)}/>
      </td>
      <td>
        <input class="bg-transparent pa1" id="price${row.id}"
          type="number" placeholder="0.00" step="0.01" min="0.00"
          value="${str(row['price'])}"
          onchange=${handleNumberChange('price', row)}/>
      </td>
      <td>
        <input class="bg-transparent red pv1 ph2" id="delete${row.id}"
          type="button" value="✖" onclick=${handleDeleteClick}/>
      </td>
    </tr>`
  })

  function str (x) {
    return x === undefined ? '' : x
  }

  function emitNewRow (columnName, row, value) {
    emit('input', extend(row, {
      [columnName]: value
    }))
  }

  function handleChange (columnName, row) {
    return function (event) {
      var value = document.getElementById(`${columnName}${row.id}`).value
      emitNewRow(columnName, row, value)
    }
  }

  function handleNumberChange (columnName, row) {
    return function (event) {
      var value = document.getElementById(`${columnName}${row.id}`).value
      var type = types[columnName]
      emitNewRow(columnName, row, coerce(type, value))
    }
  }

  function handleListChange (list, columnName, row) {
    return function (event) {
      var value = document.getElementById(`${columnName}${row.id}`).value

      // Don't allow values that are not present on the drop down list
      if (state[list].indexOf(value) === -1) {
        emitNewRow(columnName, row, undefined)
      } else {
        emitNewRow(columnName, row, value)
      }
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

  function handleISBNChange (row) {
    return function (e) {
      var value = document.getElementById(e.target.id).value
      var result = ISBN.parse(value)

      if (!result) {
        row.validISBN = false
      } else {
        row.validISBN = result.isIsbn13() || result.isIsbn10()
      }

      handleChange('ISBN', row)(e)
    }
  }

  function coerce (type, value) {
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
