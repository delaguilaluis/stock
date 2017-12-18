'use strict'

module.exports = store

function store (state, emitter) {
  var id = 0
  state.rows = []
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

  emitter.on('DOMContentLoaded', function () {
    emitter.on('rows:add', function () {
      state.rows.push({ id: id })
      id += 1

      emitter.emit(state.events.RENDER)
    })

    emitter.on('rows:delete', function (id) {
      var foundIndex = findRow(state.rows, id)

      if (foundIndex !== -1) {
        state.rows.splice(foundIndex, 1)

        emitter.emit(state.events.RENDER)
      }
    })

    emitter.on('input', function (newRow) {
      var foundIndex = findRow(state.rows, newRow.id)

      if (foundIndex !== -1) {
        state.rows[foundIndex] = newRow

        emitter.emit(state.events.RENDER)
      }
    })
  })
}

function findRow (rows, id) {
  return rows.findIndex(function (row) { return row.id === id })
}