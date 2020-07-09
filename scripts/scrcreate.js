const cambioDeEstilo = document.querySelector('#estilo-actual');
const menuDesplegableTemas = document.querySelector('#btn-tema');
const botonesDeTemas = document.querySelectorAll('.boton-2');
const botonNight = document.querySelector('#boton-night');
const botonDay = document.querySelector('#boton-day');
const logoNight = document.querySelector('#logo-night');
const logoDay = document.querySelector('#logo-day');
const botonFlechaAtras = document.querySelector('.flecha-atras');
const botonNavBar = document.querySelectorAll('.contenedor__botones__boton');
const botonCancelar = document.querySelector('#btn-cancelar');
const botonComenzar = document.querySelector('#btn-comenzar');
const botonGrabar = document.querySelector('#btn-capturar-camara');
const botonGrabar2 = document.querySelector('#btn-capturar-texto');
const botonParar = document.querySelector('#btn-listo');
const botonParar2 = document.querySelector('#btn-grabar-icono');
const botonRepetir = document.querySelector('#btn-repetir');
const botonSubirGif = document.querySelector('#btn-subir');
const botonCancelarSubida = document.querySelector('#btn-cancelar-subida');
const botonCerrar = document.querySelectorAll('.boton-cierre');
const botonCopiarEnlace = document.querySelector('#btn-copiar');
const botonDescargar = document.querySelector('#btn-descargar');
const botonFinalizado = document.querySelector('#btn-finalizado');
const seccionCartelInicial = document.querySelector('.crear-guifo');
const seccionPrecaptura = document.querySelector('.seccion-precaptura');
const seccionCaptura = document.querySelector('.seccion-captura');
const seccionVistaPrevia = document.querySelector('.seccion-previa');
const seccionSubirGif = document.querySelector('.seccion-subiendo');
const seccionSubidaExitosa = document.querySelector('.seccion-subida-exitosa');
const camaraHabilitada = document.querySelector('#precaptura-video');
const contenedorDeGrabacion = document.querySelector('#captura-video');
const contenedorDeVistaPrevia = document.querySelector('#vista-previa');
const contenedorDeSubidaExitosa = document.querySelector('#subida-exitosa-imagen');
const contenedorDeMisGuifos = document.querySelectorAll('.mis-guifos__gif');
const divDeMisGuifos = document.querySelectorAll('.mis-guifos__contenedor__gif');
const timerCaptura = document.querySelector('.captura-timer');
const timerVistaPrevia = document.querySelector('.previa-timer');
const playCuadrados = document.querySelectorAll('.play__cuadrados');
const subidaCuadrados = document.querySelectorAll('.carga__cuadrados');
const imagenCamara = document.querySelector('#imagen-camara');
const imagenGrabando = document.querySelector('#imagen-grabando');

let recorder = null;
let camaraEncendidaPrecaptura;
let camaraEncendidaCaptura;
let tema = localStorage.getItem('tema');
let blob = null;
let nuevoGif = null;
let arrayDeMisGuifos = [];

var timerAndando = setInterval(() => {
	var t = calcularTimer(inicioTimer);
	timerCaptura.innerHTML = `${t.horas}:${t.minutos}:${t.segundos}:${t.centesimas}`;
}, 157);

var timerAndandoVistaPrevia = setInterval(() => {
	var tv = calcularTimerVistaPrevia(inicioTimer);
	if (tv != undefined) {
		timerVistaPrevia.innerHTML = `${tv.horas}:${tv.minutos}:${tv.segundos}:${tv.centesimas}`;
	}
}, 157);

// MOSTRAR GIFS EN MIS GUIFOS

function traerGifDelLocalStorage() {
	let grupoDeGifsBajados = localStorage.getItem('Mis-guifos');
	if (grupoDeGifsBajados != null) {
		arrayDeMisGuifos = JSON.parse(grupoDeGifsBajados);
		for (let i = 0; i < arrayDeMisGuifos.length; i++) {
			const element = arrayDeMisGuifos[i];
			try {
				fetch(`https://api.giphy.com/v1/gifs/${element}?api_key=zuNQGVdu9pjM2UXqSzO9bZYhRIk3Fz2G`)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						console.log(data);
						contenedorDeMisGuifos[i].setAttribute('src', data.data.images.original.url);
						divDeMisGuifos[i].classList.remove('oculto');
						return data;
					});
			} catch (error) {
				return console.log(error);
			}
		}
	}
}

traerGifDelLocalStorage();

// VOLVER A PAGINA PRINCIPAL

function volverAPaginaPrincipal() {
	history.back();
}

logoDay.addEventListener('click', volverAPaginaPrincipal);
logoNight.addEventListener('click', volverAPaginaPrincipal);

// MANTENER TEMA ESTABLECIDO

function establecerTema(tema) {
	if (tema == 'night') {
		cambioDeEstilo.href = 'styles/style2.css';
		logoDay.setAttribute('class', 'oculto');
		logoNight.removeAttribute('class', 'oculto');
		imagenCamara.setAttribute('src', 'images/camera_light.svg');
		imagenGrabando.setAttribute('src', 'images/recording_dark.svg');
	} else {
		cambioDeEstilo.href = 'styles/style.css';
		logoNight.setAttribute('class', 'oculto');
		logoDay.removeAttribute('class', 'oculto');
	}
}

establecerTema(tema);

// FUNCIÓN PARA CAMBIAR DE TEMA

function desplegarTemas() {
	menuDesplegableTemas.classList.toggle('oculto');
}

botonesDeTemas[0].addEventListener('click', desplegarTemas);
botonesDeTemas[1].addEventListener('click', desplegarTemas);

function cambiarEstiloNight() {
	cambioDeEstilo.href = 'styles/style2.css';
	logoDay.setAttribute('class', 'oculto');
	logoNight.removeAttribute('class', 'oculto');
	menuDesplegableTemas.classList.toggle('oculto');
	localStorage.setItem('tema', 'night');
}

function cambiarEstiloDay() {
	cambioDeEstilo.href = 'styles/style.css';
	logoNight.setAttribute('class', 'oculto');
	logoDay.removeAttribute('class', 'oculto');
	menuDesplegableTemas.classList.toggle('oculto');
	localStorage.setItem('tema', 'day');
}

botonNight.addEventListener('click', cambiarEstiloNight);

botonDay.addEventListener('click', cambiarEstiloDay);

// FUNCIÓN PARA CANCELAR LA CREACIÓN DE GIF NUEVO

function mostrarSoloMisGuifos() {
	botonFlechaAtras.classList.toggle('oculto');
	botonNavBar[0].classList.toggle('oculto');
	botonNavBar[1].classList.toggle('oculto');
	botonNavBar[2].classList.toggle('oculto');
	seccionCartelInicial.classList.toggle('oculto');
}

botonCancelar.addEventListener('click', mostrarSoloMisGuifos);

// FUNCIÓN PARA HABILITAR CREAR GIF

function iniciarCrearGif() {
	botonFlechaAtras.classList.toggle('oculto');
	botonNavBar[0].classList.toggle('oculto');
	botonNavBar[1].classList.toggle('oculto');
	botonNavBar[2].classList.toggle('oculto');
	seccionCartelInicial.classList.toggle('oculto');
}

botonNavBar[0].addEventListener('click', iniciarCrearGif);

// FUNCIÓN PARA COMENZAR GIF

function pasarAPrecaptura() {
	seccionCartelInicial.classList.toggle('oculto');
	seccionPrecaptura.classList.toggle('oculto');
}

botonComenzar.addEventListener('click', pasarAPrecaptura);

// HABILITAR CÁMARA

navigator.mediaDevices
	.getUserMedia({
		audio: false,
		video: true,
	})
	.then(function (stream) {
		camaraEncendidaPrecaptura = stream;
		recorder = RecordRTC(stream, {
			type: 'gif',
			frameRate: 1,
			quality: 10,
			width: 360,
			hidden: 240,
		});

		camaraHabilitada.srcObject = stream;
		camaraHabilitada.play();
	})
	.catch(function (err) {
		console.log('error');
	});

// FUNCION TIMER

let inicioTimer;
let finTimer;

function startTimer() {
	inicioTimer = new Date();
	timerAndando;
}

function calcularTimer() {
	finTimer = new Date();
	let diferenciaTiempos = finTimer - inicioTimer;
	let centesimas = ('0' + Math.floor(diferenciaTiempos % 100)).slice(-2);
	let segundos = ('0' + Math.floor((diferenciaTiempos / 1000) % 60)).slice(-2);
	let minutos = ('0' + Math.floor((diferenciaTiempos / 1000 / 60) % 60)).slice(-2);
	let horas = ('0' + Math.floor((diferenciaTiempos / 1000 / 60 / 60) % 24)).slice(-2);
	let tiempo = { centesimas, segundos, minutos, horas };
	localStorage.setItem('timer', diferenciaTiempos);
	return tiempo;
}

botonParar.addEventListener('click', () => {
	clearInterval(timerAndando);
	pararGrabación();
});
botonParar2.addEventListener('click', () => {
	clearInterval(timerAndando);
	pararGrabación();
});

// FUNCIÓN PARA COMENZAR A GRABAR

navigator.mediaDevices
	.getUserMedia({
		audio: false,
		video: true,
	})
	.then(function (stream) {
		camaraEncendidaCaptura = stream;
		recorder = RecordRTC(stream, {
			type: 'gif',
			frameRate: 1,
			quality: 10,
			width: 360,
			hidden: 240,
		});

		contenedorDeGrabacion.srcObject = stream;
		contenedorDeGrabacion.play();
	})
	.catch(function (err) {
		console.log('error');
	});

function comenzarGrabacion() {
	startTimer();
	seccionPrecaptura.classList.toggle('oculto');
	seccionCaptura.classList.toggle('oculto');
	recorder.startRecording();
}

botonGrabar.addEventListener('click', comenzarGrabacion);
botonGrabar2.addEventListener('click', comenzarGrabacion);

// FUNCIÓN PARA EL TIMER DE LA VISTA PREVIA

let inicioTimerVistaPrevia;
let finTimerVistaPrevia;

function startTimerVistaPrevia() {
	inicioTimerVistaPrevia = new Date();
	timerAndandoVistaPrevia;
}

function calcularTimerVistaPrevia() {
	finTimerVistaPrevia = new Date();
	let diferenciaTiempos = finTimerVistaPrevia - inicioTimerVistaPrevia;
	let tiempoTotal = localStorage.getItem('timer');
	for (let i = diferenciaTiempos; i < tiempoTotal; i++) {
		let centesimas = ('0' + Math.floor(diferenciaTiempos % 100)).slice(-2);
		let segundos = ('0' + Math.floor((diferenciaTiempos / 1000) % 60)).slice(-2);
		let minutos = ('0' + Math.floor((diferenciaTiempos / 1000 / 60) % 60)).slice(-2);
		let horas = ('0' + Math.floor((diferenciaTiempos / 1000 / 60 / 60) % 24)).slice(-2);
		let tiempo = { centesimas: centesimas, segundos: segundos, minutos: minutos, horas: horas };
		return tiempo;
	}
	startTimerVistaPrevia();
}

// FUNCION BARRA DE TIEMPO VISTA PREVIA

function completarBarraDeTiempo() {
	playCuadrados.forEach((element) => {
		if (tema == 'night') {
			setInterval(() => {
				element.style.background = '#EE3EFE';
			}, 1500);
		} else {
			setInterval(() => {
				element.style.background = '#F7C9F3';
			}, 1500);
		}
	});
}

// FUNCION PARAR GRABACION

function guardarGif() {
	console.log(recorder.getBlob());
	recorder.getDataURL((url) => {
		contenedorDeVistaPrevia.src = url;
	});
	blob = recorder.getBlob();
	nuevoGif = URL.createObjectURL(blob);
	contenedorDeSubidaExitosa.setAttribute('src', nuevoGif);
}

function pararGrabación() {
	seccionCaptura.classList.add('oculto');
	seccionVistaPrevia.classList.remove('oculto');
	recorder.stopRecording(guardarGif);
	startTimerVistaPrevia();
	completarBarraDeTiempo();
}

// REPETIR GRABACIÓN

function repetirGrabacion() {
	recorder.reset();
	startTimer();
	seccionVistaPrevia.classList.toggle('oculto');
	seccionCaptura.classList.toggle('oculto');
	recorder.startRecording();
}

botonRepetir.addEventListener('click', repetirGrabacion);

// FUNCIÓN BARRA DE TIEMPO

function completarBarraDeTiempoSubiendo() {
	subidaCuadrados.forEach((element) => {
		setTimeout(() => {
			if (tema == 'night') {
				element.style.background = '#EE3EFE';
			} else {
				element.style.background = '#F7C9F3';
			}
		}, 3000);
	});
	setTimeout(() => {
		seccionSubirGif.classList.add('oculto');
		seccionSubidaExitosa.classList.remove('oculto');
	}, 3500);
}

// ALMACENAR GIF CREADO

function guardarGifEnLocalStorage(element) {
	arrayDeMisGuifos.push(element);
	let grupoDeGifs = JSON.stringify(arrayDeMisGuifos);
	localStorage.setItem('Mis-guifos', grupoDeGifs);
}

// FUNCION SUBIR GIF

function subirGifSeccion() {
	seccionVistaPrevia.classList.toggle('oculto');
	seccionSubirGif.classList.toggle('oculto');
	completarBarraDeTiempoSubiendo();
}

function subirGif() {
	camaraEncendidaPrecaptura.stop();
	camaraEncendidaCaptura.stop();
	subirGifSeccion();
	let form = new FormData();
	form.append('file', blob, 'file.gif');
	try {
		fetch('https://upload.giphy.com/v1/gifs?api_key=zuNQGVdu9pjM2UXqSzO9bZYhRIk3Fz2G', {
			method: 'POST',
			body: form,
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (data.meta.msg == 'OK') {
					guardarGifEnLocalStorage(data.data.id);
					nuevoGif = data.data.id;
				} else {
					alert('El gif no se pudo subir correctamente');
				}
			});
	} catch (error) {
		return console.log(error);
	}
}

botonSubirGif.addEventListener('click', subirGif);

// FUNCIÓN CANCELAR SUBIDA Y BOTONES DE CERRAR

function cancelarSubida() {
	window.location = 'create.html';
}

botonCancelarSubida.addEventListener('click', cancelarSubida);
botonCerrar.forEach((element) => {
	element.addEventListener('click', () => {
		window.location = 'create.html';
	});
});

// FUNCIÓN COPIAR ENLACE DEL GIF SUBIDO

function copiarEnlaceDelGif() {
	try {
		fetch(`https://api.giphy.com/v1/gifs/${nuevoGif}?api_key=zuNQGVdu9pjM2UXqSzO9bZYhRIk3Fz2G`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				let aux = document.createElement('input');
				aux.setAttribute('value', data.data.images.original.url);
				document.body.appendChild(aux);
				aux.select();
				document.execCommand('copy');
				document.body.removeChild(aux);
				console.log('texto copiado');
				return data;
			});
	} catch (error) {
		return console.log(error);
	}
}

botonCopiarEnlace.addEventListener('click', copiarEnlaceDelGif);

// FUNCIÓN DESCARGAR GIF SUBIDO

function descargarGif() {
	invokeSaveAsDialog(blob, 'file.gif');
}

botonDescargar.addEventListener('click', descargarGif);

// FUNCIÓN TERMINAR CON GIF SUBIDO

function volverAMisGuifos() {
	window.location = 'create.html';
}

botonFinalizado.addEventListener('click', volverAMisGuifos);
