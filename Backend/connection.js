const {Client} = require('pg')
const client = new Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'alpha',
    database:'postgres'

})
client.connect()

console.log("Database Connected ", Date.now())

module.exports = client