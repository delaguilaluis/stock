const Dexie = require('dexie')

const db = new Dexie('inventory')
db.version(1).stores({ books: 'id,isbn,author,year,title,genre' })

module.exports = db
