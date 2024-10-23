async function iniciarSesion() {
	let datos = {};
	datos.usu_usuario = document.getElementById('nombre').value.trim();
	datos.usu_password = document.getElementById('contrasena').value.trim();

	const request = await fetch('api/login', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});

	let respuesta = await request.json();

	if (verificarJson1(respuesta)) {
		swal({
			title: "Las credenciales son incorrectas",
			text: "Por favor intente nuevamente",
			icon: "error",
			button: "Cerrar",

		});
		return;
	}

	let sesionUsuario = {};
	let usuFechaInicio = "";
	let usuFechaTermino = "";
	let usuSituacion = 0;
	let usuReset = 0;

	for (let respuestas of respuesta) {
		sesionUsuario.usu_id = sessionStorage.idUsuario = respuestas[0];
		sessionStorage.nombre = respuestas[1];
		sessionStorage.permisos = respuestas[2];
		usuFechaInicio = respuestas[3];
		usuFechaTermino = respuestas[4];
		usuSituacion = respuestas[5];
		usuReset = respuestas[6];
	}
	
	if (!verificarSituacion(usuSituacion)) {
		swal({
			title: "El usuario está deshabilitado",
			text: "Contacte al administrador del sistema para solicitar una reactivación de usuario",
			icon: "error",
			button: "Cerrar",
		});
		return;
	}

	switch (fechasUsuario(usuFechaInicio, usuFechaTermino)) {
		case 0: //Fecha actual menor o igual a la fecha de inicio
			const dia = usuFechaInicio.split("-")[2];
			const mes = usuFechaInicio.split("-")[1];
			const ejercicio = usuFechaInicio.split("-")[0];

			const fechaOrdenada = dia + "-" + mes + "-" + ejercicio;

			swal({
				title: "El usuario se activará en la siguiente fecha: " + fechaOrdenada,
				text: "",
				icon: "info",
				button: "Cerrar",
			});
			break;
		case 1: //Fecha de termino alcanzada o mayor a la actual
			swal({
				title: "La fecha de termino del usuario ha sido alcanzada",
				text: "Comuníquese con el administrador para renovarla",
				icon: "info",
				button: "Cerrar",
			});
			break;
		case 2: //Fechas vigentes
			const request = await fetch('api/sesion/crearSesion', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(sesionUsuario)
			});

			respuesta = await request.text();

			if (respuesta != "OK") {
				swal({
					title: "Error al iniciar sesión",
					text: "Contacte al administrador del sistema",
					icon: "error",
					button: "Cerrar",
				});
				return;
			}
			
			if (usuReset === 2){
				window.location.href = url_global + 'index';
				return;
			}
			
			window.location.href = url_global + 'cambiar_contrasena';
			break;
		default:
			swal({
				title: "Error del sistema",
				text: "Contacte al administrador",
				icon: "error",
				button: "Cerrar",
			});
			break;
	}
}

const verificarJson1 = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
}

function verificarSituacion(usuSituacion){
	if (usuSituacion === 1) {
		return true;
	}
	return false;
}

function fechasUsuario(usuFechaInicio, usuFechaTermino){
	let fechaActual = new Date().toISOString();
	let fechaInicio = new Date(usuFechaInicio).toISOString();
	
	if(usuFechaTermino != null){
		let fechaTermino = new Date(usuFechaTermino).toISOString();
		
		if (fechaActual < fechaInicio) {
			return 0; //Fecha actual menor o igual a la fecha de inicio
			
		} else if (fechaActual >= fechaTermino) {
			return 1; //Fecha de termino alcanzada o mayor a la fecha actual
		
		} else {
			return 2;
		}

	}else{
		
		if (fechaActual < fechaInicio) {
			return 0; //Fecha actual menor o igual a la fecha de inicio
		}
		return 2;
	}
}

async function cerrarSesion() {

	const request = await fetch('api/sesion/borrarSesion', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	respuesta = await request.text();

	if (respuesta != "OK") {
		swal({
			title: "Error al cerrar sesión",
			text: "Contacte al administrador del sistema",
			icon: "error",
			button: "Cerrar",
		});
	}
	
	sessionStorage.clear();
	window.location.href = url_global;
	return
}

function moveAll(fromx, to) {
    $('#'+fromx+' option').remove().appendTo('#'+to); 
}

function moveSelected(fromx, to) {
    $('#'+fromx+' option:selected').remove().appendTo('#'+to); 
}
function selectAll() {
    $("select option").attr("selected","selected");
}