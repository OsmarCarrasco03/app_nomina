


async function buscarPersona() {
	const codigoElegido = document.getElementById('codigo').value;
	const descripcionElegido = document.getElementById('descripcion').value;
	const tipoElegido = document.getElementById('tipo').value;
	const situacionElegido = document.getElementById('situacion').value;

	const datos = {};

	if (codigoElegido) {
		datos.ctgp_codigo = codigoElegido;
	}

	if (descripcionElegido) {
		datos.ctgp_descripcion = descripcionElegido;
	}

	if (tipoElegido) {
		datos.ctgp_tipo = tipoElegido;
	}

	if (situacionElegido) {
		datos.ctgp_situacion = situacionElegido;
	}



	const request = await fetch('api/puestos/consulta/puestoxcodigo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});

	const personas = await request.json();

	descargarCSV(personas);


}


const button = document.getElementById('generarReporteBtn');

const loadingOverlay = document.getElementById('loadingOverlay');


// Función para mostrar la imagen de carga
function mostrarCarga() {
	loadingOverlay.style.display = 'flex';
}

// Función para ocultar la imagen de carga
function ocultarCarga() {
	loadingOverlay.style.display = 'none';
}

button.addEventListener('click', async () => {
	try {
		mostrarCarga(); // Mostrar la imagen de carga al iniciar la búsqueda

		// Realizar la búsqueda y generación del reporte
		await buscarPersona();


	} catch (error) {
		// En caso de error, mostrar un mensaje de error
		swal({
			title: "Error",
			text: "Hubo un error al generar el reporte.",
			icon: "error",
			button: "Aceptar",
		});
	} finally {
		// Aumentar el tiempo antes de ocultar la imagen de carga
		setTimeout(() => {
			ocultarCarga(); // Ocultar la imagen de carga al completar la búsqueda, independientemente del resultado
			// Mostrar un mensaje de éxito después de completar la búsqueda
			swal({
				title: "Reporte generado con éxito!",
				text: "Buen trabajo!",
				icon: "success",
				button: "Aceptar",
			});
		}, 1000); // Cambia el valor 3000 por el tiempo en milisegundos que desees
	}


	// Reiniciar los valores de los selects
	const selects = document.querySelectorAll('select');
	selects.forEach(select => {
		select.value = "";
	});
});



function convertirAFormatoCSV(datos) {
    const separador = ',';
    const csvRows = [];

    // Agregar una fila de encabezado con descripciones
    const encabezado = ['ID', 'CODIGO', 'DESCRIPCION', 'FECHA INCIO', 'FECHA TERMINO', 'USU CAPTURO', 'FECHAMOD', 'USUMODIFICO', 'IDSITUACION', 'IDTIPO', 'SITUACION', 'TIPO', 'USU CAPTURO', 'USU MODIFICO'];
    csvRows.push(encabezado);

    // Convertir los datos en filas
    datos.forEach(fila => {
        const filaCSV = Object.values(fila).map(valor => {
            if (typeof valor === 'string') {
                return `"${valor.replace(/"/g, '""')}"`;
            }
            return valor;
        });
        csvRows.push(filaCSV);
    });

    const csv = csvRows.map(row => row.join(separador)).join('\n');
    const BOM = '\uFEFF'; // Marca de orden de bytes para UTF-8

    return `data:text/csv;charset=utf-8,${encodeURIComponent(BOM + csv)}`;
}

function descargarCSV(datos) {
    const csv = convertirAFormatoCSV(datos);

    const enlace = document.createElement('a');
    enlace.setAttribute('href', csv);
    enlace.setAttribute('download', 'Reporte Código de puesto.csv');

    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}



async function consultarTipo() {
	const request = await fetch('api/puesto/tipo/codigo', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const personas = await request.json();


	const tipSelect = $('#tipo');
	tipSelect.empty();


	tipSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		tipSelect.append(`<option value="${persona.lpto_clave}">${persona.lpto_descripcion}</option>`);
	});
}


$(document).ready(function () {
	consultarTipo();
});

async function consultarSitu() {
	const request = await fetch('api/puesto/situacion/codigo', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const personas = await request.json();


	const situSelect = $('#situacion');
	situSelect.empty();


	situSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		situSelect.append(`<option value="${persona.lpto_clave}">${persona.lpto_descripcion}</option>`);
	});
}


$(document).ready(function () {
	consultarSitu();
});




let footer = document.querySelector('footer');

if (!footer) {
	footer = document.createElement('footer');


	footer.innerHTML = `
					        <div class="footer-content">
					            <p>Copyright &copy; 2023. Financiera para el Bienestar, Todos los derechos reservados.</p>
					        </div>
					    `;


	footer.style.backgroundColor = '#13322b';
	footer.style.color = 'white';
	footer.style.textAlign = 'center';
	footer.style.fontSize = '15px';
	footer.style.position = 'fixed';
	footer.style.bottom = '0';
	footer.style.width = '100%';


	document.body.appendChild(footer);
}



function soloLetras(e) {
	const input = e.target;
	const keyCode = e.keyCode || e.which;
	const tecla = String.fromCharCode(keyCode);

	// Permitir letras mayúsculas, números y teclas especiales (borrar, mover cursor)
	const permitidos = /[A-Za-z0-9\s]/;
	const especiales = [8, 37, 39, 46];
	const esEspecial = especiales.includes(keyCode);

	// Si la tecla presionada no es permitida y no es una tecla especial, prevenir su ingreso
	if (!permitidos.test(tecla) && !esEspecial) {
		e.preventDefault();
		return false;
	}

	// Convertir todo el valor del input a mayúsculas después de un breve retraso
	setTimeout(function () {
		input.value = input.value.toUpperCase();
	}, 0);

	return true;
}


function soloLetrasDes(e) {
	const input = e.target;
	const keyCode = e.keyCode || e.which;
	const tecla = String.fromCharCode(keyCode).toUpperCase();
	const letrasMayusculas = " ÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

	const especiales = [8, 37, 39, 46];
	const esEspecial = especiales.includes(keyCode);

	if (letrasMayusculas.indexOf(tecla) === -1 && !esEspecial) {
		e.preventDefault();
		return false;
	}

	setTimeout(function () {
		input.value = input.value.toUpperCase(); // Convertir todo el valor del input a mayúsculas después de un breve retraso
	}, 0);

	return true;
}

