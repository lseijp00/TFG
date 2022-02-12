const express = require('express')
const logger = require('morgan')
const path = require('path')
const app = express()

const indexRouter = require('./routes/index')
const userRouter = require('./routes/usuarios')
const imagenRouter = require('./routes/imagenes')
const lugarRouter = require('./routes/lugares')
const mensajeRouter = require('./routes/mensajes')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.static('./views'))
app.use(express.static('./public/css'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({ extends: false }))

app.use('/', indexRouter)
app.use('/imagenes', imagenRouter)
app.use('/usuarios', userRouter)
app.use('/lugares', lugarRouter)
app.use('/mensajes', mensajeRouter)

app.listen('3000', function () {
  console.log('aplicacion iniciada en el puerto 3000')
})

module.exports = app
