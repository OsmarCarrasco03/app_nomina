
$(function () {
    MostrarPagina(26);
    if (sessionStorage.permisos == 1) {
        $("#DatosControl-tab").prop("hidden", false);

    }
    // opcionesTipo();
    // opcionesFactor();
    // opcionesNomina();
    // opcionesTemporalidad();
    iniciarAutoComplete();
    EjercicioActual();
    PeriodoActual();
});

let valortipo;
let factorV;
let Contempo;
let anioFinal;
let idPersona = null;
let situa = null;

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
    //console.log(idMap);

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
                    const selection = event.detail.selection.value;
                    autoCompleteInput.value = selection;
                    const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
                    curp = selectedPerson[1];
                    nombre = `${selectedPerson[2]}`;
                    apellido_pat = `${selectedPerson[3]}`;
                    apellido_mat = `${selectedPerson[4]}`;
                    numEmpleado = selectedPerson[5];
                    idPersona = idMap[selection];
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


    // console.log('soy consultaPer', consultaPer);

    const tablaDiv = document.querySelector(".tablaDiv");

    // Limpia el contenido anterior del tablaDiv
    tablaDiv.innerHTML = "";
    tablaDiv.innerHTML = `
    <table class="table table-bordered" id="tablaDatos" style="font-size: 15px;">
        <thead class="text-center align-middle table-dark">
            <tr>
                <th rowspan="2">#</th>
                <th rowspan="2">Concepto</th>
                <th rowspan="2">Descripción</th>
                <th rowspan="2">Tipo y Descripción</th>
                <th rowspan="2">Concepto Antecedente</th>
                <th rowspan="2">Pago Antecedente</th>
                <th rowspan="2">Tipo Factor</th>
                <th rowspan="2">Factor</th>
                <th rowspan="2">Importe</th>
                <th rowspan="2">Nómina</th>
                <th rowspan="2">Temporalidad</th>
                <th colspan="2">Inical</th>
                <th colspan="2">Final</th>
                <th colspan="2">Fecha Ocurrencia</th>
                <th rowspan="2">Forzar Importe</th>
                <th rowspan="2">Importe Forzado</th>
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
   
    const table = tablaDiv.querySelector("table tbody");
    table.innerHTML = "";
    let contador = 0;

    for (var i = 0; i < consultaPer.length; i++) {

        contador++;
        const row = document.createElement("tr");

        //Numero
        const cell1 = document.createElement("td");
        cell1.innerHTML = `<div style="text-align:center; font-size:15px"><label>${contador}</label></div>`;

        //Concepto
        const cell2 = document.createElement("td");
        cell2.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][6]}</label></div>`;


        //Descripcion
        const cell3 = document.createElement("td");
        cell3.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][7]}</label></div>`;

        //Tipo y Descripcion
        const cell4 = document.createElement("td");
        cell4.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][4]} - ${consultaPer[i][5]}</label></div>`;

        // Ctop Antec
        const cell5 = document.createElement("td");
        if (consultaPer[i][8] == null) {

            cell5.innerHTML = `<div style="text-align:center; font-size:15px"><label></label></div>`;
        }
        else {

            cell5.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][8]}</label></div>`;
        }

        //Pago Antecedente
        const cell6 = document.createElement("td");
        if (consultaPer[i][9] == null) {

            cell6.innerHTML = `<div style="text-align:center; font-size:15px"><label></label></div>`;
        }
        else {

            cell6.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][9]}</label></div>`;
        }

        //Tipo Factor
        const cell7 = document.createElement("td");
        cell7.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][11]}</label></div>`;

        //Factor
        const cell8 = document.createElement("td");
        if (consultaPer[i][11] == 'UNIDADES' || consultaPer[i][11] == 'PORCENTAJE') {
            cell8.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][12]}</label></div>`;
        } else {
            cell8.innerHTML = `<label></label>`;
        }

        //Importe
        const cell9 = document.createElement("td");
        if (consultaPer[i][11] == 'IMPORTE') {
            cell9.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][13]}</label></div>`;
        } else {
            cell9.innerHTML = `<label></label>`;
        }

        //Nomina
        const cell10 = document.createElement("td");
        cell10.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][16]}</label></div>`;

        //Temporalidad
        const cell11 = document.createElement("td");
        cell11.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][2]} - ${consultaPer[i][3]}</label></div>`;

        //Año Inicio
        const cell12 = document.createElement("td");
        cell12.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][17]}</label></div>`;

        //Año Final
        const cell14 = document.createElement("td");
        if (consultaPer[i][19] == null || 0) {

            cell14.innerHTML = `<label></label>`;
        }
        else {

            cell14.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][19]}</label></div>`;
        }

        //Periodo Inicio
        const cell13 = document.createElement("td");
        if (consultaPer[i][18] == null) {

            cell13.innerHTML = `<div style="text-align:center; font-size:15px"><label></label></div>`;
        }
        else {

            cell13.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][18]}</label></div>`;
        }

        //Periodo Final
        const cell15 = document.createElement("td");
        if (consultaPer[i][20] == null) {

            cell15.innerHTML = `<label></label>`;
        }
        else {

            cell15.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][20]}</label></div>`;
        }

        //FechaOc Inicial
        const cell16 = document.createElement("td");
        cell16.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][21]}</label></div>`;

        //FechaOc Final
        const cell17 = document.createElement("td");
        if (consultaPer[i][22] == null) {

            cell17.innerHTML = `<label></label>`;
        }
        else {

            cell17.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][22]}</label></div>`;
        }
        //forzar importe
        const cell18 = document.createElement("td");
        cell18.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][32]}</label></div>`;

        //importe forzado
        const cell19 = document.createElement("td");
        // let importeFor = consultaPer[i][33];
        // importeFor.toFixed(3);
        cell19.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consultaPer[i][33].toFixed(3)}</label></div>`;

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

        table.appendChild(row);

    }
}