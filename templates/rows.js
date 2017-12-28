'use strict'

require('isbn')
var html = require('choo/html')
var extend = require('extend')
var ISBN = window.ISBN

module.exports = template

function template (state, emit) {
  return state.books.map(row)

  function row (book) {
    return html`
      <tr class="striped--near-white">
        <td>
          <input id="isbn${book.id}" type="number" min="0"
            class="bg-transparent pa1 ${book.validISBN === false ? 'red' : ''}"
            value="${str(book['isbn'])}" onchange=${handleISBNChange(book)}
            onkeypress=${handleMaxDigits(13)}/>
        </td>
        <td>
          <input class="bg-transparent pa1" id="author${book.id}"
            maxlength="140"
            value="${str(book['author'])}"
            onchange=${handleChange('author', book)}/>
        </td>
        <td>
          <input class="bg-transparent pa1" id="year${book.id}"
            type="number" min="0"
            value="${str(book['year'])}" onchange=${handleChange('year', book)}
            onkeypress=${handleMaxDigits(4)}/>
        </td>
        <td>
          <input class="bg-transparent pa1" id="title${book.id}"
            maxlength="140" value="${str(book['title'])}"
            onchange=${handleChange('title', book)}/>
        </td>
        <td>
          <input class="bg-transparent pa1" id="genre${book.id}"
            list="genres" value="${str(book['genre'])}"
            onchange=${handleListChange('genres', 'genre', book)}/>
        </td>
        <td>
          <input class="bg-transparent pa1" id="stock${book.id}" readonly
            type="number" value="${str(book['stock'])}"/>
        </td>
        <td>
          <input class="dim bg-transparent red pv1 ph2" id="delete${book.id}"
            type="button" value="✘" onclick=${handleDeleteClick}/>
        </td>
      </tr>
    `
  }

  function str (x) {
    return x === undefined ? '' : x
  }

  function emitNewRow (columnName, book, value) {
    emit('books:update', extend(book, {
      [columnName]: value
    }))
  }

  function handleChange (columnName, book) {
    return function (event) {
      var value = event.target.value
      emitNewRow(columnName, book, value)
    }
  }

  function handleListChange (list, columnName, book) {
    return function (event) {
      var value = event.target.value

      // Don't allow values that are not present on the drop down list
      if (state[list].indexOf(value) === -1) {
        emitNewRow(columnName, book, undefined)
      } else {
        emitNewRow(columnName, book, value)
      }
    }
  }

  function handleMaxDigits (max) {
    return function (event) {
      // Only allow digit inputs
      if (event.code.indexOf('Digit') === -1) { event.preventDefault() }

      var value = event.target.value
      if (String(value).length >= max) { event.preventDefault() }
    }
  }

  function handleISBNChange (book) {
    return function (event) {
      var value = event.target.value
      var result = ISBN.parse(value)

      if (!result) {
        book.validISBN = false
      } else {
        book.validISBN = result.isIsbn13() || result.isIsbn10()
      }

      handleChange('isbn', book)(event)
    }
  }

  function handleDeleteClick (e) {
    // Get book ID (number) from target's ID (string)
    var id = +e.target.id.replace('delete', '')
    var book = state.books.find(function (book) { return book.id === id })

    // New books just have one key (id)
    var hasChanged = Object.keys(book).length > 1
    var shouldDelete = !hasChanged || window.confirm('¿Eliminar este libro?')

    if (shouldDelete) {
      emit('books:delete', id)
    }
  }
}
