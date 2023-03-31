const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zatsatheman123",
    database:"housedata" 
})

module.exports = db;