var mysql = require("mysql")

const conector = mysql.createConnection(
    {
        host:"localhost",
        user:"luis",
        password:"123456",
        database:"tfg_proyectotest",
        multipleStatements: true,
    }
)

module.exports=conector


