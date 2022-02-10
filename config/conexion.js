const mysql = require('mysql')

const conector = mysql.createConnection(
  {
    host: 'localhost',
    user: 'luis',
    password: '123456',
    database: 'database_appinterest',
    multipleStatements: true
  }
)

module.exports = conector
