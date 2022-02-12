module.exports = {
  añadir: function (conexion, datos, funcion) {
    conexion.query('INSERT INTO mensaje (user,asunto,mensaje) VALUES (?,?,?)',
      [datos.username, datos.asunto, datos.mensaje],
      funcion)
  }
}
