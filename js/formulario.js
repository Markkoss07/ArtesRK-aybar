//FORMULARIO


const btnIniciar = document.querySelector('#iniciar'),
	 btnInscribir = document.querySelector('#inscribir'),
	 formRegistro = document.querySelector('.registrate'),
	 formLoguearse = document.querySelector('.login');

btnIniciar.addEventListener('click', e => {
	formRegistro.classList.add('oculto');
	formLoguearse.classList.remove('oculto');
})

btnInscribir.addEventListener('click', e => {
	formLoguearse.classList.add('oculto');
	formRegistro.classList.remove('oculto');
})

const form = document.getElementsByClassName('form');

form.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nombreCompleto', e.target[0].value);
  sessionStorage.setItem('correoElectronico', e.target[1].value);
  sessionStorage.setItem('contraseña', e.target[2].value);

});