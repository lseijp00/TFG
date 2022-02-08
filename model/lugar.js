const fs = require('fs')

module.exports = {

  mostrar: function (conexion, res, funcion) {
    conexion.query('SELECT * FROM lugar', function (err, result) {
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
  añadir: function (conexion, datos, funcion) {
    const datosInputs = datos.body
    const fileInput = datos.file

    const likesIniciales = 0
    conexion.query('INSERT INTO lugar (categoria,imagen_lugar,ciudad,descripcion,autor,likes,nivel_covid, nivel_restriccion) VALUES (?,?,?,?,?,?,?,?)',
      [datosInputs.categoria, fileInput.filename, datosInputs.ciudad, datosInputs.descripcion, datosInputs.username, likesIniciales, datosInputs.nivelCovid, datosInputs.nivelRestriccion],
      funcion)
  },
  seleccionarPorIndex: function (conexion, datos, funcion) {
    conexion.query('SELECT likes FROM lugar WHERE id=' + datos.indexCard, function (err, result) {
      if (err) throw err

      const likeAux = result[0].likes + 1

      conexion.query('UPDATE `lugar` SET likes = (?) where id=' + datos.indexCard, [likeAux], function (err, result) {
        if (err) throw err
      })
    })
  }

}
