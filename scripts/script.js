// VARIABLES
const botonBuscarGif = document.querySelector('#btn-buscar');
const buscadorDeGif = document.querySelector('#buscador-principal');
const secciones = document.querySelectorAll('.secciones');
const menuDesplegableTemas = document.querySelector('#btn-tema');
const botonesDeTemas = document.querySelectorAll('.boton-2');
const cambioDeEstilo = document.querySelector('#estilo-actual');
const botonNight = document.querySelector('#boton-night');
const botonDay = document.querySelector('#boton-day');
const logoNight = document.querySelector('#logo-night');
const logoDay = document.querySelector('#logo-day');
const botonMisGuifos = document.querySelector('.boton-3');
const gifSugerencia = document.querySelectorAll('.sugerencias__gif');
const gifTitulo = document.querySelectorAll('.sugerencias__contenedor__encabezado__texto');
const gifTendenciaContenedor = document.querySelectorAll('.tendencias__contenedor__gif');
const gifTendencia = document.querySelectorAll('.tendencias__gif');
const gifResultado = document.querySelectorAll('.resultados__gif');
const resultadoContenedorGeneral = document.querySelector('.resultados__contenedor');
const gifResultadoContenedor = document.querySelectorAll('.resultados__contenedor__gif');
const seccionResultado = document.querySelector('#resultados');
const seccionMisGuifos = document.querySelector('.mis-guifos');
const seccionBuscador = document.querySelector('#buscador');
const opcionesDeBusqueda = document.querySelector('.busqueda__opciones');
const opcionesDeBusquedaMostradas = document.querySelectorAll('.busqueda__opciones__resultados');
const botonDeOpcionesDeBusqueda1 = document.querySelector('#opcion-resultado-1');
const botonDeOpcionesDeBusqueda2 = document.querySelector('#opcion-resultado-2');
const botonDeOpcionesDeBusqueda3 = document.querySelector('#opcion-resultado-3');
const resultadosTitulo = document.querySelector('#resultados-titulo');
const formularioDeBusqueda = document.querySelector('#formulario-busqueda');
const botonCierreSugerencias = document.querySelectorAll('.boton-cierre');
const botonVerMasSugerencias = document.querySelectorAll('.sugerencias__contenedor__gif__boton');
const tituloVerMas = document.querySelectorAll('.funcion-ver-mas');
const hashtagDeResultadoContenedor = document.querySelector('.busqueda__tags');
const busquedaTagsResultados = document.querySelectorAll('.busqueda__tags__resultados');
const hashtagDeResultado = document.querySelectorAll('.busqueda__tags__resultados');
const tendenciasContenedorHashtag = document.querySelectorAll('.tendencias__contenedor__hashtag');
const tendenciasHashtags = document.querySelectorAll('.tendencias__hashtags');
const resultadosContenedorHashtag = document.querySelectorAll('.resultados__contenedor__hashtag');
const resultadosHashtags = document.querySelectorAll('.resultados__hashtags');
const divDeMisGuifos = document.querySelectorAll('.mis-guifos__contenedor__gif');
const contenedorDeMisGuifos = document.querySelectorAll('.mis-guifos__gif');

let inicioDeData = 16;
var arrayDeTagsGuardados = [];
var arrayDeMisGuifos = [];
let tema = localStorage.getItem('tema');

// MOSTRAR BUSQUEDAS ANTERIORES

function traerTagsBusquedasAnteriores() {
	let tagsGuardados = localStorage.getItem('busquedas');
	if (tagsGuardados != null) {
		hashtagDeResultadoContenedor.classList.remove('oculto');
		arrayDeTagsGuardados = JSON.parse(tagsGuardados);
		for (let i = 0; i < arrayDeTagsGuardados.length; i++) {
			const element = arrayDeTagsGuardados[i];
			busquedaTagsResultados[i].classList.remove('oculto');
			busquedaTagsResultados[i].innerText = element;
		}
	}
}

traerTagsBusquedasAnteriores();

// BUSCAR LO QUE FIGURA EN TAGS DE BUSQUEDAS ANTERIORES

for (let i = 0; i < busquedaTagsResultados.length; i++) {
	const element = busquedaTagsResultados[i];
	element.addEventListener('click', () => {
		let resultado = element.textContent.split('#');
		resultado = resultado[1];
		buscadorDeGif.value = resultado;
		opcionesDeBusqueda.setAttribute('class', 'oculto');
		opcionesDeBusqueda.setAttribute('class', 'busqueda__opciones');
	});
}

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
						if (contenedorDeMisGuifos[i] != undefined) {
							contenedorDeMisGuifos[i].setAttribute('src', data.data.images.original.url);
							divDeMisGuifos[i].classList.remove('oculto');
							return data;
						} else {
							return data;
						}
					});
			} catch (error) {
				return console.error(error);
			}
		}
	}
}

traerGifDelLocalStorage();

// FUNCION PARA BOTON MIS GUIFOS

function verMisGuifos() {
	seccionResultado.classList.add('class', 'oculto');
	seccionBuscador.classList.toggle('oculto');
	secciones.forEach(function (element) {
		element.setAttribute('class', 'oculto');
	});
	seccionMisGuifos.classList.toggle('oculto');
}

botonMisGuifos.addEventListener('click', verMisGuifos);

// MANTENER TEMA ESTABLECIDO

function establecerTema(tema) {
	if (tema == 'night') {
		cambioDeEstilo.href = 'styles/style2.css';
		logoDay.setAttribute('class', 'oculto');
		logoNight.removeAttribute('class', 'oculto');
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

// VOLVER A PAGINA PRINCIPAL

function volverAPaginaPrincipal() {
	location.reload();
}

logoDay.addEventListener('click', volverAPaginaPrincipal);
logoNight.addEventListener('click', volverAPaginaPrincipal);

// GUARDAR BÚSQUEDAS ANTERIORES

function guardarBusquedasAnteriores(busqueda) {
	let nuevaBusqueda = `#${busqueda}`;
	arrayDeTagsGuardados.push(nuevaBusqueda);
	let grupoDeTagsGuardados = JSON.stringify(arrayDeTagsGuardados);
	localStorage.setItem('busquedas', grupoDeTagsGuardados);
}

// FUNCIÓN PARA ESTABLECER SI EL GIF ES SIMPLE O DOBLE

function comprobarTamañoGif(gif, contenedorGif) {
	let gifObtenido = gif;
	if (gifObtenido.width >= 1.5 * gifObtenido.height) {
		contenedorGif.classList.add('doble-gif');
		gifObtenido.width = 592;
	} else {
		contenedorGif.classList.remove('doble-gif');
		gifObtenido.width = 288;
	}
}

// FUNCIÓN PARA LA BARRA DE BUSQUEDA
function obtenerResultadosDeBusqueda(busqueda) {
	try {
		const response = fetch(
			`https://api.giphy.com/v1/gifs/search?q=${busqueda}&api_key=zuNQGVdu9pjM2UXqSzO9bZYhRIk3Fz2G`
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				for (let i = 0; i < 20; i++) {
					const element = data.data[i];
					gifResultado[i].setAttribute('src', element.images.original.url);
					gifResultado[i].setAttribute('alt', element.title);
					comprobarTamañoGif(element.images.original, gifResultadoContenedor[i]);
					let tagEntero = element.slug;
					let tag = tagEntero.split('-');
					resultadosHashtags[i].innerText = `#${tag[0]} #${tag[1]} #${tag[2]}`;
				}
				return data;
			})
			.catch((error) => {
				return error;
			});
		return response;
	} catch (error) {
		return console.error(error);
	}
}

function clickEnBuscar(e) {
	e.preventDefault();
	let inputBuscadorDeGif = buscadorDeGif.value;
	if (inputBuscadorDeGif != '') {
		obtenerResultadosDeBusqueda(inputBuscadorDeGif);
		secciones.forEach(function (element) {
			element.setAttribute('class', 'oculto');
		});
		resultadosTitulo.innerText = `Resultados de búsqueda para: ${inputBuscadorDeGif}`;
		seccionResultado.removeAttribute('class', 'oculto');
		opcionesDeBusqueda.classList.toggle('oculto');
		hashtagDeResultadoContenedor.classList.toggle('oculto');
		guardarBusquedasAnteriores(inputBuscadorDeGif);
		traerTagsBusquedasAnteriores();
	}
}

formularioDeBusqueda.addEventListener('submit', clickEnBuscar);

// FUNCIÓN PARA PONER SUGERENCIAS

function cortarTitulo(tituloRecibido) {
	let titulo = tituloRecibido.split('GIF');
	let tituloCortado = titulo[0].split(' ');
	titulo = '';
	for (let i = 0; i < tituloCortado.length; i++) {
		const element = tituloCortado[i];
		titulo += element;
	}
	return titulo;
}

function mostrarSugerenciasYTendencias() {
	try {
		const response = fetch(
			'https://api.giphy.com/v1/gifs/trending?api_key=zuNQGVdu9pjM2UXqSzO9bZYhRIk3Fz2G&limit=25&rating=G'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				for (let i = 0; i < 4; i++) {
					const element = data.data[i];
					gifSugerencia[i].setAttribute('src', element.images.downsized_medium.url);
					gifSugerencia[i].setAttribute('alt', element.title);
					let titulo = cortarTitulo(element.title);
					gifTitulo[i].innerText = `#${titulo}`;
					tituloVerMas[i].innerText = element.title;
				}
				for (let i = 4; i < 16; i++) {
					const element = data.data[i];
					gifTendencia[i - 4].setAttribute('src', element.images.downsized_medium.url);
					gifTendencia[i - 4].setAttribute('alt', element.title);
					comprobarTamañoGif(element.images.downsized_medium, gifTendenciaContenedor[i - 4]);
					let tagEntero = element.slug;
					let tag = tagEntero.split('-');
					tendenciasHashtags[i - 4].innerText = `#${tag[0]} #${tag[1]} #${tag[2]}`;
				}
				return data;
			})
			.catch((error) => {
				return error;
			});
		return response;
	} catch (error) {
		return console.error(error);
	}
}

mostrarSugerenciasYTendencias();

// BOTÓN PARA CERRAR SUGERENCIAS (Y PONER OTRAS)

async function cambiarSugerencias() {
	try {
		const response = fetch(
			'https://api.giphy.com/v1/gifs/trending?api_key=zuNQGVdu9pjM2UXqSzO9bZYhRIk3Fz2G&limit=25&rating=G'
		).then((response) => {
			return response.json();
		});
		return response;
	} catch (error) {
		return console.error(error);
	}
}

botonCierreSugerencias[0].addEventListener('click', function () {
	cambiarSugerencias()
		.then((data) => {
			const element = data.data[inicioDeData];
			gifSugerencia[0].setAttribute('src', element.images.downsized_medium.url);
			gifSugerencia[0].setAttribute('alt', element.title);
			let titulo = cortarTitulo(element.title);
			gifTitulo[0].innerText = `#${titulo}`;
			inicioDeData++;
			return data;
		})
		.catch((error) => {
			return error;
		});
});

botonCierreSugerencias[1].addEventListener('click', function () {
	cambiarSugerencias()
		.then((data) => {
			const element = data.data[inicioDeData];
			gifSugerencia[1].setAttribute('src', element.images.downsized_medium.url);
			gifSugerencia[1].setAttribute('alt', element.title);
			let titulo = cortarTitulo(element.title);
			gifTitulo[1].innerText = `#${titulo}`;
			inicioDeData++;
			return data;
		})
		.catch((error) => {
			return error;
		});
});

botonCierreSugerencias[2].addEventListener('click', function () {
	cambiarSugerencias()
		.then((data) => {
			const element = data.data[inicioDeData];
			gifSugerencia[2].setAttribute('src', element.images.downsized_medium.url);
			gifSugerencia[2].setAttribute('alt', element.title);
			let titulo = cortarTitulo(element.title);
			gifTitulo[2].innerText = `#${titulo}`;
			inicioDeData++;
			return data;
		})
		.catch((error) => {
			return error;
		});
});

botonCierreSugerencias[3].addEventListener('click', function () {
	cambiarSugerencias()
		.then((data) => {
			const element = data.data[inicioDeData];
			gifSugerencia[3].setAttribute('src', element.images.downsized_medium.url);
			gifSugerencia[3].setAttribute('alt', element.title);
			let titulo = cortarTitulo(element.title);
			gifTitulo[3].innerText = `#${titulo}`;
			inicioDeData++;
			return data;
		})
		.catch((error) => {
			return error;
		});
});

// FUNCIONALIDAD DE "VER MÁS"

function limpiarTituloVerMas(numero) {
	let titulo = tituloVerMas[numero].textContent.split('GIF');
	buscadorDeGif.value = titulo[0];
	resultadosTitulo.innerText = `Resultados de búsqueda para: ${titulo[0]}`;
}

function clickEnVerMas() {
	let resultadoVerMas = buscadorDeGif.value;
	obtenerResultadosDeBusqueda(resultadoVerMas);
	secciones.forEach(function (element) {
		element.setAttribute('class', 'oculto');
	});
	seccionResultado.removeAttribute('class', 'oculto');
}

function submitFormularioBusquedaVerMas() {
	formularioDeBusqueda.addEventListener('submit', clickEnVerMas());
}

botonVerMasSugerencias[0].addEventListener('click', function () {
	limpiarTituloVerMas(0);
	submitFormularioBusquedaVerMas();
});

botonVerMasSugerencias[1].addEventListener('click', function () {
	limpiarTituloVerMas(1);
	submitFormularioBusquedaVerMas();
});

botonVerMasSugerencias[2].addEventListener('click', function () {
	limpiarTituloVerMas(2);
	submitFormularioBusquedaVerMas();
});

botonVerMasSugerencias[3].addEventListener('click', function () {
	limpiarTituloVerMas(3);
	submitFormularioBusquedaVerMas();
});

// MOSTRAR SUGERENCIAS DE LA BARRA DE BÚSQUEDA

function sugerirResultados(busqueda) {
	try {
		const response = fetch(
			`https://api.giphy.com/v1/gifs/search/tags?q=${busqueda}&api_key=zuNQGVdu9pjM2UXqSzO9bZYhRIk3Fz2G`
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				for (let i = 0; i < 3; i++) {
					const element = data.data[i];
					opcionesDeBusquedaMostradas[i].innerText = `${element.name}`;
				}
			})
			.catch((error) => {
				return error;
			});
		return response;
	} catch (error) {
		return console.log(error);
	}
}

buscadorDeGif.addEventListener('input', () => {
	let inputBuscadorDeGif = buscadorDeGif.value;
	sugerirResultados(inputBuscadorDeGif);
	hashtagDeResultadoContenedor.classList.add('oculto');
	if (inputBuscadorDeGif != '') {
		opcionesDeBusqueda.classList.remove('oculto');
		botonBuscarGif.classList.remove('input-inactivo');
		botonBuscarGif.classList.add('input-activo');
	} else {
		opcionesDeBusqueda.classList.add('oculto');
		botonBuscarGif.classList.add('input-inactivo');
		botonBuscarGif.classList.remove('input-activo');
	}
});

// ELEGIR SUGERENCIA DE LA BARRA DE BÚSQUEDA

function clickEnResultadoDeBusqueda() {
	let resultadoSugerido = buscadorDeGif.value;
	obtenerResultadosDeBusqueda(resultadoSugerido);
	secciones.forEach(function (element) {
		element.setAttribute('class', 'oculto');
	});
	seccionResultado.removeAttribute('class', 'oculto');
}

function submitFormularioBusqueda() {
	formularioDeBusqueda.addEventListener('submit', clickEnResultadoDeBusqueda);
}

botonDeOpcionesDeBusqueda1.addEventListener('click', () => {
	buscadorDeGif.value = botonDeOpcionesDeBusqueda1.textContent;
	submitFormularioBusqueda();
});
botonDeOpcionesDeBusqueda2.addEventListener('click', () => {
	buscadorDeGif.value = botonDeOpcionesDeBusqueda2.textContent;
	submitFormularioBusqueda();
});
botonDeOpcionesDeBusqueda3.addEventListener('click', () => {
	buscadorDeGif.value = botonDeOpcionesDeBusqueda3.textContent;
	submitFormularioBusqueda();
});

// MOSTRAR HASHTAGS DE TENDENCIAS

for (let i = 0; i < gifTendenciaContenedor.length; i++) {
	gifTendenciaContenedor[i].addEventListener('mouseenter', () => {
		tendenciasContenedorHashtag[i].classList.toggle('oculto');
		tendenciasHashtags[i].classList.toggle('oculto');
	});

	gifTendenciaContenedor[i].addEventListener('mouseleave', () => {
		tendenciasContenedorHashtag[i].classList.toggle('oculto');
		tendenciasHashtags[i].classList.toggle('oculto');
	});
}

for (let i = 0; i < gifResultadoContenedor.length; i++) {
	gifResultadoContenedor[i].addEventListener('mouseenter', () => {
		resultadosContenedorHashtag[i].classList.toggle('oculto');
		resultadosHashtags[i].classList.toggle('oculto');
	});

	gifResultadoContenedor[i].addEventListener('mouseleave', () => {
		resultadosContenedorHashtag[i].classList.toggle('oculto');
		resultadosHashtags[i].classList.toggle('oculto');
	});
}
