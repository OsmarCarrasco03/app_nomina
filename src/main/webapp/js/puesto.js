async function autocompletarPuestos() {

    const request = await fetch('api/puestos/detallespuestos/', {
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

    return arrayDatos;
}

let arrayDatos = autocompletarPuestos();

const autoCompleteJS = new autoComplete({
    selector: "#autoComplete",
    placeHolder: "Busqueda por código o puesto",
    data: {
        src: arrayDatos,
        cache: true,
    },


    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                autoCompleteJS.input.value = selection;

                //autoCompleteJS.input.disabled = true; // Servicio
                autoCompleteJS.input.classList.remove("input-invalid"); // Servicio
            }
        }
    }

});

async function buscarPuestos(datoBuscado) {
    try {
        const request = await fetch('api/puestos/detallespuestos/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const puestos = await request.json();

        for (var i = 0; i < puestos.length; i++) {
            if (puestos[i][1] == datoBuscado) {
                agregarValorAlInput("codigoPuesto", puestos[i][1]);
                agregarValorAlInput("descripcion", puestos[i][2]);
                if (puestos[i][5] == 1) {
                    agregarValorAlInput("situacion", "ACTIVO");
                } else {
                    agregarValorAlInput("situacion", "INACTIVO");
                }
                agregarValorAlInput("usuarioCapturo", puestos[i][6]);
                agregarValorAlInput("fechaModificacion", puestos[i][4]);
                agregarValorAlInput("fechaInicio", puestos[i][3]);
                agregarValorAlInput("usuariomodifico", puestos[i][7]);
                
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
        return Promise.reject('Error al buscar el dato');
    }
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

        inputElement.removeAttribute("disabled");

        inputElement.value = nuevoValor;

        inputElement.setAttribute("disabled", "disabled");
    } else {
        console.error("Elemento de entrada no encontrado con el ID: " + inputId);
    }
}

function mostrarDatos() {
    const valor = document.getElementById("autoComplete").value;
    const codigo = valor.split('-')[0].trim();
    buscarPuestos(codigo);
}