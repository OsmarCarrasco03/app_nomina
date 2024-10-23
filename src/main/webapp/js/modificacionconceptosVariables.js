
$(function () {
    MostrarPagina(26);
    if (sessionStorage.permisos == 1) {
        $("#DatosControl-tab").prop("hidden", false);

    }
    iniciarAutoComplete();
    EjercicioActual();
    PeriodoActual();
    opcionesConceptoAntes();
});
// Inicio valores que se van actualizar
let cptoAntec;
let factor;
let importe;
let fechaOcuIn;
let fechaOcuFin;
let datos = {}
let idRegistro;
// Fin

let valortipo;
let factorV;
let Contempo;
let anioFinal;
let idPersona = null;
let situa = null;
let opciones = [];

async function autocompletarPersona() {
    const request = await fetch('api/empleado/conSituacion', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const data = await request.json();

    

    const combinedValues = data.map(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}`);

    const idMap = {};
    data.forEach(item => {
        const combinedValue = `${item[1]} - ${item[3]} ${item[4]} ${item[2]}`;
        idMap[combinedValue] = item[0];
        situacion[combinedValue] = item[5];

    });

    return { combinedValues, idMap, data, situacion };
}
// FIN funcion para llamar a la API persona

// INICIO funcion para busacar una persona por su CURP o Nombre en el inpBuscar
async function iniciarAutoComplete() {
    const { combinedValues, idMap, data, situacion } = await autocompletarPersona();
    const autoCompleteInput = document.getElementById('inpBuscar');

    const autoCompleteJS = new autoComplete({
        selector: "#inpBuscar",
        placeHolder: "Buscar por CURP o Nombre(s)...",
        data: {
            src: combinedValues,
            cache: true,
        },
        resultItem: {
            highlight: true
        },
        events: {
            input: {
                query: (query, autoCompleteJS) => {
                    if (query.length >= 3) {
                        autoCompleteJS.start();
                    } else {
                        autoCompleteJS.stop();
                    }
                },
                selection: (event) => {
                    // opciones = [];
                    const selection = event.detail.selection.value;
                    autoCompleteInput.value = selection;
                    const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
                    curp = selectedPerson[1];
                    nombre = `${selectedPerson[2]}`;
                    apellido_pat = `${selectedPerson[3]}`;
                    apellido_mat = `${selectedPerson[4]}`;
                    numEmpleado = selectedPerson[5];
                    idPersona = idMap[selection];
                    // console.log(idPersona);
                    // Llenado de la tabla
                    llenarTabla();
                    autoCompleteJS.close();
                    situa = situacion[selection];

                    let nomComp = apellido_pat + " " + apellido_mat + " " + nombre;
                    document.getElementById("Nombre").value = nomComp;
                    document.getElementById("Curp").value = curp;
                    document.getElementById("Curp").setAttribute("atributoId", idPersona);
                    if (situa === 1) {
                        document.getElementById("situacion").value = "ACTIVO"
                    } else if (situa === 2) {
                        document.getElementById("situacion").value = "INACTIVO"
                    }

                    document.getElementById("inpBuscar").value = "";

                }
            }
        }
    });
}

async function EjercicioActual() {
    $("#AnioInicio").empty();
    $("#AnioFinal").empty();

    const request = await fetch("api/consultar/ejercicio", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    $("#AnioFinal").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );
    $("#AnioInicio").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    const ejeractual = await request.json();


    document.getElementById("AnioProceso").value = ejeractual[0].ejer_ejercicio;

    anioFinal = ejeractual[0].ejer_ejercicio;

    let anioIni = ejeractual[0].ejer_ejercicio - 1;

    for (let i = 0; i < 4; i++) {

        $("#AnioInicio").append("<option value =" + (anioIni + i) + ">" + (anioIni + i) + "</option>");
    }

    for (let i = 1; i < 25; i++) {
        $("#periodoInicial").append("<option value =" + i + ">" + (i) + "</option>");


    }

}

async function PeriodoActual() {
    const request = await fetch("api/consultar/periodo", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const ejeractual = await request.json();
    document.getElementById("PeriodoProceso").value = ejeractual[0].pp_quincena;
}

// Llenar Tabla

async function llenarTabla() {
    const request = await fetch("api/consultarConceptoVar/" + idPersona, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const consultaPer = await request.json();

    const tablaDiv = document.querySelector(".tablaDiv");

    // Limpia el contenido anterior del tablaDiv
    tablaDiv.innerHTML = "";
    tablaDiv.innerHTML = `
    <table class="table table-bordered" id="tablaDatos" style="font-size: 15px;">
        <thead class="text-center align-middle table-dark">
            <tr>
                <th rowspan="2">#</th>
                <th rowspan="2">Concepto</th>
                <th rowspan="2">Descripcion</th>
                <th rowspan="2">Tipo y Descripcion</th>
                <th rowspan="2">Concepto Antecedente</th>
                <th rowspan="2">Pago Antecedente</th>
                <th rowspan="2">Tipo Factor</th>
                <th rowspan="2">Factor</th>
                <th rowspan="2">Importe</th>
                <th rowspan="2">Nómina</th>
                <th rowspan="2">Temporalidad</th>
                <th colspan="2">Inical</th>
                <th colspan="2">Final</th>
                <th colspan="2">Fecha ocurrencia</th>
                <th rowspan="2">Forzar Importe</th>
                <th rowspan="2">Importe Forzado</th>
                <th rowspan="2">Acción</th>
            </tr>
            <tr>
            <th>Año</th>
            <th>Periodo</th>
            <th>Año</th>
            <th>Periodo</th>
            <th>Inicial</th>
            <th>Final</th>
            </tr>
        </thead>
        <tbody class="text-center align-middle">
        </tbody>
    </table>
    `;

    tablaDiv.style.maxHeight = '350px';
    tablaDiv.style.overflowY = 'auto';
    tablaDiv.style.display = 'block';

    const header = tablaDiv.querySelector('thead');
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '1';

    // Agrega opciones al tablaDiv
    const table = tablaDiv.querySelector("table tbody");
    table.innerHTML = "";
    let contador = 0;

    for (var i = 0; i < consultaPer.length; i++) {

        contador++;
        const row = document.createElement("tr");
row.setAttribute('idRegistro', consultaPer[i][0]);
        //Numero
        const cell1 = document.createElement("td");
        cell1.innerHTML = `<label>${contador}</label>`;
        //cell1.setAttribute('idRegistro', consultaPer[i][0])

        //Concepto
        const cell2 = document.createElement("td");
        cell2.innerHTML = `<label>${consultaPer[i][6]}</label>`;
        // <select class="form-select" id="Concepto" aria-label="Default select ">

        //                                         </select>

        //Descripcion
        const cell3 = document.createElement("td");
        cell3.innerHTML = `<label>${consultaPer[i][7]}</label>`;

        //Tipo y Descripcion
        const cell4 = document.createElement("td");
        cell4.innerHTML = `<label>${consultaPer[i][4]} - ${consultaPer[i][5]}</label>`;

        // Ctop Antec
        const cell5 = document.createElement("td");
        cell5.innerHTML = `<label>${consultaPer[i][8]}</label>`;

        // const selectElement = document.createElement("select");
        // selectElement.id = `cpto_ant${i}`;
        // selectElement.classList.add("form-select");
        // selectElement.setAttribute("disabled", "disabled");

        // if (selectElement.options.length === 0) {
        //     const option = document.createElement("option");
        //     option.value = consultaPer[i][8];
        //     option.textContent = consultaPer[i][8];
        //    // opciones.push(consultaPer[i][8]);
        //     selectElement.appendChild(option);
        // }



       // cell5.appendChild(selectElement);
        // cell5.appendChild(button);

        //pago antecedente
        const cell6 = document.createElement("td");
        if (consultaPer[i][9] != null) {
            cell6.innerHTML = `<label>${consultaPer[i][9]}</label> `;
        }

        //tipo factor
        const cell7 = document.createElement("td");
        if (consultaPer[i][11] != null) {
            cell7.innerHTML = `<label>${consultaPer[i][11]}</label>`;
        }

        //factor
        const cell8 = document.createElement("td");
        if (consultaPer[i][11] == 'UNIDADES' || consultaPer[i][11] == 'PORCENTAJE') {
            if (consultaPer[i][12] != null) {
                cell8.innerHTML = `<label>${consultaPer[i][12]}</label>`;

               
            }
        }

        //Importe
        const cell9 = document.createElement("td");
        if (consultaPer[i][11] == 'IMPORTE') {
            if (consultaPer[i][13] != null) {
                cell9.innerHTML = `<label>${consultaPer[i][13]}</label><br>`;
               
                
            }
        }



        //Nomina
        const cell10 = document.createElement("td");
        if (consultaPer[i][16] != null) {
            cell10.innerHTML = `<label>${consultaPer[i][16]}</label>`;
        }



        //Temporalidad
        const cell11 = document.createElement("td");
        if (consultaPer[i][2] != null && consultaPer[i][3]) {
            cell11.innerHTML = `<label>${consultaPer[i][2]} - ${consultaPer[i][3]}</label>`;
        }


        //Año Inicial
        const cell12 = document.createElement("td");
        if (consultaPer[i][17] != null) {
            cell12.innerHTML = `<label>${consultaPer[i][17]}</label>`;
        }

        //Año final
        const cell14 = document.createElement("td");
        if (consultaPer[i][19] != null) {
            cell14.innerHTML = `<label>${consultaPer[i][19]}</label>`;
        }

        //Periodo Inicio
        const cell13 = document.createElement("td");
        if (consultaPer[i][18] != null) {
            cell13.innerHTML = `<label>${consultaPer[i][18]}</label>`;
        }

        //Periodo Final
        const cell15 = document.createElement("td");
        if (consultaPer[i][20] != null) {
            cell15.innerHTML = `<label>${consultaPer[i][20]}</label>`;
        }

        //Fecha Ocurrencia Inicial
        const cell16 = document.createElement("td");
        if (consultaPer[i][3] == 'INDETERMINADA' || consultaPer[i][3] == 'DETERMINADA') {
            if (consultaPer[i][21] != null) {
                cell16.innerHTML = `<label>${consultaPer[i][21]}</label>`;
                
            }
        }





        //Fecha Ocurrencia Final
        const cell17 = document.createElement("td");
        if (consultaPer[i][3] == 'DETERMINADA') {
            if (consultaPer[i][22] != null) {
                cell17.innerHTML = `<label>${consultaPer[i][22]}</label>`;
               
            }
        }

        //forzar importe
        const cell18 = document.createElement("td");
        cell18.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][32]}</label></div>`;

        //importe forzado
        const cell19 = document.createElement("td");
        // let importeFor = consultaPer[i][33];
        // importeFor.toFixed(3);
        cell19.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][33].toFixed(3)}</label></div>`;


        //Boton GUARDAR
        const cell20 = document.createElement("td");
        // INICIO BOTON 
        const botoneditar = document.createElement("button");
        botoneditar.id = `editar${i}`;
        botoneditar.classList.add("btn", "btn-success");
        botoneditar.type = "button";
        botoneditar.textContent = "Editar";
        botoneditar.setAttribute("identificador", consultaPer[i][0])
        botoneditar.addEventListener("click", function () {
            editaValor(botoneditar.getAttribute("identificador"));
        });


        cell20.appendChild(botoneditar);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);
        row.appendChild(cell9);
        row.appendChild(cell10);
        row.appendChild(cell11);
        row.appendChild(cell12);
        row.appendChild(cell13);
        row.appendChild(cell14);
        row.appendChild(cell15);
        row.appendChild(cell16);
        row.appendChild(cell17);
        row.appendChild(cell18);
        row.appendChild(cell19);
        row.appendChild(cell20);

        table.appendChild(row);

    }

}

function guardarDatos() {
    //  console.log(datos)
    // console.log(idRegistro)

    let url = "api/actualizaDatosConVar/" + idRegistro;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
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
                    title: "Se guardaron los datos correctamente",
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



// API SELECT CTOP ANTEC
async function opcionesConceptoAnte(selector) {

    $(`#${selector}`).empty(); // Utilizar el selector pasado como parámetro para vaciar el elemento

    const request = await fetch("api/cptosdenomina/conceptosAnt", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const conceptoAnt = await request.json();

    $(`#${selector}`).append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    for (let detalle of conceptoAnt) {
        // Utilizar el selector pasado como parámetro en lugar del ID fijo
        $(`#${selector}`).append("<option value = " + detalle[0] + ">" + detalle[0] + "</option>");

    }

}


function validaPagoAnte(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/[^\w-]/g, '');

    clearTimeout(input.tooltipTimeout);
    input.tooltipTimeout = setTimeout(function () {
        $(input).tooltip('dispose');
    }, 1500);

    // Ocultar tooltips existentes
    $(input).tooltip('dispose');

    if (valor !== soloNumeros) {
        $(input).tooltip({
            title: 'No se aceptan caracteres especiales',
            placement: 'top',
            trigger: 'manual',
            delay: { show: 500, hide: 200 },
            container: 'body',
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
        }).tooltip('show');
    }

    if (valor.length >= 19) {
        soloNumeros = soloNumeros.substring(0, 18);

        if (valor.length > 15) {
            $(input).tooltip({
                title: 'Son máximo 18 números',
                placement: 'top',
                trigger: 'manual',
                delay: { show: 500, hide: 200 },
                container: 'body',
                template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger text-white"></div></div>'
            }).tooltip('show');
        }
    }
    input.value = soloNumeros;
}

// Función para actualizar la tabla
function actualizarTabla() {
    llenarTabla(); // Vuelve a llenar la tabla con los datos actualizados
}


var container = document.getElementById('tabla');

// Verificar si el contenido excede el ancho del contenedor
if (container.scrollWidth > container.clientWidth) {
    container.style.overflowX = 'scroll'; // Activar el scroll horizontal
}

function editaValor(id) {
    console.log(id);

    //crearModalConCampos();
    crearYMostrarModal(id);
}





function crearYMostrarModal(btnId) {
    // Obtener el ID del modal basado en el ID del botón
    var targetId = 'Modal_' + btnId;

    // Verificar si el modal ya existe para evitar duplicados
    var existingModal = document.getElementById(targetId);
    if (existingModal) {
        var modal = new bootstrap.Modal(existingModal);
        modal.show();
        return; // Salir de la función si el modal ya existe
    }

    // Crear el contenedor del modal
    var modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'fade');
    modalContainer.id = targetId;
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.setAttribute('aria-labelledby', 'ModalLabel');
    modalContainer.setAttribute('aria-hidden', 'true');

    // Crear el diálogo del modal
    var modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalContainer.appendChild(modalDialog);

    // Contenido del modal
    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalDialog.appendChild(modalContent);

    // Encabezado del modal
    var modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalContent.appendChild(modalHeader);

    var modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Puedes modificar los siguientes valores';
    modalHeader.appendChild(modalTitle);

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    modalHeader.appendChild(closeButton);

    // Cuerpo del modal
    var modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalContent.appendChild(modalBody);

    var form = document.createElement('form');
    modalBody.appendChild(form);

    // Campo Select
    var selectDiv = document.createElement('div');
    selectDiv.classList.add('mb-3');
    form.appendChild(selectDiv);

    var selectLabel = document.createElement('label');
    selectLabel.classList.add('col-form-label');
    selectLabel.setAttribute('for', 'select-field');
    selectLabel.textContent = 'Concepto Antecedente:';
    selectDiv.appendChild(selectLabel);

    var selectInput = document.createElement('select');
    selectInput.classList.add('form-select');
    selectInput.id = 'conceptoAntecenteModal';
    selectDiv.appendChild(selectInput);
    selectInput.innerHTML = '';
    var optionExtra = document.createElement('option');
    optionExtra.value = ''; // Valor de la opción extra (si es necesario)
    optionExtra.textContent = 'Selecciona una opción'; // Texto de la opción extra
    selectInput.appendChild(optionExtra);


    for (let index = 0; index < opciones.length; index++) {
        var option = document.createElement('option');
        option.value = opciones[index][0];
        option.textContent = opciones[index][0];
        selectInput.appendChild(option);
    }

    // Campos de Input Text y Date

    //primer input
    var inputText1Div = document.createElement('div');
    inputText1Div.classList.add('mb-3');
    form.appendChild(inputText1Div);

    var inputText1Label = document.createElement('label');
    inputText1Label.classList.add('col-form-label');
    inputText1Label.setAttribute('for', 'input-text1');
    inputText1Label.textContent = 'Text Input 1:';
    inputText1Div.appendChild(inputText1Label);

    var inputText1 = document.createElement('input');
    inputText1.type = 'text';
    inputText1.classList.add('form-control');
    inputText1.id = 'input-text1';
    inputText1.placeholder = 'Enter text';
    inputText1Div.appendChild(inputText1);

    //segundo input
    var inputText2Div = document.createElement('div');
    inputText2Div.classList.add('mb-3');
    form.appendChild(inputText2Div);

    var inputText2Label = document.createElement('label');
    inputText2Label.classList.add('col-form-label');
    inputText2Label.setAttribute('for', 'input-text2');
    inputText2Label.textContent = 'Text Input 2:';
    inputText2Div.appendChild(inputText2Label);

    var inputText2 = document.createElement('input');
    inputText2.type = 'text';
    inputText2.classList.add('form-control');
    inputText2.id = 'input-text2';
    inputText2.placeholder = 'Enter text';
    inputText2Div.appendChild(inputText2);

    // Campos de Input Date 
    //primer input Date
    var inputDate1Div = document.createElement('div');
    inputDate1Div.classList.add('mb-3');
    form.appendChild(inputDate1Div);

    var inputDate1Label = document.createElement('label');
    inputDate1Label.classList.add('col-form-label');
    inputDate1Label.setAttribute('for', 'input-date1');
    inputDate1Label.textContent = 'Fecha Ocurrencia Inicial:';
    inputDate1Div.appendChild(inputDate1Label);

    var inputDate1 = document.createElement('input');
    inputDate1.type = 'date';
    inputDate1.classList.add('form-control');
    inputDate1.id = 'input-date1';
    inputDate1Div.appendChild(inputDate1);

    //segundo input date
    var inputDateOcuFinal = document.createElement('div');
    inputDateOcuFinal.classList.add('mb-3');
    form.appendChild(inputDateOcuFinal);

    var inputFechOcuFinalLabel = document.createElement('label');
    inputFechOcuFinalLabel.classList.add('col-form-label');
    inputFechOcuFinalLabel.setAttribute('for', 'input-date2');
    inputFechOcuFinalLabel.textContent = 'Fecha Ocurrencia Final:';
    inputDateOcuFinal.appendChild(inputFechOcuFinalLabel);

    var inputFechOcuFin = document.createElement('input');
    inputFechOcuFin.type = 'date';
    inputFechOcuFin.classList.add('form-control');
    inputFechOcuFin.id = 'input-date2';
    inputDateOcuFinal.appendChild(inputFechOcuFin);

    // Pie del modal
    var modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    modalContent.appendChild(modalFooter);

    var closeButtonModal = document.createElement('button');
    closeButtonModal.type = 'button';
    closeButtonModal.classList.add('btn', 'btn-danger');
    closeButtonModal.setAttribute('data-bs-dismiss', 'modal');
    closeButtonModal.textContent = 'Cerrar';
    modalFooter.appendChild(closeButtonModal);

    var sendButton = document.createElement('button');
    sendButton.type = 'button';
    sendButton.classList.add('btn', 'btn-success');
    sendButton.textContent = 'Guardar';
    modalFooter.appendChild(sendButton);

    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modalContainer);

    // Mostrar el modal
    var modal = new bootstrap.Modal(modalContainer);
    modal.show();
}


async function opcionesConceptoAntes() {



    const request = await fetch("api/cptosdenomina/conceptosAnt", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const datos = await request.json();


opciones = datos;
    

}