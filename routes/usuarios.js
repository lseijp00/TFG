
const express = require('express')
const app = express()
const usuariosController = require('../controllers/controlador_users.js')

app.get('/registrar_usuario', usuariosController.registrarUsuario)

app.get('/logged_usuario', usuariosController.moveToLoggedUsuario)
app.get('/delete/:username', usuariosController.deleteUsuario)
app.get('/edit/:username/:new_username/:new_password', usuariosController.editUsuario)

app.post('/logged_usuario', usuariosController.authUsuario)
app.post('/', usuariosController.guardarUsuario)

module.exports = app
