// INICIO variables globales
let idAltaNivel = null;
let idZona = null;
// FIN variables globales

// Inicio función para llamar a  la api AltaNivel
async function autocompletarzona() {
	const request = await fetch('api/nivel/consulta/dosDatos', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	//Creación variable data que almacena los datos traidos de la API 
	const data = await request.json();
	console.log(data);
	console.log(data.map(item => item[0]));
	//Variable Zona que obtiene el dato de la posición 0
	const idsZona = data.map(item => item[0]);
	//Variable Zona que obtiene el dato de la posición 1
	const Zona = data.map(item => item[1]);
	//Variable inpZona que guarda el elemento del input zona
	const inpZona = document.getElementById('inpZona');

	//Vacia el contenido del inpZona
	$('#inpZona').empty();
	//Crea la opcion default en el input zona
	const optionDefault = document.createElement('option');
	optionDefault.value = '';
	optionDefault.text = 'Selecciona una opción';
	optionDefault.disabled = true;
	optionDefault.selected = true;
	inpZona.add(optionDefault);

	//Muestra los datos de la zona
	Zona.forEach((nombre, index) => {
		const option = document.createElement('option');
		option.value = nombre;
		option.text = nombre;
		//Guarda el IDZona de la opcion elegida
		option.dataset.zonaId = idsZona[index];
		//Muestra los datos de la zona 
		inpZona.add(option);
		//guarda el dato como tipo json
		body: JSON.stringify(option)
	});
	//Al seleccionar el input zona deseado activa la funcion guardarIdZona
	inpZona.addEventListener('change', guardarIdZona);
}
// Fin función para llamar a  la api AltaNivel

// INICIO guardar el id de la zona
function guardarIdZona() {
	const inpZona = document.getElementById('inpZona');
	const selectedOption = inpZona.options[inpZona.selectedIndex];
	idZona = selectedOption.dataset.zonaId;
}
// FIN guardar el id de la zona

//Llamado a la funcion autocompletarzona
autocompletarzona();

//INICIO función llenar los datos de control una vez que el usuario lleno los campos anteriores
let contador = 0;
let contnivel=0;
let contzona=0;
let contsituacion=0;
document.getElementById('inpNivel').addEventListener('change', contadornivel);
document.getElementById('inpZona').addEventListener('change', contadorzona);


function contadornivel(){
	contnivel++;
	if(contnivel==1){
		llenarDatosControl();
	}
}

function contadorzona(){
	contzona++;
	if(contzona==1){
		llenarDatosControl();
	}
}

function llenarDatosControl(){
	contador++;
	if(contador===2){
		datosControl1();
	}
}

const nivelInput = document.getElementById('inpNivel');
const mensjEscribiendo = document.getElementById('mensajeEscribiendo');

nivelInput.addEventListener('input', function () {
	if (this.value.trim() !== '') {
		// Si el campo no está vacío, muestra el mensaje encima del campo
		mensjEscribiendo.style.display = 'block';
		posicionaMensaje();
	} else {
		// Si el campo está vacío, oculta el mensaje
		mensjEscribiendo.style.display = 'none';
	}
});

document.addEventListener('click', function(event) {
    // Verifica si el clic ocurrió fuera del input
    if (event.target !== nivelInput) {
        // Oculta el mensaje si el clic fue fuera del input
        mensjEscribiendo.style.display = 'none';
    }
});

//Función para que no se registren caractéres alfanúmericos
function validarInput(input) {
    input.addEventListener('keydown', function(event) {
        // Código ASCII de las teclas permitidas: letras, números y espacios
        var allowedKeys = /^[a-zA-Z0-9\s]*$/;
        // Permite las teclas de control como Enter, Tab, Flechas, etc.
        var allowedControlKeys = [8, 9, 13, 16, 17, 18, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

        // Verifica si la tecla presionada es una tecla de control
        if (allowedControlKeys.includes(event.keyCode)) {
            return; // Permite las teclas de control
        }

        // Verifica si el carácter ingresado es permitido
        if (!allowedKeys.test(event.key)) {
            event.preventDefault(); // Cancela la pulsación de tecla
            // alert("¡No se permiten caracteres especiales!");
			swal({
				title: '¡No se permiten caracteres especiales!',
				icon: 'error',
				button: 'Aceptar',
			});
        }
    });
}

validarInput(inpNivel);

// Función para posicionar el mensaje encima del campo de entrada
function posicionaMensaje() {
	const rect = nivelInput.getBoundingClientRect();
	mensjEscribiendo.style.top = (rect.top - mensjEscribiendo.offsetHeight - 5) + 'px';
	mensjEscribiendo.style.left = rect.left + 'px';
}

//INICIO funcion limpiar campos
function limpiarInputs() {
	document.getElementById('inpNivel').value = '';
	document.getElementById('inpZona').value = '';
	document.getElementById('inpFechaInicio').value = '';
	document.getElementById('fechaTermino').value = '';
	document.getElementById('inpUsuarioCapturo').value = '';
	document.getElementById('inpFechaModificacion').value = '';
	document.getElementById('inpUsuarioModifico').value = '';
	document.getElementById('inpSituacion').value = '';
	contador=0;
	contnivel=0;
	contzona=0;
	contsituacion=0;
}
function mostrarAlerta() {
	swal("Buen trabajo!", "Los campos se limpiarón correctamente!", "success");
}

function limpiarCampos() {
	mostrarAlerta();
}

// Event Listener para el botón
document.getElementById('limpiarPuesto').addEventListener('click', limpiarInputs);
//FIN función limpiar campos

// Función para validar los campos de nivel, zona, situacion
document.getElementById("registrarPuestoS").addEventListener("click", function () {

	const nivelInput = document.getElementById('inpNivel');
	const nivel = nivelInput.value.trim();

	if (nivel === '') {
		nivelInput.classList.add('input-invalid');
		swal({
			title: 'El campo zona no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',
		});
		return;

	} else {
		nivelInput.classList.remove('input-invalid');
	}

	const zonaInput = document.getElementById('inpZona');
	const zona = zonaInput.value.trim();

	if (zona === '') {
		zonaInput.classList.add('input-invalid');

		swal({
			title: 'El campo zona no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',
		});
		
		return;

	} else {
		zonaInput.classList.remove('input-invalid');
	}

	//const idAltaNivel = data.map(item => item[0]);
	const inicio = document.getElementById('inpFechaInicio').value;
	// const usucapturo = document.getElementById('inpUsuarioCapturo').value;
	const usucapturo = sessionStorage.idUsuario;
	const fechamod = document.getElementById('inpFechaModificacion').value;
	// const usumod = document.getElementById('inpUsuarioModifico').value;
	const situacionControl = document.getElementById('inpSituacion').value;
	const usumod = sessionStorage.idUsuario;

	const nuevoPuesto = {
		nvl_nivel: nivel,
		nvl_zona: idZona,
		nvl_situacion: inpSituacion,
		nvl_fechainicio: inicio,
		nvl_usucapturo: inpUsuarioCapturo,
		nvl_fechamod: fechamod,
		nvl_usumodifico: inpUsuarioModifico,
	};

	//console.log(nuevoPuesto);

	swal({
		title: '¿Estás seguro de registrar este puesto?',
		text: 'Una vez registrado, no podrás deshacer esta acción',
		icon: 'warning',
		buttons: ['Cancelar', 'Aceptar'],
		dangerMode: true,
	}).then((willRegister) => {
		if (willRegister) {
			fetch('api/nivel/registro', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(nuevoPuesto),
			}).then(response => {
				if (!response.ok) {
					throw new Error('Error al registrar el puesto');
				}
				return response.json();
			}).then(data => {
				//console.log(data);
				if (data === true) {
					swal("¡Puesto registrado exitosamente!", {
						icon: "success",
					});
				} else {
							swal({
								title: "¡Error al registrar el puesto!",
								text: `El código ya existe. Detalles del puesto:\n${detallesPuesto}`,
								icon: "error",
							});
				}
			}).catch(error => {
				console.error('Error:', error);
				swal("¡Error al registrar el puesto!", {
					icon: "error",
				});
			});
		}
	});

});
