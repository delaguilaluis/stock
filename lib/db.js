const Dexie = require('dexie')

const db = new Dexie('stock')
db.version(1).stores({ books: 'id,isbn,author,year,title,genre' })

module.exports = db
