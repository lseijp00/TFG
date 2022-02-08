module.exports = {

  autenticar: function (conexion, datos, funcion) {
    conexion.query('SELECT * FROM `usuario` WHERE username=? AND password=?', [datos.username, datos.password], funcion)
  },

  añadir: function (conexion, datos, funcion) {
    conexion.query('INSERT INTO usuario (nombre,apellido,username,password,lugar_vivienda) VALUES (?,?,?,?,?)', [datos.nombre, datos.apellido, datos.username, datos.password, datos.lugar_vivienda], funcion)
  },
  mostrarTodos: function (conexion, datos, funcion) {
    conexion.query('SELECT * FROM `usuario`', funcion)
  }

}
