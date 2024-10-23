async function ObtenerEjercicioActual() {

	const request = await fetch('api/consultar/ejercicio', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	let ejercicio = await request.json();
	
	if (verificarJson1(ejercicio)) {
		return swal({
		  title: "Error al consultar el ejercicio actual",
		  text: "Contacte a su administrador",
		  icon: "error",
		  button: "Cerrar",
		});
	}
	
	return ejercicio
}

async function ObtenerPeriodoActual() {

	const request = await fetch('api/consultar/periodo', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const periodo = await request.json();
	
	if (verificarJson1(periodo)) {
		return swal({
		  title: "Error al consultar el periodo actual",
		  text: "Contacte a su administrador",
		  icon: "error",
		  button: "Cerrar",
		});
	}
	
	return periodo
}

async function ObtenerTabuladorActual() {

	const request = await fetch('api/consultar/tabulador', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const tabulador = await request.json();
	
	if (verificarJson1(tabulador)) {
		return swal({
		  title: "Error al consultar el tabulador actual",
		  text: "Contacte a su administrador",
		  icon: "error",
		  button: "Cerrar",
		});
	}
	
	return tabulador
}

async function ObtenerTopeDeIngresoUma() {

	const request = await fetch('api/puestos/ObtenerUma', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
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
					title: "Error al obtener la UMA actual",
					text: "Contacte a su administrador",
					icon: "error",
					button: "Cerrar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error al obtener la UMA actual",
					text: "Contacte a su administrador",
					icon: "error",
					button: "Cerrar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
				title: "Error al obtener la UMA actual",
				text: "Contacte a su administrador",
				icon: "error",
				button: "Cerrar",
			});
		});

	const topeIngreso = await request

	return topeIngreso
}

async function ObtenerSalarioMinimo(zona) {
	
	if (zona === 'I' || zona === 'II') {
		zona = 2
	} else {
		zona = 3
	}
	
	let datos = {}
	datos.salm_zona = zona
	
	const request = await fetch('api/puestos/SalarioMinimo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
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
					title: "Error al obtener el salario minimo actual",
					text: "Contacte a su administrador",
					icon: "error",
					button: "Cerrar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error al obtener el salario minimo actual",
					text: "Contacte a su administrador",
					icon: "error",
					button: "Cerrar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
				title: "Error al obtener el salario minimo actual",
				text: "Contacte a su administrador",
				icon: "error",
				button: "Cerrar",
			});
		});

	const salarioMinimo = await request
	
	return salarioMinimo
}


