'use strict'

module.exports = store

function store (state, emitter) {
  state.rows = []
  var id = 0

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
      }
    })
  })
}

function findRow (rows, id) {
  return rows.findIndex(function (row) { return row.id === id })
}
