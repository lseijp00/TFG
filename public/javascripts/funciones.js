const localStorage = window.localStorage
const usernameLocalStorage = localStorage.getItem('username')
// ---------------- CAMBIAR NOMBRE USUARIO Y LETRA DEL AVATAR AL CAMBIAR A ESTA PAGINA  ----------------

const avatarUsuario = document.querySelector('.avatarUsuario')
const botonNombreUsuario = document.querySelector('.botonNombreUsuario')

botonNombreUsuario.innerHTML = usernameLocalStorage
avatarUsuario.innerHTML = usernameLocalStorage.charAt(0).toUpperCase()

document.querySelector('#inputInvisibleUsername').value = usernameLocalStorage

// ---------------- EVENTO AL PULSAR EL NOMBRE DEL USUARIO ----------------

const dropdown = document.querySelector('.dropdown-content')
const boton = document.querySelector('.botonNombreUsuario')

boton.onclick = function () {
  dropdown.classList.toggle('showDropContent')
}
// ---------------- SIDEBAR CIUDADES ----------------

const arrCiudades = ['Albacete', 'Alicante', 'Almeria', 'Avila', 'Badajoz', 'Barcelona', 'Bilbao', 'Burgos', 'Caceres', 'Cadiz', 'Castellon', 'CiudadReal', 'Cordoba', 'Corunia', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Jaen', 'Leon', 'Lerida', 'Logronio', 'Lugo', 'Madrid', 'Malaga', 'Murcia', 'Orense', 'Oviedo', 'Palencia', 'Pamplona', 'Pontevedra', 'Salamanca', 'Donostia', 'Santander', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vitoria', 'Zamora', 'Zaragoza']
const elemSelect = document.querySelector('#selectCiudad')
for (let i = 0; i < arrCiudades.length; i++) {
  const opt = document.createElement('option')
  opt.value = arrCiudades[i]
  opt.innerHTML = arrCiudades[i]
  elemSelect.appendChild(opt)
}

// ---------------- LOG OUT - ELIMINAR LOCAL STORAGE   ----------------

const myFormSignOut = document.querySelector('#my_formSignOut')
myFormSignOut.addEventListener('click', borrarStorage, false)

function borrarStorage() {
  localStorage.removeItem('sessionAbierta')
  localStorage.removeItem('username')
  localStorage.removeItem('firstLetterUsername')
  localStorage.removeItem('lugarVivienda')
}
