

//CONSULTAR ESTADO Y MUNCIPIO  API PARA EL MODAL

async function consultarPersonaEstado() {

	const request = await fetch('api/persona/Obtenerestado/', {

		method: 'GET',

		headers: {

			'Accept': 'application/json',

			'Content-Type': 'application/json'

		},

	});


	const estados = await request.json();

	const estadoSelect = $('#estadoModal');

	estadoSelect.empty();

	estadoSelect.append('<option value="" disabled selected>Selecciona un estado</option>');

	estados.forEach(estado => {

		estadoSelect.append(`<option value="${estado.edo_id}">${estado.edo_nombre}</option>`);

	});


	estadoSelect.on('change', function() {

		const estadoSeleccionado = $(this).val(); // Obtener el valor del estado seleccionado

		consultarMunicipiosPorEstado(estadoSeleccionado); // Llamar a la función para cargar los municipios

	});

}

async function consultarMunicipiosPorEstado(estadoSeleccionado) {

	const estadoId = parseInt(estadoSeleccionado);

	const request = await fetch('api/persona/Obtenermunicipio/', {

		method: 'GET',

		headers: {

			'Accept': 'application/json',

			'Content-Type': 'application/json'

		},

	});


	const municipios = await request.json();

	const municipioSelect = $('#municipioModal');

	municipioSelect.empty();

	municipioSelect.append('<option value="" disabled selected>Selecciona un municipio</option>');

	const municipiosFiltrados = municipios.filter(municipio => municipio.mun_edopadre === estadoId);

	municipiosFiltrados.forEach(municipio => {

		municipioSelect.append(`<option value="${municipio.mun_numero}">${municipio.mun_nombre}</option>`);

	});

}

$(document).ready(function() {

	consultarPersonaEstado();

});




//INICIO DE MODAL DONDE LLENA LOS DATOS DE ESTADO Y MUNCIPIO

const estadoModalSelect = document.getElementById('estadoModal');

const municipioModalSelect = document.getElementById('municipioModal');

estadoModalSelect.addEventListener('change', actualizarOpcionesModal);

municipioModalSelect.addEventListener('change', actualizarOpcionesModal);


async function actualizarOpcionesModal() {

	const estadoSeleccionado = estadoModalSelect.value;

	const municipioSeleccionado = municipioModalSelect.value;


	if (estadoSeleccionado && municipioSeleccionado) {

		const estado = {

			ctra_estado: estadoSeleccionado,

			ctra_municipio: municipioSeleccionado

		};


		await cargarOpcionesModal(estado);

	}

}


const consultarCentrosBtn = document.getElementById('siguienteBtn');

const opcionesModalSelect = document.getElementById('opcionesModal');

const otroInputc = document.getElementById('otroInputc');

const otroInputcid = document.getElementById('otroInputcid');

const ctraid = document.getElementById('autoComplete');

const idModalInput = document.getElementById('idModal');

const hiddenModalInput = document.getElementById('hiddenValueInput');


consultarCentrosBtn.addEventListener('click', async () => {

	const selectedOption = opcionesModalSelect.value;


	if (selectedOption) {

		const optionParts = selectedOption.split(' -');

		const ctra_id = optionParts[0];


		idModalInput.value = ctra_id;

		otroInputc.value = ctra_id;

		otroInputc.value = selectedOption;

		ctraid.value = selectedOption;


		nuevaPersona.per_centrotrabajo = ctra_id;

		estadoModalInput.value = '';

	}

});


async function cargarOpcionesModal(estado) {
    try {
        const response = await fetch('api/personsaxctraTrabajo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estado)
        });


		if (response.ok) {


			const data = await response.json();

			/*console.log('Datos de la API:', data);*/



			const opcionesModalSelect = document.getElementById('opcionesModal');
			 	

			opcionesModalSelect.innerHTML = '';

            /*const alertaOpciones = document.getElementById('alertaOpciones');*/
			if (data.length === 0) {
				swal({
					title: 'Error',
					text: 'No hay datos disponible para la busqueda del centro de trabajo',
					icon: 'warning',
					button: 'Aceptar',
				});
				return; 
			}

			const optionSeleccione = document.createElement('option');

			optionSeleccione.value = '';

			optionSeleccione.text = 'Seleccione una opción';

			opcionesModalSelect.appendChild(optionSeleccione);


			data.forEach((obj, index) => {
			

				const option = document.createElement('option');

				const concatenatedValue = obj[1] + ' - ' + obj[2];

				option.value = concatenatedValue;

				option.text = concatenatedValue;

				opcionesModalSelect.appendChild(option);

			});


			opcionesModalSelect.addEventListener('change', () => {


				const selectedOption = opcionesModalSelect.value;



				if (selectedOption) {
					

					const arrayData = data.find(item => {

						const concatenatedValue = item[1] + ' - ' + item[2];

						return concatenatedValue === selectedOption;

					});



					if (arrayData) {

						const hiddenValue = arrayData[0];

						const hiddenValueInput = document.getElementById('hiddenValueInput');

						hiddenValueInput.value = hiddenValue;

					}



					if (arrayData && arrayData.length > 5) {

						const calleModalInput = document.getElementById('calleModal');

						calleModalInput.value = arrayData[5];

					}



					if (arrayData && arrayData.length > 6) {

						const localidadModalInput = document.getElementById('localidadModal');

						localidadModalInput.value = arrayData[6];

					}



					if (arrayData && arrayData.length > 7) {

						const coloniaModalInput = document.getElementById('coloniaModal');

						coloniaModalInput.value = arrayData[7];

					}



					if (arrayData && arrayData.length > 8) {

						const extModalInput = document.getElementById('exteriorModal');

						extModalInput.value = arrayData[8];

					}



					if (arrayData && arrayData.length > 9) {

						const intModalInput = document.getElementById('interiorModal');

						intModalInput.value = arrayData[9];

					}


					if (arrayData && arrayData.length > 10) {

						const unoModalInput = document.getElementById('calleunoModal');

						unoModalInput.value = arrayData[10];

					}


					if (arrayData && arrayData.length > 11) {

						const dosModalInput = document.getElementById('calledosModal');

						dosModalInput.value = arrayData[11];
//establecerContadorClick();
					}

				/* alert('Llena sessionStorage');*/
        sessionStorage.setItem('ctroDist', arrayData[0]+ '|'+arrayData[1] + '|' + arrayData[2]);
  /*      alert('Termina sessionStorage');*/

				}

			});

		} else {

			/*console.error('Error al obtener datos: ' + response.status);*/

		}

	} catch (error) {

	/*	console.error('Error al realizar la solicitud: ' + error);*/

	}

}



function centrarModal() {

	const modalDialog = document.querySelector('#miModal .modal-dialog');

	const windowHeight = window.innerHeight;

	const modalHeight = modalDialog.clientHeight;

	const offset = 10;


	if (modalHeight < windowHeight) {

		const marginTop = (windowHeight - modalHeight) / 2 - offset;

		modalDialog.style.marginTop = marginTop + 'px';

	} else {

		modalDialog.style.marginTop = '0';

	}

}



$('#miModal').on('shown.bs.modal', function() {

	centrarModal();

});




$('.btn-success').on('click', function() {

	document.body.classList.add('body-modal-open');

});



$('#miModal').on('hidden.bs.modal', function() {

	document.body.classList.remove('body-modal-open');

});



$(window).on('resize', function() {

	centrarModal();

});





const btnBuscar = document.getElementById('btnbuscar');

const modalContainer = document.getElementById('modalContainer');


btnBuscar.addEventListener('click', () => {


	modalContainer.classList.add('modal-open');

	modalContainer.classList.remove('body-normal');

});


function crearSessionStorage(){
	//alert("si entro aqui");
	//sessionStorage.setItem("clave","valor");
	
	
	//alert('Empieza');
	//sessionStorage.setItem('ctroDist','valor');
	/*const valorObtenido = sessionStorage.getItem('ctroDist');
	alert('ctroDist:' + valorObtenido);
	sessionStorage.removeItem('ctroDist');
	alert('sessionStorage borrado');*/
	
}