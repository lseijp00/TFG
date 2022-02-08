const conexion = require('../config/conexion.js')
const imagen = require('../model/imagen.js')
const fs = require('fs')

module.exports = {

  mostrarImagenes: function (req, res) {
    imagen.mostrar(conexion, req.body, function (req, results) {
      const resultArray = Object.values(JSON.parse(JSON.stringify(results)))
      const newArr = resultArray.map(element => {
        if (element.ciudad.length !== 0 && element.categoria.length !== 0) {
          return element.username + element.indexFotoUsuario + '-' + element.ciudad + '-' + element.categoria + '.jpg'
        }
        return element.username + element.indexFotoUsuario + '.jpg'
      })
      res.render('imagenes/album', { album: newArr })
    })
  },

  guardarImagen: function (req, res) {
    const archivo = req.file
    const username = req.body.usernameValue
    const files = fs.readdirSync('public/css/images/imagenesAlbum/')

    if (!archivo) {
      return res.status(400).send({ message: 'Please upload a file.' })
    }

    let numImagenesUsuario = 0

    files.forEach(file => {
      if (file.includes(username)) {
        numImagenesUsuario++
      }
    })

    files.forEach((file, index) => {
      if (index === 0) {
        fs.rename(`public/css/images/imagenesAlbum/${file}`, `public/css/images/imagenesAlbum/${username}${numImagenesUsuario}.jpg`, function (err) {
          if (err) console.log(err.message)
        })
      }
    })

    imagen.añadir(conexion, req.body, function () {
    })
    res.redirect('../usuarios/logged_usuario')
  },

  editarImagen: function (req, res) {
    imagen.editar(conexion, req.body, function () {
      const { ciudad, categoria, usernameValueModal, indexBotonModal, ciudadVieja, categoriaVieja } = req.body

      const nombreImagenDDBB = usernameValueModal + indexBotonModal
      const nombrePorElQueCambiar = usernameValueModal + indexBotonModal + '-' + ciudad + '-' + categoria

      if (ciudadVieja === 'ciudad' || categoriaVieja === 'categoria') {
        fs.rename(`public/css/images/imagenesAlbum/${nombreImagenDDBB}` + '.jpg', 'public/css/images/imagenesAlbum/' + nombrePorElQueCambiar + '.jpg', function (err) {
          if (err) console.log(err.message)
        })
      } else {
        fs.rename(`public/css/images/imagenesAlbum/${nombreImagenDDBB}` + `-${ciudadVieja}-${categoriaVieja}.jpg`, 'public/css/images/imagenesAlbum/' + nombrePorElQueCambiar + '.jpg', function (err) {
          if (err) console.log(err.message)
        })
      }
      res.redirect('../usuarios/logged_usuario')
    })
  },

  borrarImagen: function (req, res) {
    const username = req.body.usernameValueModalDelete
    const numeroFotoPulsado = req.body.indexBotonModalDelete
    const nombreImagenDDBB = username + numeroFotoPulsado

    const files = fs.readdirSync('public/css/images/imagenesAlbum/')
    files.forEach((file, index) => {
      if (file.includes(nombreImagenDDBB)) {
        fs.unlinkSync('public/css/images/imagenesAlbum/' + file)
      }
    })

    const newFiles = fs.readdirSync('public/css/images/imagenesAlbum/')

    newFiles.forEach((file, index) => {
      if (file.includes(username) && parseInt(file[username.length]) > numeroFotoPulsado) {
        const numARestar = parseInt(file[username.length])
        const numeroFoto = numARestar - 1
        const fileSeparado = file.split('-')
        const ciudad = fileSeparado[1]
        let categoria = fileSeparado[2]
        if (categoria.includes('jpg')) {
          categoria = categoria.replace('.jpg', '')
        }

        const nameFileEditadoPrev = username + numeroFoto + '-' + ciudad + '-' + categoria + '.jpg'
        const nameFileNotEditPrev = username + numeroFoto + '.jpg'

        if (file.includes('-')) {
          fs.rename(`public/css/images/imagenesAlbum/${file}`, `public/css/images/imagenesAlbum/${nameFileEditadoPrev}`, err => {
            if (err) throw err
          })
        } else {
          fs.rename(`public/css/images/imagenesAlbum/${file}`, `public/css/images/imagenesAlbum/${nameFileNotEditPrev}`, err => {
            if (err) throw err
          })
        }
      }
    })

    imagen.borrar(conexion, req.body, function () {
      res.redirect('../usuarios/logged_usuario')
    })
  }

}
