window.onload = function() {
	VerificarSesion()
	if (!sessionStorage.nombre) {
		window.location.href = url_global;
		return;
	}
	
	//Media hora
	//let contador = setTimeout(borrarSesion, 1800000);
	
	//10 horas
	let contador = setTimeout(borrarSesion, 36000000)

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
		window.location.href = url_global;
		return
	}

	async function ReiniciarContador(contador) {
		window.clearTimeout(contador);

		const request = await fetch('api/sesion/reiniciarContadorSesion', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				return data;
			});

		if (request != true) {
			swal({
				title: "Error al reiniciar tiempo de sesión",
				text: "Contacte al administrador del sistema",
				icon: "error",
				button: "Cerrar",
			});
			
			sessionStorage.clear();
			window.location.href = url_global;
			return
		}
			
		//Media hora
		//contador = setTimeout(borrarSesion, 1800000);
		
		//10 horas
		contador = setTimeout(borrarSesion, 36000000)
	}
	
	$("body").click(function() {
		ReiniciarContador(contador);
	});
};

async function VerificarSesion() {

	const request = await fetch('api/sesion/verificarSesion', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al verificar la sesión, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				swal({
					title: "Error",
					text: "Error al verificar la sesión, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
				sessionStorage.clear();
				window.location.href = url_global;
				
			}else if (data === false) {
				sessionStorage.clear();
				window.location.href = url_global;
			} 
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
				title: "Error",
				text: "Error al verificar la sesión, consulte al administrador del sistema",
				icon: "error",
				button: "Aceptar",
			});
		});
}

//VerificarSesion()

async function MostrarPagina(idModulo) {

	let privilegiosUsuario = {};
	privilegiosUsuario.priv_idusuario = sessionStorage.idUsuario;
	privilegiosUsuario.priv_idmodulo = idModulo;
	
	const request = await fetch('api/usuario/mostrarPagina', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(privilegiosUsuario)
	})
		.then(response => response.json())
		.then(data => {
			return data;
		});

	if (request != true) {
		window.location.href = url_global + "index";
	} 
}