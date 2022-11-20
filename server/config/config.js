const Pool = require('pg').Pool

const connection = new Pool({
    user: 'elyza',
    host: 'localhost',
    database: 'postgres',
    password: 'alessi00',
    port: 5432
})

module.exports = {
    connection
}