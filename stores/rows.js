'use strict'

module.exports = store

function store (state, emitter) {
  state.rows = []

  emitter.on('DOMContentLoaded', function () {
    emitter.on('rows:add', function () {
      state.rows.push({ id: state.rows.length })
      emitter.emit(state.events.RENDER)
    })

    emitter.on('input', function (row) {
      state.rows[row.index] = row
    })
  })
}
