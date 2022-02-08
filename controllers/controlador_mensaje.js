const conexion = require('../config/conexion.js')
const mensaje = require('../model/mensaje.js')

module.exports = {

  guardarMensaje: function (req, res) {
    mensaje.añadir(conexion, req.body, () => {
      res.redirect('../usuarios/logged_usuario')
    })
  }

}
