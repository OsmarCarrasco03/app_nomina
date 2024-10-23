async function autocompletarPuestos() {
    try {
        const request = await fetch('api/obetenrdatos/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const puestos = await request.json();

        let stringDatos = '';

        for (var i = 0; i < puestos.length; i++) {
            stringDatos += puestos[i][1] + ' - ' + puestos[i][2] + ';';
        }

        let arrayDatos = stringDatos.split(";");

        console.log('Datos recibidos de la API:', arrayDatos);

        return arrayDatos;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        return [];
    }
}

// Llama a la función para obtener los datos y procesarlos
autocompletarPuestos().then(arrayDatos => {
    const autoCompleteJS = new autoComplete({
        selector: "#autoComplete",
        placeHolder: "Búsqueda por código o puesto",
        data: {
            src: arrayDatos,
            cache: true,
        },
        events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteJS.input.value = selection;
                    autoCompleteJS.input.classList.remove("input-invalid");
                }
            }
        }
    });
});



async function buscarPuestos(datoBuscado) {
    try {
        const request = await fetch('api/obetenrdatos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const puestos = await request.json();

        console.log('Datos recibidos de la API:', puestos);

        for (var i = 0; i < puestos.length; i++) {
            if (puestos[i][1] == datoBuscado) {
				 agregarValorAlInput("idPuesto", puestos[i][0]);
                agregarValorAlInput("codigoPuesto", puestos[i][1]);
                agregarValorAlInput("descripcion", puestos[i][2]);
                agregarValorAlInput("usuarioCapturo", puestos[i][12]);//ususario capturo id
                agregarValorAlInput("usuarioCapturoid", puestos[i][5]);//usuario capturo nombre
                // agregarValorAlInput("fechaModificacion", puestos[i][6]);
                agregarValorAlInput("fechaInicio", puestos[i][3]);
                agregarValorAlInput("usuariomodifico", puestos[i][13]);
                agregarValorAlInput("usuariomodificoid", puestos[i][7]);
                agregarValorAlInput("fechaTermino", puestos[i][4]);
                agregarValorAlInput("tipoid", puestos[i][9]);
                agregarValorAlInput("situid", puestos[i][8]);

                let situacionValor;

                if (puestos[i][10] === 'CONFIANZA') {
                    situacionValor = 2;
                } else if (puestos[i][10] === 'BASE') {
                    situacionValor = 1;
                } else {
                    // Valor predeterminado si no es ni 'CONFIANZA' ni 'BASE'
                    situacionValor = 0;
                }

                // Para un campo select con el id "tipo"
                const tipoSelect = $('#tipo');
                tipoSelect.empty(); // Vaciar las opciones actuales
                tipoSelect.append(`<option value="${situacionValor}">${puestos[i][10]}</option>`); // Agregar la nueva opción

                let situValor;


                if (puestos[i][11] === 'INACTIVO') {
                    situValor = 2;
                } else if (puestos[i][11] === 'ACTIVO') {
                    situValor = 1;
                } else {
                    // Valor predeterminado si no es ni 'CONFIANZA' ni 'BASE'
                    situValor = 0;
                }


                // Para un campo select con el id "situacion"
              
               
                // Para el campo select con id "situ"
                const situSelect = $('#situ');
               
                situSelect.append(`<option value="${situValor}">${puestos[i][11]}</option>`); // Agregar la nueva opción

                break;
            }
        }
        if (i === puestos.length) {
            swal({
                title: "El puesto no existe",
                icon: 'error',
                button: 'Aceptar'
            });
        }
    } catch (error) {
        console.error('Error al buscar el dato:', error);
    }

    $('#habilitartip').prop('disabled', false);
	$('#habilitarsit').prop('disabled', false);
	$('#botonModificarUno').prop('disabled', false);


    $('#habilitarcodigoPuesto').prop('disabled', false);
	$('#habilitardescripcion').prop('disabled', false);
   
    $(document).ready(function () {
        var fechaHoy = new Date().toISOString().split('T')[0];
        $("#fechaModificacion").val(fechaHoy);
    
    });



}



/*autocompletarPuestos(datoBuscado)
    .then(resultado => {
        console.log('Dato encontrado:', resultado);
    })
    .catch(error => {
        console.error('Error:', error);
    });*/


function agregarValorAlInput(inputId, nuevoValor) {

    var inputElement = document.getElementById(inputId);

    if (inputElement) {



        inputElement.value = nuevoValor;


    } else {
        console.error("Elemento de entrada no encontrado con el ID: " + inputId);
    }
}

function mostrarDatos() {
    const valor = document.getElementById("autoComplete").value;
    const codigo = valor.split('-')[0].trim();
    buscarPuestos(codigo);
}


$(document).ready(function () {
    let tipoSelectLoaded = false;
    let tipoSeleccionado = ''; // Variable para almacenar el tipo seleccionado

    $('#botonModificarUno, #habilitartip').click(async function () {
        // Habilitar el botón modificarPuesto
        $('#modificarPuesto').prop('disabled', false);

        // Ejecutar la API para cargar los tipos de puesto
        if (!tipoSelectLoaded) {
            const request = await fetch('api/puesto/tipo', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const tipos = await request.json();
            const tipoSelect = $('#tipo');
            tipoSelect.append('<option value="" disabled>Selecciona una opción</option>');

            tipos.forEach(tipo => {
                tipoSelect.append(`<option value="${tipo.lpto_clave}">${tipo.lpto_descripcion}</option>`);
            });

            tipoSelect.on('change', function () {
                const selectedOption = $(this).find(':selected');
                tipoSeleccionado = selectedOption.val(); // Guardar el tipo seleccionado
                const tipoidInput = $('#tipoid');
                tipoidInput.val(tipoSeleccionado); // Mostrar la clave del tipo en el input
            });

            tipoSelectLoaded = true;
        }

        // Habilitar el select de tipos de puesto
        $('#tipo').prop('disabled', false);
    });

    // Ejemplo de cómo usar el tipo seleccionado en otro lugar
    $('#otroElemento').click(function () {
        // Hacer algo con el tipo seleccionado
        console.log('Tipo seleccionado:', tipoSeleccionado);
    });
});










$(document).ready(function () {
    let situSelectLoaded = false;
    let situSeleccionada = ''; // Variable para almacenar la situación seleccionada

    $('#botonModificarUno,#habilitarsit').click(function () {
        $('#modificarPuesto').prop('disabled', false); // Habilitar el botón modificarPuesto

        if (!situSelectLoaded) {
            cargarSituaciones(); // Llamar a la función para cargar las situaciones
            situSelectLoaded = true;
        }

        $('#situ').prop('disabled', false); // Habilitar el select de situaciones
    });

    // Función para cargar las situaciones
    async function cargarSituaciones() {
        try {
            const request = await fetch('api/situ/tipo', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
    
            const situaciones = await request.json();
            const situSelect = $('#situ');
            situSelect.append('<option value="" disabled>Selecciona una opción</option>');
    
            situaciones.forEach(situacion => {
                situSelect.append(`<option value="${situacion.lpto_clave}">${situacion.lpto_descripcion}</option>`);
            });
    
            situSelect.on('change', function () {
                const selectedOption = $(this).find(':selected');
                const situAnterior = situSeleccionada; // Guardar la situación anterior
                situSeleccionada = selectedOption.val(); // Guardar la situación seleccionada
                const situidInput = $('#situid');
                situidInput.val(situSeleccionada); // Mostrar la clave de la situación en el input
            
                // Verificar si la situación cambió de "INACTIVO" a "ACTIVO"
                if (situAnterior === '2' && situSeleccionada === '1') {
                    // Mostrar una alerta indicando que se debe contactar con el administrador
                    alert('¡Contactate con el administrador!');
                }
            
                // Verificar si la clave de la situación es "2" (INACTIVO)
                if (situSeleccionada === '2') {
                    // Establecer la fecha de hoy en el input con ID "fechaTermino"
                    const fechaTerminoInput = $('#fechaTermino');
                    const fechaHoy = new Date().toISOString().split('T')[0];
                    fechaTerminoInput.val(fechaHoy);
                }
            });
            
        } catch (error) {
            console.error('Error al cargar las situaciones:', error);
        }
    }
    

    // Ejemplo de cómo usar la situación seleccionada en otro lugar
    $('#otroElemento').click(function () {
        // Hacer algo con la situación seleccionada
        console.log('Situación seleccionada:', situSeleccionada);
    });
});


function guardarCambios() {
    const id = document.getElementById('idPuesto').value;
const codigo = document.getElementById('codigoPuesto').value;
const descripcion = document.getElementById('descripcion').value;
const fechainicio = document.getElementById('fechaInicio').value;
const usucapturo = document.getElementById('usuarioCapturoid').value; 
const fechamod = document.getElementById('fechaModificacion').value;
const fechatermino = document.getElementById('fechaTermino').value;
const usumodifico = sessionStorage.idUsuario;
const situacion  = document.getElementById('situid').value;
const tipo = document.getElementById('tipoid').value;




// Crear un objeto con los datos a actualizar	
const puestoActualizada = {
    ctgp_id :id,
    ctgp_codigo :codigo,
    ctgp_descripcion :descripcion,
    ctgp_fechainicio :fechainicio,
    ctgp_fechamod :fechamod,
    ctgp_situacion :situacion,  
    ctgp_tipo :tipo,
    ctgp_usucapturo :usucapturo,
   ctgp_fechatermino :fechatermino,
    ctgp_usumodifico :usumodifico
};

console.log(puestoActualizada);
// Mostrar una alerta de confirmación antes de la actualización
swal({
    title: '¿Estás seguro de actualizar los datos?',
    text: 'Una vez actualizados, no podrás deshacer esta acción',
    icon: 'warning',
    buttons: ['Cancelar', 'Aceptar'],
    dangerMode: true,
})
    .then((willUpdate) => {
        if (willUpdate) {
            console.log('Realizando solicitud de actualización...');
            fetch('api/puesto/actualizar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( puestoActualizada), // Reemplaza con tus datos actualizados
            })
                .then(response => response.json())
                .then(data => {
                    if (data.actualizado) {
                        // Actualización exitosa, puedes mostrar un mensaje de éxito o redirigir a otra página
                        swal({
                            title: 'Actualización Exitosa',
                            text: 'Los datos se han actualizado correctamente.',
                            icon: 'success',
                            button: 'Aceptar',
                        }).then(() => {
                            // Recargar la página después de mostrar la alerta de éxito
                            window.location.reload();
                        });
                    } else {
                        // La actualización falló, mostrar un mensaje de error
                        swal({
                            title: 'Error en la Actualización',
                            text: 'Error al actualizar los datos.',
                            icon: 'error',
                            button: 'Aceptar',
                        });
                    }
                })
                .catch(error => {
                    // Manejar errores de la solicitud HTTP
                    swal({
                        title: 'Actualización Exitosa',
                        text: 'Los datos se han actualizado correctamente.',
                        icon: 'success',
                        button: 'Aceptar',
                    })
                });
        } else {
            // Si el usuario hace clic en "Cancelar", no se realiza ninguna acción adicional
        }
    });

};




  

$(document).ready(function() {
    	let nombreFieldEnabled = false;
    	$('#habilitarcodigoPuesto').click(function() {
    		$('#modificarPuesto').prop('disabled', false);
    		if (!nombreFieldEnabled) {
    			$('#codigoPuesto').prop('disabled', false);
    			nombreFieldEnabled = true;
    		}
    	});
    });


    $(document).ready(function() {
    	let nombreFieldEnabled = false;
    	$('#habilitardescripcion').click(function() {
    		$('#modificarPuesto').prop('disabled', false);
    		if (!nombreFieldEnabled) {
    			$('#descripcion').prop('disabled', false);
    			nombreFieldEnabled = true;
    		}
    	});
    });


    $(document).ready(function() {
    	let nombreFieldEnabled = false;
    	$('#habilitardescripcion').click(function() {
    		$('#modificarPuesto').prop('disabled', false);
    		if (!nombreFieldEnabled) {
    			$('#descripcion').prop('disabled', false);
    			nombreFieldEnabled = true;
    		}
    	});
    });


    $(document).ready(function() {
        let camposHabilitados = false;
        
        $('#botonModificarUno').click(function() {
            if (!camposHabilitados) {
                // Habilitar los campos
                $('#descripcion').prop('disabled', false);
                $('#codigoPuesto').prop('disabled', false);
                $('#tipo').prop('disabled', false);
                $('#situ').prop('disabled', false);
                $('#habilitartip').prop('disabled', false);
                
                // Cambiar el estado de los campos habilitados
                camposHabilitados = true;
            }
        });
    });
    
    
document.getElementById('limpiarPuesto').addEventListener('click', function() {
    window.location.reload(); // Esta línea recarga la página
});
    
    
   