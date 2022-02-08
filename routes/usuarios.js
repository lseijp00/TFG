
const express = require('express')
const app = express()
const usuariosControllers = require('../controllers/controlador_users.js')

app.get('/registrar_usuario', usuariosControllers.registrarUsuario)
app.get('/logged_usuario', usuariosControllers.moveToLoggedUsuario)
app.get('/delete/:username', usuariosControllers.deleteUsuario)
app.get('/edit/:username/:new_username/:new_password', usuariosControllers.editUsuario)

app.post('/logged_usuario', usuariosControllers.authUsuario)
app.post('/', usuariosControllers.guardarUsuario)

module.exports = app
