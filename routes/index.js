const express = require('express')
const app = express()

// GET
app.get('/', function (req, res) {
  res.render('index')
})

app.get('/about', function (req, res) {
  res.render('about')
})

app.get('/logout', function (req, res) {
  res.render('index')
})

// POST

app.post('/resultados_acordes_busqueda', function (req, res) {
  res.render('categoria', {
    distancia: req.body.distancia
  })
})

app.post('/categoria', function (req, res) {
  res.render('categoria', {
    categoria: req.body.miCategoria
  })
})

module.exports = app
