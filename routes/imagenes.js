const express = require('express')
const app = express()
const imagenesControllers = require('../controllers/controlador_imagen.js')
const multer = require('multer')
const mimeTypesFilter = require('@meanie/multer-mime-types-filter')

const fileStorageEngine = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, './public/css/images/imagenesAlbum/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }

})

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: mimeTypesFilter(['image/jpeg', 'image/png', 'image/gif'])
})

// POST
app.post('/album', imagenesControllers.mostrarImagenes)
app.post('/subir_imagen', upload.single('file'), imagenesControllers.guardarImagen)
app.post('/editar_imagen', imagenesControllers.editarImagen)
app.post('/delete_imagen', imagenesControllers.borrarImagen)
module.exports = app
