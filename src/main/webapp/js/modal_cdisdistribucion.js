async function consultarEstadoDistribucion() {
	const request = await fetch('api/persona/Obtenerestado/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const estados = await request.json();
	const estadoSelect = $('#estadoModalDistribucion');
	estadoSelect.empty();
	estadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');

	estados.forEach(estado => {
		estadoSelect.append(`<option value="${estado.edo_id}">${estado.edo_nombre}</option>`);
	});
}

$(document).ready(function() {
	consultarEstadoDistribucion();

	// Manejador para el cambio en la selección del estado
	const estadoModalSelectDistribucion = document.getElementById('estadoModalDistribucion');

	estadoModalSelectDistribucion.addEventListener('change', async () => {
		const estadoSeleccionado = estadoModalSelectDistribucion.value;

		if (estadoSeleccionado) {
			const estado = { cdis_estado: estadoSeleccionado };
			await cargarOpcionesModalDistribucion(estado);
		}
	});
});



async function cargarOpcionesModalDistribucion(estado) {
	try {
		const response = await fetch('api/personsaxentrodistribucion', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(estado)
		});

		if (response.ok) {
			const data = await response.json();
		/*	console.log('Datos de la API:', data);*/

			// Guardar datos en sessionStorage
			if (data && data.length > 0) {
				const firstObject = data[0]; // Tomar el primer objeto para el ejemplo
				/*alert('Llena sessionStorage');*/
				sessionStorage.setItem('ctroDist', JSON.stringify(firstObject));
				/*alert('Termina sessionStorage');*/
			}

			const opcionesModalSelect = document.getElementById('opcionesModalDistribucion');
			opcionesModalSelect.innerHTML = '';
			const optionSeleccione = document.createElement('option');
			optionSeleccione.value = '';
			optionSeleccione.text = 'Seleccione una opción';
			opcionesModalSelect.appendChild(optionSeleccione);

			data.forEach(obj => {
				const option = document.createElement('option');
				option.value = obj.cdis_id;
				option.text = obj.cdis_clave + ' - ' + obj.cdis_nombre;

				// Ocultar cdis_unidad en la opción, pero almacenar su valor como data attribute
				option.setAttribute('data-cdis-unidad', obj.cdis_unidad);

				opcionesModalSelect.appendChild(option);
			});
		} else {
			/*console.error('Error al obtener datos: ' + response.status);*/
		}
	} catch (error) {
		/*console.error('Error al realizar la solicitud: ' + error);*/
	}
}



function crearSessionStorage() {

}