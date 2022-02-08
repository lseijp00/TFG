const fs = require('fs')

module.exports = {

  mostrar: function (conexion, datos, funcion) {
    conexion.query('SELECT * FROM imagen where username = ?', [datos.username], funcion)
  },

  añadir: function (conexion, datos, funcion) {
    let indexFoto = datos.carouselLength
    if (indexFoto === 1) indexFoto = 0

    conexion.query('INSERT INTO imagen (username,indexFotoUsuario) VALUES (?,?)', [datos.usernameValue, indexFoto], funcion)
  },

  editar: function (conexion, datos, funcion) {
    conexion.query('UPDATE imagen SET ciudad = ?, categoria = ? WHERE username = ? AND indexFotoUsuario = ?', [datos.ciudad, datos.categoria, datos.usernameValueModal, datos.indexBotonModal], funcion)
  },

  borrar: function (conexion, datos, funcion) {
    const username = datos.usernameValueModalDelete

    conexion.query('DELETE FROM imagen where username=(?)', [username], funcion)

    const files = fs.readdirSync('public/css/images/imagenesAlbum/')
    const filesUsuario = files.filter(file => file.includes(username))

    const ciudades = []
    const categorias = []

    for (let i = 0; i < files.length; i++) {
      const elementosNombreImagen = files[i].split('-')

      if (elementosNombreImagen.length > 1) {
        ciudades.push(elementosNombreImagen[1])
        categorias.push(elementosNombreImagen[2].replace('.jpg', ''))
      }
    }

    for (let i = 0; i < filesUsuario.length; i++) {
      if (filesUsuario[i].includes('-')) {
        for (let j = 0; j < ciudades.length; j++) {
          if (filesUsuario[i].includes(ciudades[j]) && filesUsuario[i].includes(categorias[j])) {
            conexion.query('INSERT INTO imagen (username, indexFotoUsuario, ciudad, categoria) VALUES (?,?,?,?)', [username, i, ciudades[j], categorias[j]], function (err) {
              if (err) throw err
            })
          }
        }
      } else {
        conexion.query('INSERT INTO imagen (username, indexFotoUsuario) VALUES (?,?)', [username, i], function (err) {
          if (err) throw err
        })
      }
    }
  }

}
