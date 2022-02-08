const express = require('express')
const app = express()
const mensajesControllers = require('../controllers/controlador_mensaje.js')

app.post('/submit_message', mensajesControllers.guardarMensaje)

module.exports = app
