let anioFiltrado;
let idPeriodoQuincenalActual;
let idPeriodoQuincenalNuevo;
let periodoActivoEncontrado = false;

let idPasado;
let idPresente;

$(function() {
    //MostrarPagina(37);
    if (sessionStorage.permisos == 1) {
        $("td:nth-child(6), th:nth-child(6)").prop("hidden", false);
    }
});

const tabla = document.querySelector("table tbody");
const inpFechaInicio = document.getElementById("inpFechaInicio");
const inpFechaTermino = document.getElementById("inpFechaTermino");
const inpUsuarioCapturo = document.getElementById("inpUsuarioCapturo");
const inpUsuarioModifico = document.getElementById("inpUsuarioModifico");
const inpSituacion = document.getElementById("inpSituacion");

// INICIO funcion para llamar la API y llenar la tabla
async function fillDatosSnPeriodosPago() {
    const anioRequest = await fetch('api/ejercicio/anio');
    const dataAnio = await anioRequest.json();

    const periodosRequest = await fetch('api/sn_periodospago/datos/anio');
    const periodosData = await periodosRequest.json();    
    const periodoFiltrado = periodosData.filter(item => item[1] === dataAnio[0][0]); // dataAnio[0][0] Contiene el año actual
    anioFiltrado = periodoFiltrado[0][1];

    tabla.innerHTML = ""; // Limpiar la tabla

    periodoFiltrado.sort((a, b) => a[2] - b[2]);

    //console.log(periodoFiltrado)

    function formatoFecha(fecha) {
        // Suponiendo que la fecha viene en formato "año-mes-día"
        const parte = fecha.split("-");
        return `${parte[2]}-${parte[1]}-${parte[0]}`;
    }
      
    periodoFiltrado.forEach((dato) => {
        //console.log(dato)
        const fila = document.createElement("tr");

        // Crear celdas y asignar contenido
        createCell(fila, dato[1]); // Año
        createCell(fila, dato[2]); // Periodo
        createCell(fila, formatoFecha(dato[3])); // Fecha Desde
        createCell(fila, formatoFecha(dato[4])); // Fecha Hasta
        createCell(fila, dato[5] === 1 ? "ACTIVO" : "INACTIVO"); // Situación
        // Datos de control
        if (sessionStorage.permisos == 1) {
            const celdaControl = document.createElement("td");
            celdaControl.className = "text-center";
            const botonControl = document.createElement("button");
            botonControl.className = "btn btn-primary";
            botonControl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
            </svg>`;
            celdaControl.appendChild(botonControl);
            fila.appendChild(celdaControl);
        
            // Función para formatear la fecha de año-mes-día a día-mes-año
            function formatearFecha(fecha) {
                if (!fecha) return "N/A"; // Retorna "N/A" si la fecha es nula o vacía
                const partes = fecha.split("-");
                if (partes.length !== 3) return fecha; // Si el formato no es el esperado, retorna la fecha original
                return `${partes[2]}-${partes[1]}-${partes[0]}`;
            }
        
            botonControl.addEventListener("click", () => {
                inpFechaInicio.value = formatearFecha(dato[6]);
                inpFechaTermino.value = formatearFecha(dato[8]) || "N/A";
                inpUsuarioCapturo.value = dato[7];
                inpUsuarioModifico.value = dato[11];
                inpSituacion.value = (dato[5] === 1 ? "ACTIVO" : "INACTIVO");
                $('#modalDatosControl').modal('show');
            });
        }

        if (dato[5] == 1) {
            periodoActivoEncontrado = true;
            idPeriodoQuincenalActual = dato[2];
            idPeriodoQuincenalNuevo = idPeriodoQuincenalActual + 1;

            idPasado = dato[0];
            idPresente = idPasado + 1;
            fila.classList.add("table-success");
            
            //Si el periodo es 24 se cambia el texto
            if(idPeriodoQuincenalActual == 24){
                document.getElementById("btnCerrarPeriodo").hidden = false;
                document.getElementById("btnNuevoPeriodo").hidden = true;
            }
        }

        tabla.appendChild(fila); // Agregar la fila a la tabla
    });

    // Si no se encontró ningún periodo activo, desactivar el botón de dar de alta periodo nuevo y mostrar un mensaje
    if (!periodoActivoEncontrado) {
        document.getElementById("btnNuevoPeriodo").hidden = true;
        const mensajeContainer = document.createElement("div");
        mensajeContainer.classList.add("text-center"); // Centrar el contenido
        mensajeContainer.innerHTML = '<p class="text-danger">Esperar a que se active el primer periodo o inicie el nuevo año</p>';
        // Insertar el contenedor antes de la tabla
        document.getElementById("forms").insertBefore(mensajeContainer, document.getElementById("forms").firstChild);
    }
}


// Función para actualizar la tabla
function actualizarTabla() {
    fillDatosSnPeriodosPago(); // Vuelve a llenar la tabla con los datos actualizados
}

// Llamar a fillDatosSnPeriodosPago() cuando se carga la página por primera vez
fillDatosSnPeriodosPago();


// INICIO boton para cerrar el modal
btnCerrarModal.addEventListener("click", () => {
    $('#modalDatosControl').modal('hide');
});
// FIN boton para cerrar el modal

// INICIO boton para dar de alta el nuevo periodo
btnNuevoPeriodo.addEventListener("click", () => {
    swal({
        title: "¿Estas seguro de querer abrir el siguiente periodo?",
        text: "Recuerda que para abrir un nuevo periodo deben de estar cerradas todas las nominas, excepto la 77 - CANCELACIONES",
        icon: "warning",
        buttons: {
            cancel: "Cancelar",
            confirm: "Aceptar"
        },
        dangerMode: true,
    })
    .then((willConfirm) => {
        if (willConfirm) {
            bajaDePeriodo() // Llamada a la función para dar de baja el periodo
                .then(response => {
                    if (!response.includes("Advertencia:")) {
                        // Si la respuesta no incluye "Advertencia:", entonces puedes ejecutar la función para dar de alta el periodo
                        altaDePeriodo();
                    } else {
                        // Si la respuesta incluye "Advertencia:", muestra el mensaje de advertencia
                        swal({
                            title: "Advertencia no se pudo cerrar el periodo actual",
                            text: response,
                            icon: "warning",
                            button: "Aceptar"
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    swal("Oops!", "Algo salió mal!", "error");
                });
        }
    });
});

//INICIO boton para cerrar periodo
btnCerrarPeriodo.addEventListener("click", () => {
    swal({
        title: "¿Estás seguro de querer cerrar el  periodo?",
        text: "Recuerda que para cerrar un periodo deben de estar cerradas todas las nóminas, excepto la 77 - CANCELACIONES",
        icon: "warning",
        buttons: {
            cancel: "Cancelar",
            confirm: "Aceptar"
        },
        dangerMode: true,
    })
    .then((willConfirm) => {
        if (willConfirm) {
            bajaDePeriodo() // Llamada a la función para dar de baja el periodo
                .then(response => {
                    if (!response.includes("Advertencia:")) {
                        // Si la respuesta no incluye "Advertencia:", entonces muestra el mensaje de éxito
                        swal("¡Se cerró correctamente el periodo!", "", "success").then(() => {
                            // Recarga la página después de mostrar el mensaje de éxito
                            location.reload();
                        });
                    } else {
                        // Si la respuesta incluye "Advertencia:", muestra el mensaje de advertencia
                        swal({
                            title: "Advertencia no se pudo cerrar el periodo actual",
                            text: response,
                            icon: "warning",
                            button: "Aceptar"
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    swal("Oops!", "Algo salió mal!", "error");
                });
        }
    });
});

function createCell(row, text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    row.appendChild(cell);
}


function bajaDePeriodo() {
    let fechacierre = new Date().toISOString().slice(0, 10);
    let usucerro = sessionStorage.idUsuario;
    let data = {
        pp_ejercicio: anioFiltrado,
        pp_quincena: idPeriodoQuincenalActual,
        pp_fechacierre: fechacierre,
        pp_usucerro: usucerro,
        pp_fechamod: fechacierre,
        pp_usumodifico: usucerro
    };

    let url = "api/subir/datos/bajaDePeriodo";

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error al realizar la solicitud');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            swal("Oops!", "Algo salió mal!", "error");
        });
}

function altaDePeriodo() {
    let fechaapertura = new Date().toISOString().slice(0, 10);
    let usuaperturo = sessionStorage.idUsuario;

    let data = {
        pp_id: idPresente,
        pp_ejercicio: anioFiltrado,
        pp_quincena: idPeriodoQuincenalNuevo,
        pp_operando: 1,
        pp_fechaapertura: fechaapertura,
        pp_usuaperturo: usuaperturo
    };

    let periodoNuevoJson = JSON.stringify(data);

    let url = "api/subir/datos/altaDePeriodo";

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
                    title: "Advertencia no se pudo dar de alta el nuevo periodo",
                    text: data,
                    icon: "warning",
                    button: "Aceptar"
                });
            } else {
                return swal({
                    title: "El periodo se aperturo correctamente",
                    icon: "success",
                    button: "Aceptar"
                });
            }
        })
        .then(() => {
            actualizarTabla();
        })
        .catch(error => {
            console.error('Error:', error);
            swal("Oops!", "Algo salió mal!", "error");
        });
}


