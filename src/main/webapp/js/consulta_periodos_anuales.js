
// INICIO variables globales
let ultimoAño = 0;
let fechaHoy;
let usuCapturo;
// FIN variables globales

// INICIO funcion para llamar la API y llenar el select e inputs
async function fillDatosSnEjercicio() {
	const request = await fetch('api/ejercicio/id/ejercicio/fechainicio/fechatermino/situacion', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const datosApi = await request.json();
    console.log(datosApi)
    // Ordenar por año de menor a mayor
    datosApi.sort((a, b) => {
        const añoA = parseInt(a[1]);
        const añoB = parseInt(b[1]);
        return añoA - añoB;
    });

	const tabla = document.querySelector("table tbody");

    tabla.innerHTML = "";

    datosApi.forEach((dato) => {
        const fila = document.createElement("tr");
    
        // Año
        const año = dato[1];
        const celdaAño = document.createElement("td");
        celdaAño.textContent = año;
        fila.appendChild(celdaAño);

        // Actualizar la variable del último año
        if (año > ultimoAño) {
            ultimoAño = año;
        }
        const fechaInicio = `01-01-${año}`;
        const fechaTermino = `31-12-${año}`;
        
        // Fecha de apertura
        const celdaFechaInicio = document.createElement("td");
        celdaFechaInicio.textContent = fechaInicio;
        fila.appendChild(celdaFechaInicio);
        
        // Fecha de cierre
        const celdaFechaTermino = document.createElement("td");
        const fechaCierre = dato[3];
        if (!fechaCierre) {
            celdaFechaTermino.textContent = "N/A";
        } else {
            celdaFechaTermino.textContent = fechaTermino;
        }
        fila.appendChild(celdaFechaTermino);        
    
        // Situación
        const celdaSituacion = document.createElement("td");
        const situacion = dato[7] === 1 ? "ACTIVO" : "INACTIVO";
        celdaSituacion.textContent = situacion;
        fila.appendChild(celdaSituacion);
    
        // Datos de control (con botón y icono SVG)
        const celdaControl = document.createElement("td");
        celdaControl.className = "text-center"
        const botonControl = document.createElement("button");
        botonControl.className = "btn btn-primary";
        botonControl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
        </svg>
        `;



// Función para formatear la fecha en el formato día-mes-año
function formatearFecha(fecha) {
    if (!fecha) return ""; // Maneja casos en los que la fecha no esté definida
    const partes = fecha.split('-');
    if (partes.length !== 3) return fecha; // Si la fecha no está en el formato esperado, la devuelve sin cambios

    // Descompón la fecha en partes
    const año = partes[0];
    const mes = partes[1];
    const día = partes[2];

    // Regresa la fecha en el formato día-mes-año
    return `${día}-${mes}-${año}`;
}

botonControl.addEventListener("click", () => {    
    document.getElementById("inpFechaInicio").value = formatearFecha(dato[2]);
    document.getElementById("inpFechaTermino").value = formatearFecha(dato[3]) || "N/A";
    document.getElementById("inpUsuarioCapturo").value = dato[4];
    document.getElementById("inpUsuarioModifico").value = dato[6];
    document.getElementById("inpFechaModificacion").value = formatearFecha(dato[5]);
    document.getElementById("inpSituacion").value = (dato[7] === 1 ? "ACTIVO" : "INACTIVO");

    $('#modalDatosControl').modal('show');
});
        
        celdaControl.appendChild(botonControl);
        fila.appendChild(celdaControl);
    
        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    });    
}
fillDatosSnEjercicio();
// FIN funcion para llamar la API y llenar el select e inputs

// INICIO boton para cerrar el modal
btnCerrarModal.addEventListener("click", () =>{
    $('#modalDatosControl').modal('hide');
})
// FIN boton para cerrar el modal

// INICIO funcion para verificar si un año es bisiesto
function esAnioBisiesto(anio) {
    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
}
// FIN funcion para verificar si un año es bisiesto

// INICIO funcion para generar las fechas de inicio y fin de los periodos quincenales
function generarPeriodos(anio) {
    const periodos = [];
    let fechaInicio = new Date(anio, 0, 1); // 1 de enero del año dado
    let fechaFin;

    for (let quincena = 1; quincena <= 24; quincena++) {
        if (quincena % 2 === 1) {
            // Quincenas impares terminan el día 15 del mes actual
            fechaFin = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 15);
        } else {
            // Quincenas pares terminan al final del mes actual
            fechaFin = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth() + 1, 0);
        }

        // Ajustes para el caso especial de año bisiesto en febrero
        if (esAnioBisiesto(anio) && fechaInicio.getMonth() === 1 && quincena === 4) {
            fechaFin.setDate(29); // Última quincena de febrero
        }

        periodos.push({
            anio: anio,
            quincena: quincena,
            fechaInicio: fechaInicio.toISOString().split('T')[0],
            fechaFin: fechaFin.toISOString().split('T')[0],
            situacion: 2,
        });

        // Ajustar fecha de inicio para la próxima quincena
        fechaInicio = new Date(fechaFin);
        fechaInicio.setDate(fechaInicio.getDate() + 1);
    }
    return periodos;
}
// FIN funcion para generar las fechas de inicio y fin de los periodos quincenales

// INICIO funcion para obtener datos y conectarlo con el controller
function obtenerDatosEInsertar(anio) {

    const periodos = generarPeriodos(anio);


    // Arreglo para almacenar datos
    const registrosParaInsertar = [];

    usuCapturo = sessionStorage.idUsuario;
	fechaHoy = new Date().toISOString().split('T')[0];

    // Recorremos cada periodo y extraemos datos
    for (let i = 0; i < periodos.length; i++) {
        const registro = periodos[i];

        const nuevoRegistro = {
            pp_ejercicio: registro.anio,
            pp_quincena: registro.quincena,
            pp_fechadesde: registro.fechaInicio,
            pp_fechahasta: registro.fechaFin,
            pp_operando: i === 0 ? 1 : 2,
            pp_fechaapertura: i === 0 ? fechaHoy : null,
            pp_usuaperturo: i === 0 ? usuCapturo : null,
        };

        registrosParaInsertar.push(nuevoRegistro);
    }

    const jsonString = JSON.stringify({registrosParaInsertar});


    let url = "api/sn_periodosdepago/subir/datos/guardarDatoSnPeriodoPago";

	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({registrosParaInsertar})
	};

	fetch(url, options)
		.then(response => {
			if (response.ok) {
				return response.text();
			} else {
				throw new Error('Error al realizar la solicitud');
			}
		})
		.then(data => {
			if (data.includes("Advertencia:")) {
				return swal({
					title: "Advertencia",
					text: data,
					icon: "warning",
					button: "Aceptar"
				});
			} else {
				return swal({
					title: "El registro fue exitoso",
					text: "Buen trabajo !!",
					icon: "success",
					button: "Aceptar"
				});
			}
		})
		.then(() => {
			location.reload();
		})
		.catch(error => {
			console.error('Error:', error);
			swal("Oops!", "¡Algo salió mal!", "error");
		});
}
// FIN funcion para obtener datos y conectarlo con el controller

// INICIO funcion para el boton btnRegistrarPeriodo
document.getElementById("btnRegistrarPeriodo").addEventListener("click", function () {
    
    const anioParaRegistrar = ultimoAño + 1;
    obtenerDatosEInsertar(anioParaRegistrar);

});
// FIN funcion para el boton btnRegistrarPeriodo