'use strict'

const db = require('../lib/db')

module.exports = store

function store (state, emitter) {
  state.books = []
  state.genres = [
    'Arte y fotografía',
    'Biografías y memorias',
    'Ciencia ficción y fantasía',
    'Cocina, comida y vino',
    'Historia',
    'Jóvenes',
    'Libros para niños',
    'Literatura y ficción',
    'Misterio y suspenso',
    'Otro',
    'Romance'
  ]

  db.books.toArray()
    .then((books) => emitter.emit('books:retrieve', books))

  emitter.on('DOMContentLoaded', function () {
    emitter.on('books:add', function () {
      state.books.unshift({ id: Date.now() })

      emitter.emit(state.events.RENDER)
    })

    emitter.on('books:delete', function (id) {
      var foundIndex = findRow(state.books, id)

      if (foundIndex !== -1) {
        state.books.splice(foundIndex, 1)

        // @TODO handle errors
        db.books.delete(id)

        emitter.emit(state.events.RENDER)
      }
    })

    emitter.on('books:update', function (newRow) {
      var foundIndex = findRow(state.books, newRow.id)

      if (foundIndex !== -1) {
        state.books[foundIndex] = newRow

        emitter.emit(state.events.RENDER)

        // @TODO Handle errors
        db.books.put(newRow)
      }
    })

    emitter.on('books:retrieve', function (books) {
      state.books = books

      emitter.emit(state.events.RENDER)
    })
  })
}

function findRow (books, id) {
  return books.findIndex(function (book) { return book.id === id })
}
