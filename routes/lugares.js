const express = require('express')
const app = express()
const path = require('path')
const lugaresControllers = require('../controllers/controlador_lugar.js')

const multer = require('multer')

const fileStorageEngine = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, './public/css/images/imagenesLugar/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }

})

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  }
})

app.get('/nuevo_lugar', lugaresControllers.moveToNuevoLugar)
app.get('/buscar_lugar', lugaresControllers.moveToBuscarLugar)
app.get('/delete/:id', lugaresControllers.deleteLugar)
app.get('/edit/:id/:new_category/:new_city/:new_description', lugaresControllers.editLugar)

// POST

app.post('/add_lugar', upload.single('myImage'), lugaresControllers.crearLugar)

app.post('/request_ciudad', lugaresControllers.buscarCiudad)
app.post('/request_categoria', lugaresControllers.buscarCategoria)

app.post('/update_like', lugaresControllers.updateLike)

module.exports = app
