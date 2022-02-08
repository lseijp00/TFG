const conexion = require('../config/conexion.js')
const usuario = require('../model/usuario.js')

module.exports = {

  authUsuario: function (req, res) {
    usuario.autenticar(conexion, req.body, function (_err, datos) {
      if (datos !== undefined && datos.length > 0) {
        const string1 = JSON.stringify(datos)
        const parsed = JSON.parse(string1)

        if (parsed[0].username !== 'admin' && parsed[0].password !== 'admin') {
          res.render('usuarios/logged_usuario', {
            itExists: true,
            usernameLogged: parsed[0].username,
            passwordLogged: parsed[0].password,
            lugarVivienda: parsed[0].lugar_vivienda
          })
        } else {
          usuario.mostrarTodos(conexion, req.body, function (err, datosUsuarios) {
            if (err) throw err

            const string1Usuarios = JSON.stringify(datosUsuarios)

            conexion.query('SELECT * FROM lugar', function (err, result) {
              if (err) throw err
              const result2 = JSON.parse(JSON.stringify(result))
              const ids = []
              const ciudades = []
              const categorias = []
              const descripciones = []
              const autores = []
              const likes = []
              const nivelesCovid = []
              const nivelesRestriccion = []

              result2.forEach(element => {
                ids.push(element.id)
                ciudades.push(element.ciudad)
                categorias.push(element.categoria)
                descripciones.push(element.descripcion + 'SEPARATION_BETW_DESCRI')
                autores.push(element.autor)
                likes.push(element.likes)
                nivelesCovid.push(element.nivel_covid)
                nivelesRestriccion.push(element.nivel_restriccion)
              })

              res.render('admin', {
                strDataUsuarios: string1Usuarios,
                itExists: true,
                ids: ids,
                usernameLogged: parsed[0].username,
                passwordLogged: parsed[0].password,
                result2: result2,
                ciudades: ciudades,
                categorias: categorias,
                descripciones: descripciones,
                autores: autores,
                likes: likes,
                niveles_covid: nivelesCovid,
                niveles_restriccion: nivelesRestriccion
              })
            })
          })
        }
      } else {
        res.render('usuarios/logged_usuario', { itExists: false })
      }
    })
  },

  // se mueve a la pagina de registro
  registrarUsuario: function (_req, res) {
    res.render('usuarios/registrar_usuario')
  },

  moveToLoggedUsuario: function (_req, res) {
    res.render('usuarios/logged_usuario')
  },

  // recibe la informacion del usuario y la guarda
  guardarUsuario: function (req, res) {
    usuario.añadir(conexion, req.body, () => {
      res.render('index')
    })
  },

  deleteUsuario: function (req, res) {
    const username = req.params.username

    conexion.query('DELETE FROM usuario WHERE username = ?', [username], (error, _results) => {
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
                const nivelesCovid = []
                const nivelesRestriccion = []

                result2.forEach(element => {
                  ids.push(element.id)
                  ciudades.push(element.ciudad)
                  categorias.push(element.categoria)
                  descripciones.push(element.descripcion + 'SEPARATION_BETW_DESCRI')
                  autores.push(element.autor)
                  likes.push(element.likes)
                  nivelesCovid.push(element.nivel_covid)
                  nivelesRestriccion.push(element.nivel_restriccion)
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

  editUsuario: function (req, res) {
    const username = req.params.username
    const newUsername = req.params.new_username
    const newPassword = req.params.new_password

    conexion.query('UPDATE usuario SET username=?, password=? WHERE username=?', [newUsername, newPassword, username], (error, _results) => {
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

                console.log(result2)

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
