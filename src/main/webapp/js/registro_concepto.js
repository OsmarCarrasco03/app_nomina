//SELECT DE CLASIFICACIÓN =====con_clasificador=====
async function consultarClasificacion() {
	try {
		const request = await fetch('api/persona/ObtenerClasificacion', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de clasifiaciones.');
		}

		const clasificaciones = await request.json();
		const clasificacionSelect = $('#clasificacionRegistro');
		clasificacionSelect.empty();
		clasificacionSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		clasificaciones.forEach(clasificacion => {
			clasificacionSelect.append(`<option value="${clasificacion.lcdm_clave}">${clasificacion.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultarClasificacion()
});

//SELECT PARA TIPO =====con_tipo=====
async function consultarTipo() {
	try {
		const request = await fetch('api/persona/Obtenertipo', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const tipos = await request.json();
		const tipoSelect = $('#tipo');
		tipoSelect.empty();
		tipoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		tipos.forEach(tipo => {
			tipoSelect.append(`<option value="${tipo.lcdm_clave}">${tipo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultarTipo();
});

/*AQUI EMPIEZA EL SELECT DE GRUPO ACUMULADO ====con_grupoacum=====*/
async function consultargrupoacum() {
	try {
		const request = await fetch('api/persona/Obtenergrupoacum', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const grupos = await request.json();
		const grupoSelect = $('#grupoAcum');
		grupoSelect.empty();
		grupoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		grupos.forEach(grupo => {
			grupoSelect.append(`<option value="${grupo.lcdm_clave}">${grupo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargrupoacum();
});

/*AQUI EMPIEZA EL SELECT DE GRUPO ACUMD  =====con_acumd====*/
async function consultargrupoacumd() {
	try {
		const request = await fetch('api/persona/Obtenergrupoacum', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const gruposd = await request.json();
		const grupodSelect = $('#grupoAcumd');
		grupodSelect.empty();
		grupodSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gruposd.forEach(grupod => {
			grupodSelect.append(`<option value="${grupod.lcdm_clave}">${grupod.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargrupoacumd();
});



async function consultargruposecu() {
	try {
		const request = await fetch('api/persona/Obtenergruposecu', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const grupossecu = await request.json();
		const grupoSelect = $('#grupoSecu');
		grupoSelect.empty();
		grupoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		grupossecu.forEach(grupo => {
			grupoSelect.append(`<option value="${grupo.lcdm_clave}">${grupo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargruposecu();
});


// async function consultarTimbradoAlfabeticamente() {
//     try {
//         const request = await fetch('api/persona/Obtenertimbrado', {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//         });

//         if (!request.ok) {
//             throw new Error('No se pudo obtener la lista de timbrados.');
//         }

//         const timbrados = await request.json();
//         const timbradoSelect = $('#alfatimbrado');
//         timbradoSelect.empty();
//         timbradoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
//         timbrados.forEach(timbrado => {
//             timbradoSelect.append(`<option value="${timbrado.ltim_clave}">${timbrado.ltim_clavealfabetica}</option>`);
//         });

//         // Agregar evento de cambio al select de timbrado alfabéticamente
//         timbradoSelect.on('change', function () {
//             const selectedClave = $(this).val();
//             if (selectedClave) {
//                 // Si se selecciona un valor alfanumérico, mostrar la descripción correspondiente
//                 const selectedTimbrado = timbrados.find(timbrado => timbrado.ltim_clave === selectedClave);
//                 $('#timbrado-descripcion').text(selectedTimbrado.ltim_descripcion);
//             } else {
//                 // Si no se selecciona ningún valor, ocultar la descripción
//                 $('#timbrado-descripcion').text('');
//             }
//         });

//     } catch (error) {
//         console.error(error);
//     }
// }

// $(document).ready(function () {
//     consultarTimbradoAlfabeticamente();
// });




$(document).ready(function () {
    // Agregar evento de clic al botón para abrir el modal
    $('#btnAbrirModal').on('click', function () {
        consultarPartida();
    });

    // Función para consultar las partidas y mostrarlas en el modal
    async function consultarPartida() {
        try {
            const partidas = await obtenerPartidas(); // Llama a la función para obtener las partidas
            mostrarPartidas(partidas); // Llama a la función para mostrar las partidas en la tabla
        } catch (error) {
            console.error(error);
        }
    }

    // Función para obtener las partidas desde la API
    async function obtenerPartidas() {
        const request = await fetch('api/persona/Obtenerpartida', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!request.ok) {
            throw new Error('No se pudo obtener la lista de partidas.');
        }

        return await request.json();
    }
    
    
    
    // Función para mostrar las partidas en la tabla
function mostrarPartidas(partidas) {
    const tbodyPartidas = $('#tbodyPartidas');
    tbodyPartidas.empty();
    // Agregar una fila por cada partida
    partidas.forEach(partida => {
        const fila = `
            <tr>
                <td>${partida.cg_clave}</td>
                <td>${partida.cg_nombre}</td>
            </tr>`;
        tbodyPartidas.append(fila);
    });

    // Establecer estilos para la tabla
    tbodyPartidas.addClass('table table-striped');

    // Establecer estilos para cambiar el color de fondo al pasar el cursor sobre las filas de la tabla
    $('#tbodyPartidas').on('mouseenter', 'tr', function () {
        $(this).addClass('fila-hover');
    }).on('mouseleave', 'tr', function () {
        $(this).removeClass('fila-hover');
    });

    // Agregar el filtro de búsqueda
    $('#filtroBusqueda').css({
        'padding': '8px',
        'margin-bottom': '10px',
        'border': '1px solid #ddd',
        'border-radius': '4px',
        'width': '100%'
    }).on('input', function () {
        const valorFiltro = $(this).val().toLowerCase();
        $('#tbodyPartidas tr').each(function () {
            const textoFila = $(this).text().toLowerCase();
            const filaVisible = textoFila.includes(valorFiltro);
            $(this).toggle(filaVisible);
        });
    });

    // Agregar evento de clic a las filas de la tabla
    $('#tbodyPartidas').on('click', 'tr', function () {
        // Remover la clase 'seleccionada' de todas las filas
        $('#tbodyPartidas tr').removeClass('seleccionada');
        // Agregar la clase 'seleccionada' solo a la fila clicada
        $(this).addClass('seleccionada');

        // Obtener los datos de la partida seleccionada
        const clavePartida = $(this).find('td:first').text();
        const nombrePartida = $(this).find('td:eq(1)').text();
        // Pegar los datos en los inputs deseados
        $('#partida').val(clavePartida);
        $('#descpartida').val(nombrePartida);
        // Cerrar el modal después de seleccionar la partida
        $('#myModal').modal('hide');
    });

    // Abrir el modal después de cargar los datos
    $('#myModal').modal('show');

    // Agregar evento de desplazamiento al contenedor de la tabla
    $('#myModal .modal-body').on('scroll', function () {
        // Remover la clase 'seleccionada' de todas las filas
        $('#tbodyPartidas tr').removeClass('seleccionada');
    });
}

});


// Agregar evento de desplazamiento al contenedor de la tabla
$('#myModal .modal-body').on('scroll', function () {
    // Obtener la posición del scroll
    var scrollPosition = $(this).scrollTop();
    // Obtener la altura de cada fila de la tabla
    var rowHeight = $(this).find('tr').outerHeight();
    // Calcular el índice de la fila visible en la parte superior del contenedor
    var rowIndex = Math.floor(scrollPosition / rowHeight);
    // Quitar la clase de todas las filas
    $('#tbodyPartidas tr').removeClass('tr-scroll-hover');
    // Agregar la clase a la fila visible en la parte superior del contenedor
    $('#tbodyPartidas tr').eq(rowIndex).addClass('tr-scroll-hover');
});


// const partidas = await request.json();
// const tbodyPartidas = $('#tbodyPartidas');
// tbodyPartidas.empty();

// // Crear la tabla para mostrar las partidas
// const tablaPartidas = $('<table>').addClass('tabla-partidas');
// const encabezadoPartidas = $('<thead>');
// const encabezadoFilaPartidas = $('<tr>');
// const encabezadoClavePartida = $('<th>').text();
// const encabezadoNombrePartida = $('<th>').text();

// encabezadoFilaPartidas.append(encabezadoClavePartida, encabezadoNombrePartida);
// encabezadoPartidas.append(encabezadoFilaPartidas);
// tablaPartidas.append(encabezadoPartidas);

// // Crear el cuerpo de la tabla
// const cuerpoTablaPartidas = $('<tbody>');

// // Agregar cada partida como una fila de la tabla
// partidas.forEach(function (partida) {
// 	const filaPartida = $('<tr>');
// 	const celdaClavePartida = $('<td>').text(partida.cg_clave);
// 	const celdaNombrePartida = $('<td>').text(partida.cg_nombre);

// 	filaPartida.append(celdaClavePartida, celdaNombrePartida);
// 	cuerpoTablaPartidas.append(filaPartida);
// });

// // Agregar el cuerpo de la tabla al cuerpo de la tabla principal
// tablaPartidas.append(cuerpoTablaPartidas);

// // Agregar la nueva tabla al cuerpo de la tabla principal
// tbodyPartidas.append(tablaPartidas);

// // Agregar evento de clic a las filas de la tabla
// tbodyPartidas.on('click', 'tr', function () {
// 	// Remover la clase 'seleccionada' de todas las filas
// 	tbodyPartidas.find('tr').removeClass('seleccionada');
// 	// Agregar la clase 'seleccionada' a la fila clicada
// 	$(this).addClass('seleccionada');

// 	// Obtener los datos de la partida seleccionada
// 	const clavePartida = $(this).find('td:first').text();
// 	const nombrePartida = $(this).find('td:eq(1)').text();
// 	// Pegar los datos en los inputs deseados
// 	$('#partida').val(clavePartida);
// 	$('#descpartida').val(nombrePartida);
// 	// Cerrar el modal después de seleccionar la partida
// 	$('#myModal').modal('hide');
// });

// // Estilo para cambiar el color de fondo al pasar el cursor sobre las filas de la tabla
// tbodyPartidas.on('mouseenter', 'tr', function () {
// 	$(this).addClass('fila-hover');
// }).on('mouseleave', 'tr', function () {
// 	$(this).removeClass('fila-hover');
// });






async function consultarPartidaS() {
    try {
        const request = await fetch('api/persona/Obtenertimbrado', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!request.ok) {
            throw new Error('No se pudo obtener la lista de regímenes.');
        }

        const partidas = await request.json();
        const partidaSelect = $('#alfatimbrado');
        partidaSelect.empty();
        partidaSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
        partidas.forEach(partida => {
            partidaSelect.append(`<option value="${partida.ltim_clavealfabetica}">${partida.ltim_clavealfabetica}</option>`);
        });

        // Agregar evento de cambio a la lista desplegable de partida
        partidaSelect.on('change', function () {
            const selectedClave = $(this).val();
            const filteredPartidas = partidas.filter(partida => partida.ltim_clavealfabetica === selectedClave);
            const descPartidaSelect = $('#timbrado');
            descPartidaSelect.empty();
        
            filteredPartidas.forEach(partida => {
                descPartidaSelect.append(`<option value="${partida.ltim_clavealfabetica}">${partida.ltim_descripcion}</option>`);
            });
        });

    } catch (error) {
        console.error(error);
    }
}

$(document).ready(function () {
    consultarPartidaS();
});





// async function consultarPartidaSContra() {
//     try {
//         const request = await fetch('api/persona/Obtenertimbrado', {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//         });

//         if (!request.ok) {
//             throw new Error('No se pudo obtener la lista de regímenes.');
//         }

//         const partidas = await request.json();
//         const partidaSelect = $('#alfatimbradoContra');
//         partidaSelect.empty();
//         partidaSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
//         partidas.forEach(partida => {
//             partidaSelect.append(`<option value="${partida.ltim_clavealfabetica}">${partida.ltim_clavealfabetica}</option>`);
//         });

//         // Agregar evento de cambio a la lista desplegable de partida
//         partidaSelect.on('change', function () {
//             const selectedClave = $(this).val();
//             const filteredPartidas = partidas.filter(partida => partida.ltim_clavealfabetica === selectedClave);
//             const descPartidaSelect = $('#timbradoContra');
//             descPartidaSelect.empty();
        
//             filteredPartidas.forEach(partida => {
//                 descPartidaSelect.append(`<option value="${partida.ltim_clavealfabetica}">${partida.ltim_descripcion}</option>`);
//             });
//         });

//     } catch (error) {
//         console.error(error);
//     }
// }

// $(document).ready(function () {
//     consultarPartidaSContra();
// });







async function consultargrupotipoimporte() {
	try {
		const request = await fetch('api/persona/Obtenertipoimporte', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const grupossecu = await request.json();
		const grupoSelect = $('#tipoimporte');
		grupoSelect.empty();
		grupoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		grupossecu.forEach(grupo => {
			grupoSelect.append(`<option value="${grupo.lcdm_clave}">${grupo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargrupotipoimporte();
});

async function consultargrupofactororigen() {
	try {
		const request = await fetch('api/persona/Obtenerfactororigen', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const grupossecu = await request.json();
		const grupoSelect = $('#origenfactor');
		grupoSelect.empty();
		grupoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		grupossecu.forEach(grupo => {
			grupoSelect.append(`<option value="${grupo.lcdm_clave}">${grupo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargrupofactororigen();
});



async function consultargrupoimporteorigen() {
	try {
		const request = await fetch('api/persona/Obtenerorigenimporte', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const grupossecu = await request.json();
		const grupoSelect = $('#origenimp');
		grupoSelect.empty();
		grupoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		grupossecu.forEach(grupo => {
			grupoSelect.append(`<option value="${grupo.lcdm_clave}">${grupo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargrupoimporteorigen();
});




function abrirModal(imagen) {
    var radioSigravable = document.getElementById('Sigravable');
    if (radioSigravable.checked) {
        $('#myModalNuevo').modal('show');
    }
}



function abrirModaldos(imagen) {
    var radioSigravable = document.getElementById('Sicotizable');
    if (radioSigravable.checked) {
        $('#myModalcotizable').modal('show');
    }
}

function abrirModaltres(imagen) {
    var radioSigravable = document.getElementById('Noperiodosdepago');
    if (radioSigravable.checked) {
        $('#modalInfo').modal('show');
    }
}











async function autocompletarPersona() {
    const request = await fetch('api/persona/Obtenerporperiodo', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const data = await request.json();
    let objetosDatos = [];

    for (let item of data) {
        let objeto = {
            pp_quincena: item.pp_quincena,
            pp_fechadesde: item.pp_fechadesde,
            pp_fechahasta: item.pp_fechahasta
        };
        objetosDatos.push(objeto);
    }

    return objetosDatos;
}


async function cargarDatosPersona() {
    const resultados = await autocompletarPersona();
    const modalBody = document.querySelector('#modalInfo .modal-body table tbody');
    modalBody.innerHTML = '';

    resultados.forEach((resultado, index) => {
        const fila = document.createElement('tr');
        const celdaQuincena = document.createElement('td');
        const celdaFechaDesde = document.createElement('td');
        const celdaFechaHasta = document.createElement('td');
        const celdaCheckbox = document.createElement('td');

        celdaQuincena.textContent = resultado.pp_quincena;
        celdaFechaDesde.textContent = resultado.pp_fechadesde;
        celdaFechaHasta.textContent = resultado.pp_fechahasta;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = JSON.stringify(resultado);
        checkbox.id = `checkbox-${index}`;


        celdaCheckbox.appendChild(checkbox);

        fila.appendChild(celdaQuincena);
        fila.appendChild(celdaFechaDesde);
        fila.appendChild(celdaFechaHasta);
        fila.appendChild(celdaCheckbox);

        modalBody.appendChild(fila);
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
            const posicionesSeleccionadas = Array.from(checkboxesSeleccionados).map(checkbox => checkbox.id.split('-')[1]);
            // console.log('Posiciones seleccionadas:', posicionesSeleccionadas);
        });
    });
}


cargarDatosPersona();













async function consultargrupodeterminamodalidad() {
	try {
		const request = await fetch('api/persona/Obtenermodalidaddedeterminaciondeimporte', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const grupossecu = await request.json();
		const grupoSelect = $('#gvmodalidad');
		grupoSelect.empty();
		grupoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		grupossecu.forEach(grupo => {
			grupoSelect.append(`<option value="${grupo.lcdm_clave}">${grupo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargrupodeterminamodalidad()
});





async function consultargrupodeterminamodalidadgravable() {
	try {
		const request = await fetch('api/persona/Obtenermodalidaddedeintegracionbasegravable', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const grupossecu = await request.json();
		const grupoSelect = $('#gvtipointegra');
		grupoSelect.empty();
		grupoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		grupossecu.forEach(grupo => {
			grupoSelect.append(`<option value="${grupo.lcdm_clave}">${grupo.lcdm_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultargrupodeterminamodalidadgravable()
});


async function obtenerGatoAsignado() {
	try {
		const request = await fetch('api/obetner/gastoasignado', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenerGatoAsignado();
});




async function obtenerimporteexcento() {
	try {
		const request = await fetch('api/obetner/importeexcento', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('#gvexcmod')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenerimporteexcento();
});





async function obtenergastoasignado() {
	try {
		const request = await fetch('api/obetner/gastoasignado', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('#subgasto')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenergastoasignado();
});



async function obtenerCalcularsobreBase() {
	try {
		const request = await fetch('api/obetner/CalcularsobreBase', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('#subtcalac')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenerCalcularsobreBase();
});

async function obtenerCalcularsobrebaseDos() {
	try {
		const request = await fetch('api/obetner/CalcularsobrebaseDos', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('#subtcalba')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenerCalcularsobrebaseDos();
});

async function obtenerGravarSubsidio() {
	try {
		const request = await fetch('api/obetner/GravarSubsidio', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('#subtgrvac')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenerGravarSubsidio();
});




async function obtenerGravarSubsidioDos() {
	try {
		const request = await fetch('api/obetner/GravarSubsidioDos', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('#subtgrvba')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenerGravarSubsidioDos();
});





async function obtenerModalidad() {
	try {
		const request = await fetch('api/obetner/Modalidad', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},

		});
		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}
		const gastoasignados = await request.json();
		const gastoasignadoSelect = $('#czmodalidad')
		gastoasignadoSelect.empty();
		gastoasignadoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		gastoasignados.forEach(gastoasignado => {
			gastoasignadoSelect.append(`<option value="${gastoasignado.lcdm_clave}">${gastoasignado.lcdm_descripcion}</option>`);
		})


	} catch (error) {

	}
}


$(document).ready(function () {
	obtenerModalidad();
});















document.getElementById("registrarConcepto").addEventListener("click", function () {


	const ejercicioConcepto = parseInt(document.getElementById('ejercicio').value);
	const vigenciaConcepto= document.getElementById('vigencia').value;
	const claveConcepto = document.getElementById('conceptos').value;
	const clasificadorConcepto= parseInt(document.getElementById('clasificacionRegistro').value);
	const tipoConcepto= parseInt(document.getElementById('tipo').value);
	const descripcionConcepto= document.getElementById('descripcion').value;
	const partidaConcepto= document.getElementById('partida').value;

	const CONGRUPOACUM= document.getElementById('grupoAcum').value;

	const idprovgrp= document.getElementById('idprovgrp').value;	

	const rubrocontable= document.getElementById('rubrocontable').value;	

	const alfatimbrado = document.getElementById('alfatimbrado').value;	
	
	





	const nuevaPersona = {

		con_ejercicio :ejercicioConcepto, //EJERCICIO

		con_vigencia :vigenciaConcepto,   //VIGENCIA

		con_concepto :claveConcepto,      //CONCEPTO

		con_clasificador :clasificadorConcepto, //CLASIFICADOR

		con_tipo :tipoConcepto,   //TIPO

		con_descripcion :descripcionConcepto, //DESCRIPCION

		 con_partida :partidaConcepto,  //PARTIDA

		 con_grupoacum :CONGRUPOACUM,  //Grupo primario de conceptos acumulados

		 con_idprovgrp :idprovgrp , //ID de proveedor para registro de cuenta por pagar en GRP

         con_rubrocontable :rubrocontable, //ID de cuenta de egresos o ingresos para registro de costo en GRP

		 con_equivtimbrado :alfatimbrado //ID de registro CONCEPTO REGULAR en archivo de timbrado

		
	};

	if (document.getElementById('SiTipocosto').checked) {  //Reportado en bloque que genera
		nuevaPersona.con_tipocosto = 1; 
	} else {
		nuevaPersona.con_tipocosto = 2; 
	}


	if (document.getElementById('SiAgrpzantecedente').checked) { //Diferenciado por antecedente
		nuevaPersona.con_agrpxantecedente = 1; 
	} else {
		nuevaPersona.con_agrpxantecedente = 2; 
	}

	if (document.getElementById('SiRfpconcepto').checked) { //Forzar presentación de concepto
		nuevaPersona.con_rfpconcepto = 1; 
	} else {
		nuevaPersona.con_rfpconcepto = 2; 
	}


	if (document.getElementById('SiTipocostocan').checked) { //Reportado en bloque que genera (CANCELADOS)
		nuevaPersona.con_tipocostocan = 1; 
	} else {
		nuevaPersona.con_tipocostocan = 2; 
	}



	if (document.getElementById('conceptogravado').checked) { //CheckboxConcepto gravado Concepto exento
		nuevaPersona.con_clasegrpsec = 1; 
	} else {
		nuevaPersona.con_clasegrpsec = 2; 
	}


	if (document.getElementById('CentraCostocentralizado').checked) { //Registro de costo centralizado o por Unidad Operativa en GRP
		nuevaPersona.con_costocentralizado = 1; 
	} else if (document.getElementById('UnidadCostocentralizado').checked) {
		nuevaPersona.con_costocentralizado = 2; 
	} else {
		
	}

	if (document.getElementById('Sitipogasto').checked) {//Costo asignado a partida de
		nuevaPersona.con_tipogasto = 1; 
	} else if (document.getElementById('Notipogasto').checked) {
		nuevaPersona.con_tipogasto = 2;
	} else {
		
	}
	


	if (document.getElementById('Sitipoaplica').checked) { //Aplicar a todos los puestos
		nuevaPersona.con_tipoaplica = 1; 
	} else if (document.getElementById('tipoaplica').checked) {
		nuevaPersona.con_tipoaplica = 2; 
	} else {
		
	}



	if (document.getElementById('Siafectado').checked) {//Afectado por base cotizable
		nuevaPersona.con_afxmbcotizable = 1; 
	} else if (document.getElementById('Noafectado').checked) {
		nuevaPersona.con_afxmbcotizable = 2; 
	} else {
		
	}



	if (document.getElementById('Siimprimir').checked) {// Impreso en comprobante
		nuevaPersona.con_imprimir = 1; 
	} else if (document.getElementById('Noimprimir').checked) {
		nuevaPersona.con_imprimir = 2; 
	} else {
		
	}



	if (document.getElementById('Siafxfaltas').checked) { //Afectado por inasistencia
		nuevaPersona.con_afxfaltas = 1; 
	} else if (document.getElementById('Noafxfaltas').checked) {
		nuevaPersona.con_afxfaltas= 2; 
	} else {
		
	}



	if (document.getElementById('SiLiqsueldos').checked) { //Afectado por liquidación (Sueldos)
		nuevaPersona.con_liqsueldos = 1; 
	} else if (document.getElementById('NoLiqsueldos').checked) {
		nuevaPersona.con_liqsueldos= 2; 
	} else {
		
	}



	if (document.getElementById('SiLiqotrasprest').checked) { //Afectado por liquidación (Prestaciones)
		nuevaPersona.con_liqotrasprest = 1; 
	} else if (document.getElementById('NoLiqotrasprest').checked) {
		nuevaPersona.con_liqotrasprest= 2; 
	} else {
		
	}


	if (document.getElementById('SiAfxfiniquito').checked) { //Concepto de grupo de finiquito
		nuevaPersona.con_afxfiniquito = 1; 
	} else if (document.getElementById('NoAfxfiniquito').checked) {
		nuevaPersona.con_afxfiniquito= 2; 
	} else {
		
	}


	if (document.getElementById('SiAfxanlretro').checked) { //Afectado por bloque de calculos retroactivos
		nuevaPersona.con_afxanlretro = 1;
	} else if (document.getElementById('NoAfxanlretro').checked) {
		nuevaPersona.con_afxanlretro= 2; 
	} else {

	}


	if (document.getElementById('SiAfxcalfrac').checked) { //Afectado en pago fraccionado (Cálculo X día)
		nuevaPersona.con_afxcalfrac = 1; 
	} else if (document.getElementById('NoAfxcalfrac').checked) {
		nuevaPersona.con_afxcalfrac= 2; 
	} else {
		
	}



	if (document.getElementById('SiAfxpension').checked) { //Afectado para pensión alimenticia básica
		nuevaPersona.con_afxpension = 1;
	} else if (document.getElementById('NoAfxpension').checked) {
		nuevaPersona.con_afxpension= 2;
	} else {
		
	}


	if (document.getElementById('SiAfxpenneto').checked) { //Afectado para pensión x neto líquido
		nuevaPersona.con_afxpenneto = 1; 
	} else if (document.getElementById('NoAfxpenneto').checked) {
		nuevaPersona.con_afxpenneto= 2; 
	} else {
		
	}


	if (document.getElementById('SiAfxpenadic').checked) { //Afectado para pensión x per. adicional
		nuevaPersona.con_afxpenadic = 1;
	} else if (document.getElementById('NoAfxpenadic').checked) {
		nuevaPersona.con_afxpenadic= 2; 
	} else {
		
	}


	if (document.getElementById('SiAfxsuspension').checked) { //Afectado por suspensión en sueldos
		nuevaPersona.con_afxsuspension = 1;
	} else if (document.getElementById('NoAfxsuspension').checked) {
		nuevaPersona.con_afxsuspension= 2; 
	} else {
		
	}




	if (document.getElementById('SiAfxsuspension').checked) { //Afectado por licencia médica sin sueldo
		nuevaPersona.con_afxlicss = 1;
	} else if (document.getElementById('NoAfxsuspension').checked) {
		nuevaPersona.con_afxlicss= 2; 
	} else {
		
	}



	if (document.getElementById('SiAfxlicms').checked) { //Afectado por licencia médica a medio sueldo
		nuevaPersona.con_afxlicms = 1; 
	} else if (document.getElementById('NoAfxlicms').checked) {
		nuevaPersona.con_afxlicms= 2;
	} else {
		
	}
	  

	if (document.getElementById('SiAfxreintegro').checked) { //Incluir en cálculo de reintegros
		nuevaPersona.con_afxreintegro= 1; 
	} else if (document.getElementById('NoAfxreintegro').checked) {
		nuevaPersona.con_afxreintegro= 2; 
	} else {
		
	}
	  



	if (document.getElementById('SiGrpindemni').checked) { //Concepto de grupo de Indemnizaciones
		nuevaPersona.con_grpindemni= 1;
	} else if (document.getElementById('Grpindemni').checked) {
		nuevaPersona.con_grpindemni= 2; 
	} else {
	
	}
	  

	console.log(nuevaPersona);
	swal({
		title: '¿Estás seguro de registrar esta persona?',
		text: 'Una vez registrado, no podrás deshacer esta acción',
		icon: 'warning',
		buttons: ['Cancelar', 'Aceptar'],
		dangerMode: true,
	})
		.then((willRegister) => {
			if (willRegister) {
				fetch('api/concepto/registrar', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(nuevaPersona),
				})
					.then(response => {
						if (response.status === 400) {
							return response.text();
						}
						return response.json();
					})
					.then(data => {
						console.log(data);
						if (data === "OK") {
							swal("¡Persona registrada exitosamente!", {
								icon: "success",
							});
						} else {
							swal({
								title: 'Error al registrar la persona',
								text: "Inténtelo de nuevo !!",
								icon: "error",
								button: "Aceptar",
							});
						}
					})
					.catch(error => {
						swal({
							title: 'Error al registrar la persona',
							text: "Inténtelo de nuevo !!",
							icon: "error",
							button: "Aceptar",
						});
					});
	
			} else {
	
			}
	
		});

	});
	


	