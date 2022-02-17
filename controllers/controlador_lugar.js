const conexion = require('../config/conexion.js')
const lugar = require('../model/lugar.js')
const fs = require('fs')

module.exports = {

  moveToBuscarLugar: function (req, res) {
    lugar.mostrar(conexion, res, function () {
    })
  },

  moveToNuevoLugar: function (req, res) {
    res.render('lugares/nuevo_lugar')
  },

  crearLugar: function (req, res) {
    if (req.file === undefined) {
      return res.send('Debes seleccionar una imagen.')
    }

    lugar.añadir(conexion, req, function (err, result) {
      if (err) throw err
    })
    res.redirect('nuevo_lugar')
  },

  updateLike: function (req, res) {
    lugar.seleccionarPorIndex(conexion, req.body, function (err, result) {
      if (err) throw err
    })

    res.redirect('buscar_lugar')
  },

  buscarCiudad: function (req, res) {
    conexion.query('SELECT * FROM lugar where ciudad =(?)', [req.body.miCiudad], function (err, result) {
      if (err) throw err

      const dataLugares = JSON.parse(JSON.stringify(result))

      const ids = dataLugares.map(element => element.id)
      const ciudades = dataLugares.map(element => element.ciudad)
      const categorias = dataLugares.map(element => element.categoria)
      const descripciones = dataLugares.map(element => element.descripcion + 'SEPARATION_BETW_DESCRI')
      const autores = dataLugares.map(element => element.autor)
      const likes = dataLugares.map(element => element.likes)
      const imagenesLugar = dataLugares.map(element => element.imagen_lugar)

      fs.readFile('distancias.json', (err, data) => {
        if (err) throw err
        const distancias = JSON.parse(data)

        res.render('lugares/buscar_lugar', {
          ids: ids,
          distancias: distancias,
          ciudades: ciudades,
          categorias: categorias,
          descripciones: descripciones,
          autores: autores,
          likes: likes,
          imagenesLugar: imagenesLugar,
          dataLugares: dataLugares
        })
      })
    })
  },

  buscarCategoria: function (req, res) {
    conexion.query('SELECT * FROM lugar where categoria =(?)', [req.body.miCategoria], function (err, result) {
      if (err) throw err

      const dataLugares = JSON.parse(JSON.stringify(result))

      res.render('categoria', { dataLugares: dataLugares, categorias: req.body.miCategoria })
    })
  },

  deleteLugar: function (req, res) {
    const id = req.params.id
    console.log('este es el id ' + id)

    conexion.query('DELETE FROM lugar WHERE id = ?', [id], (error) => {
      if (error) {
        throw error
      } else {
        conexion.query('SELECT * FROM `usuario`', (error, datosUsuarios) => {
          if (error) {
            throw error
          } else {
            conexion.query('SELECT * FROM `lugar`', (error, datosLugares) => {
              if (error) {
                throw error
              } else {
                const string1 = JSON.stringify(datosUsuarios)

                const result2 = JSON.parse(JSON.stringify(datosLugares))
                const ids = []
                const ciudades = []
                const categorias = []
                const descripciones = []
                const autores = []
                const likes = []

                result2.forEach(element => {
                  ids.push(element.id)
                  ciudades.push(element.ciudad)
                  categorias.push(element.categoria)
                  descripciones.push(element.descripcion + 'SEPARATION_BETW_DESCRI')
                  autores.push(element.autor)
                  likes.push(element.likes)
                })

                res.render('admin', {
                  strDataUsuarios: string1,
                  ids: ids,
                  result2: result2,
                  ciudades: ciudades,
                  categorias: categorias,
                  descripciones: descripciones,
                  autores: autores

                })
              }
            })
          }
        })
      }
    })
  },

  editLugar: function (req, res) {
    const id = req.params.id
    const newCategory = req.params.new_category
    const newCity = req.params.new_city
    const newDescription = req.params.new_description
    console.log('esta es la descripcion ' + newDescription)
    conexion.query('UPDATE lugar SET categoria=?, descripcion=?, ciudad=? WHERE id=?', [newCategory, newDescription, newCity, id], (error) => {
      if (error) {
        throw error
      } else {
        conexion.query('SELECT * FROM `usuario`', (error, datosUsuarios) => {
          if (error) {
            throw error
          } else {
            conexion.query('SELECT * FROM `lugar`', (error, datosLugares) => {
              if (error) {
                throw error
              } else {
                const string1 = JSON.stringify(datosUsuarios)

                const result2 = JSON.parse(JSON.stringify(datosLugares))
                const ids = []
                const ciudades = []
                const categorias = []
                const descripciones = []
                const autores = []
                const likes = []

                result2.forEach(element => {
                  ids.push(element.id)
                  ciudades.push(element.ciudad)
                  categorias.push(element.categoria)
                  descripciones.push(element.descripcion + 'SEPARATION_BETW_DESCRI')
                  autores.push(element.autor)
                  likes.push(element.likes)
                })

                res.render('admin', {
                  strDataUsuarios: string1,
                  ids: ids,
                  result2: result2,
                  ciudades: ciudades,
                  categorias: categorias,
                  descripciones: descripciones,
                  autores: autores

                })
              }
            })
          }
        })
      }
    })
  }
}
