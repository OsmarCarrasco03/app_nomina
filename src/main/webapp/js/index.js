$(document).ready(function() {
	borrarSesion();
});

async function borrarSesion() {

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
}