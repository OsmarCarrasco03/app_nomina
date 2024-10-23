$(function () {
    MostrarPagina(26);
    if (sessionStorage.permisos == 1) {
        $("#DatosControl-tab").prop("hidden", false);

    }

    iniciarAutoComplete();
    EjercicioActual();
    PeriodoActual();
});

let idPuesto = null;
let idPersona = null;
let percepcionesVAr = null;
let ultimaFilaPerFijas = null;

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
                    idPuesto = null;
                    idPersona = null;
                    percepcionesVAr = null;
                    ultimaFilaPerFijas = null;
                    deselectCheckbox();
                    limpiarCampos();
                    EjercicioActual();
                    PeriodoActual();

                    const selection = event.detail.selection.value;
                    autoCompleteInput.value = selection;
                    const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
                    curp = selectedPerson[1];
                    nombre = `${selectedPerson[2]}`;
                    apellido_pat = `${selectedPerson[3]}`;
                    apellido_mat = `${selectedPerson[4]}`;
                    numEmpleado = selectedPerson[5];
                    idPersona = idMap[selection];
                    autoCompleteJS.close();
                    situa = situacion[selection];

                    let nomComp = apellido_pat + " " + apellido_mat + " " + nombre;
                    document.getElementById("nombre").value = nomComp;
                    document.getElementById("curp").value = curp;
                    document.getElementById("curp").setAttribute("atributoId", idPersona);
                    if (situa === 1) {

                        document.getElementById("situacion").value = "ACTIVO"

                    } else if (situa === 2) {

                        document.getElementById("situacion").value = "INACTIVO"

                    }
                    document.getElementById("inpBuscar").value = "";
                    deselectCheckbox();
                    $("#tablaPercepciones tr:gt(1)").empty();
                    $("#tablaDeduccionesPrincipal tr:gt(1)").empty();
                    DatosGenerales(idPersona);


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


    const ejeractual = await request.json();

    document.getElementById("AnioProceso").value = ejeractual[0].ejer_ejercicio;

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
    document.getElementById("PerInicio").value = ejeractual[0].pp_fechadesde;
    document.getElementById("PerFin").value = ejeractual[0].pp_fechahasta;


}

async function DatosGenerales(idPersona) {

    const request = await fetch("api/datosgenerales/" + idPersona, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const datospersona = await request.json();

    document.getElementById("rfc").value = datospersona[0][8];
    document.getElementById("homoclave").value = datospersona[0][9];
    document.getElementById("segSocial").value = datospersona[0][10];
    document.getElementById("noEmpleado").value = datospersona[0][11];
    document.getElementById("genero").value = datospersona[0][13];
    document.getElementById("nacionalidad").value = datospersona[0][15];
    document.getElementById("edocivil").value = datospersona[0][17];
    document.getElementById("idRusp").value = datospersona[0][18];
    document.getElementById("estado").value = datospersona[0][20];
    document.getElementById("DeloMuni").value = datospersona[0][22];
    document.getElementById("ingresoSP").value = datospersona[0][23];
    document.getElementById("ingresoOrg").value = datospersona[0][24];
    document.getElementById("fechaBaja").value = datospersona[0][25];
    document.getElementById("contratacion").value = datospersona[0][6];
    document.getElementById("codFiscal").value = datospersona[0][26];
    llenarPuesto()
}


async function llenarPuesto() {
    const request = await fetch("api/snplazapersona/idpersona/" + idPersona, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const consultaPer = await request.json();
    //console.log(consultaPer.data[0]);

    document.getElementById("codigo").value = consultaPer.data[0][50];
    document.getElementById("nivel").value = consultaPer.data[0][57];
    document.getElementById("tipo").value = consultaPer.data[0][53];
    document.getElementById("categoria").value = consultaPer.data[0][59];
    document.getElementById("plaza").value = consultaPer.data[0][2];
    document.getElementById("descripcion").value = consultaPer.data[0][51];
    document.getElementById("zonaEco").value = consultaPer.data[0][55];
    document.getElementById("patrimonial").value = consultaPer.data[0][47];
    document.getElementById("numeroUni").value = consultaPer.data[0][20];
    document.getElementById("nombreUni").value = consultaPer.data[0][21];
    document.getElementById("numeroCenDist").value = consultaPer.data[0][23];
    document.getElementById("nomCenDist").value = consultaPer.data[0][24];
    document.getElementById("numeroCenTrab").value = consultaPer.data[0][26];
    document.getElementById("nomCenTrab").value = consultaPer.data[0][27];
    document.getElementById("contratacion").value = consultaPer.data[0][65];
    document.getElementById("subcategoria").value = consultaPer.data[0][61];
    document.getElementById("ClasInterna").value = consultaPer.data[0][63];
    idPuesto = consultaPer.data[0][28];


    if (percepcionesVAr == 1) {
        llenarTablaPercepcionesFijas();
        llenarTablaDeduccionesFijas();
    }

}

document.getElementById("CalLinea").addEventListener("change", actualizarValor);



async function llenarTablaPercepcionesFijas() {
    const request = await fetch("api/percepcionesfijas/" + idPuesto, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const consulta = await request.json();

    const table = document.getElementById("tablaPercepcionesPrincipal").querySelector("tbody");

    table.innerHTML = "";
    let contador = 0;

    for (var i = 0; i < consulta.length; i++) {


        const row = document.createElement("tr");
        row.id = `fila${contador}`;

        //Concepto
        const cell1 = document.createElement("td");
        cell1.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consulta[i][0]}</label></div>`;

        //Antec
        const cell2 = document.createElement("td");
        cell2.innerHTML = `<label></label>`;

        // tipo de concepto
        const cell3 = document.createElement("td");
        cell3.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consulta[i][1]} - ${consulta[i][2]}</label></div>`;

        //Nombre del concepto
        const cell4 = document.createElement("td");
        cell4.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consulta[i][3]}</label></div>`;

        //Ocurrencia Inicial
        const cell5 = document.createElement("td");
        cell5.innerHTML = `<div style="text-align:center; font-size:15px"><label>${document.getElementById("PerInicio").value}</label></div>`;

        //Ocurrencia final
        const cell6 = document.createElement("td");
        cell6.innerHTML = `<div style="text-align:center; font-size:15px"><label>${document.getElementById("PerFin").value}</label></div>`;

        //Ant. Aplicat
        const cell7 = document.createElement("td");
        cell7.innerHTML = `<div style="text-align:center; font-size:15px"><label></label></div>`;

        //Importe
        const cell8 = document.createElement("td");
        cell8.innerHTML = `<div style="text-align:center; font-size:15px"><label>${addcoma(parseFloat(consulta[i][4]))}</label></div>`;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);

        table.appendChild(row);
        contador++;
        ultimaFilaPerFijas = contador;
    }
    LlenaTablaPercepcionesVariables();
    llenarTablaDeduccionesFijas();

}

async function LlenaTablaPercepcionesVariables() {
    const request = await fetch("api/percepcionesVariables/" + idPersona, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const datos = await request.json();

    
    const table = document.getElementById("tablaPercepcionesPrincipal").querySelector("tbody");
    let contador = ultimaFilaPerFijas;

    for (var i = 0; i < datos.length; i++) {
        const row = document.createElement("tr");
        row.id = `filaVariable${contador}`;

        //Concepto
        const cell1 = document.createElement("td");
        cell1.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][0]}</label></div>`;

        //Antec
        const cell2 = document.createElement("td");

        if (datos[i][1] != null) {
            cell2.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][1]}</label></div>`;
        }


        //Tipo con
        const cell3 = document.createElement("td");
        cell3.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][2]} - ${datos[i][3]}</label></div>`;

        //nombre con
        const cell4 = document.createElement("td");
        cell4.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][4]}</label></div>`;

        //Ocurrencia Inicial
        const cell5 = document.createElement("td");
        cell5.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][6]}</label></div>`;

        //Ocurrencia final
        const cell6 = document.createElement("td");
        cell6.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][7]}</label></div>`;

        //Ant. Aplicat
        const cell7 = document.createElement("td");

        if (datos[i][5]!= null) {
            cell7.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][5]}</label></div>`;
            
        }
       
        //Importe
        const cell8 = document.createElement("td");
        if (datos[i][8]!= null) {
        cell8.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][8]}</label></div>`;
        }

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);

        table.appendChild(row);
        contador++;
    }

}


/**
 * 
 * 
 * Deducciones
 * 
 * 
 * 
 * 
 */


async function llenarTablaDeduccionesFijas() {
    const request = await fetch("api/deduccionesfijas/" + idPuesto, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const consulta = await request.json();
   // console.log(consulta);

    const table = document.getElementById("tablaDeduccionesPrincipal").querySelector("tbody");

    table.innerHTML = "";
    let contador = 0;
    

    for (var i = 0; i < consulta.length; i++) {


        const row = document.createElement("tr");
        row.id = `fila${contador}`;

        //clave
        const cell1 = document.createElement("td");
        cell1.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consulta[i][0]}</label></div>`;

        //Antec
        const cell2 = document.createElement("td");
        cell2.innerHTML = `<label></label>`;

        // tipo de concepto
        const cell3 = document.createElement("td");
        cell3.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consulta[i][1]} - ${consulta[i][2]}</label></div>`;

        //Nombre del concepto
        const cell4 = document.createElement("td");
        cell4.innerHTML = `<div style="text-align:center; font-size:15px"><label>${consulta[i][3]}</label></div>`;

        //Ocurrencia Inicial
        const cell5 = document.createElement("td");
        cell5.innerHTML = `<div style="text-align:center; font-size:15px"><label>${document.getElementById("PerInicio").value}</label></div>`;

        //Ocurrencia final
        const cell6 = document.createElement("td");
        cell6.innerHTML = `<div style="text-align:center; font-size:15px"><label>${document.getElementById("PerFin").value}</label></div>`;

        //Ant. Aplicat
        const cell7 = document.createElement("td");
        cell7.innerHTML = `<div style="text-align:center; font-size:15px"><label></label></div>`;

        //Importe
        const cell8 = document.createElement("td");
        cell8.innerHTML = `<div style="text-align:center; font-size:15px"><label>${addcoma(parseFloat(consulta[i][4]))}</label></div>`;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);

        table.appendChild(row);
        contador++;
        ultimaFilaPerFijas = contador;
    }
    LlenaTablaDeduccionesVariables();

}

async function LlenaTablaDeduccionesVariables() {
    const request = await fetch("api/dedudcionesvariables" + idPersona, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const datos = await request.json();

   // console.log(datos);
    const table = document.getElementById("tablaDeduccionesPrincipal").querySelector("tbody");
    let contador = ultimaFilaPerFijas;

    for (var i = 0; i < datos.length; i++) {
        const row = document.createElement("tr");
        row.id = `filaVariable${contador}`;

        //Concepto
        const cell1 = document.createElement("td");
        cell1.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][0]}</label></div>`;

        //Antec
        const cell2 = document.createElement("td");

        if (datos[i][1] != null) {
            cell2.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][1]}</label></div>`;
        }


        //Tipo con
        const cell3 = document.createElement("td");
        cell3.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][2]} - ${datos[i][3]}</label></div>`;

        //nombre con
        const cell4 = document.createElement("td");
        cell4.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][4]}</label></div>`;

        //Ocurrencia Inicial
        const cell5 = document.createElement("td");
        cell5.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][6]}</label></div>`;

        //Ocurrencia final
        const cell6 = document.createElement("td");
        cell6.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][7]}</label></div>`;

        //Ant. Aplicat
        const cell7 = document.createElement("td");

        if (datos[i][5]!= null) {
            cell7.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][5]}</label></div>`;
            
        }
       
        //Importe
        const cell8 = document.createElement("td");
        if (datos[i][8]!= null) {
        cell8.innerHTML = `<div style="text-align:center; font-size:15px"><label>${datos[i][8]}</label></div>`;
        }

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
        row.appendChild(cell7);
        row.appendChild(cell8);

        table.appendChild(row);
        contador++;
    }
    sumarImportesDeducciones();
    sumarImportesPercepciones();
  

}

/**
 * 
 * 
 * Fin de deducciones
 * 
 */

function limpiarCampos() {
    var elementosFormulario = document.querySelectorAll("input, textarea, select");

    elementosFormulario.forEach(function (elemento) {
        // Verifica si el elemento es un input, textarea o select
        if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA" || elemento.tagName === "SELECT") {
            // Limpia el valor del elemento
            elemento.value = "";
        }
    });
}

function actualizarValor() {
    // Obtenemos el checkbox
    var checkbox = document.getElementById("CalLinea");

    // Obtenemos el valor actual del checkbox (true si está seleccionado, false si no lo está)
    var valorCheckbox = checkbox.checked;

    // Actualizamos el valor de la variable según el estado del checkbox
    var estadoCheck = valorCheckbox ? 1 : 0;

    percepcionesVAr = estadoCheck;
    // Mostramos el valor de la variable en la consola para verificar
    console.log("Valor de la variable: " + estadoCheck);
}


var checkbox = document.getElementById("CalLinea");

checkbox.addEventListener("click", function () {


    if (checkbox.checked == true) {

        llenarTablaPercepcionesFijas();
        llenarTablaDeduccionesFijas();
    } else if (checkbox.checked == false) {

        $("#tablaPercepciones tr:gt(1)").empty();
        $("#tablaDeduccionesPrincipal tr:gt(1)").empty();

    }
});


function addcoma(numero) {
    // Convertir el número a una cadena y separar la parte entera de la decimal
    let partes = numero.toString().split(".");
    let parteEntera = partes[0];
    let parteDecimal = partes.length > 1 ? "." + partes[1] : "";

    // Agregar comas cada 3 dígitos desde la derecha
    let expresionRegular = /(\d)(?=(\d{3})+(?!\d))/g;
    parteEntera = parteEntera.replace(expresionRegular, "$1,");

    // Devolver el número formateado
    return parteEntera + parteDecimal;
}

function deselectCheckbox() {

    const myCheckbox = document.getElementById('CalLinea');
    if (!myCheckbox.type || myCheckbox.type !== 'checkbox') {
        return;
    }

    myCheckbox.checked = false;
}



function limpiarTablaPercepcionesFijas() {
    const table = document.getElementById("tablaPercepcionesPrincipal").querySelector("tbody");
    table.innerHTML = "";
}



function sumarImportesDeducciones() {
    var tabla = document.getElementById("tablaDeducciones");
    var total = 0;

    // Iterar sobre las filas excepto la primera (encabezados)
    for (var i = 1; i < tabla.rows.length; i++) {
        // Verificar si la celda de importe existe
        if (tabla.rows[i].cells.length >= 8) { // Asegúrate de ajustar según la cantidad de columnas en tu tabla
            // Obtener el contenido de la celda de la octava columna (Importe)
            var importe = parseFloat(tabla.rows[i].cells[7].textContent.trim().replace(',', '.')); // Ajuste para decimales con coma
            // Sumar al total
            total += importe;
        }
    }

    // Mostrar el total
    document.getElementById("deducciones").value = total.toFixed(3);
    Liquido();
    
}

function sumarImportesPercepciones() {
    var tabla = document.getElementById("tablaPercepciones");
    var total = 0;

    // Iterar sobre las filas excepto la primera (encabezados)
    for (var i = 1; i < tabla.rows.length; i++) {
        // Verificar si la celda de importe existe
        if (tabla.rows[i].cells.length >= 8) { // Asegúrate de ajustar según la cantidad de columnas en tu tabla
            // Obtener el contenido de la celda de la octava columna (Importe)
            var importe = parseFloat(tabla.rows[i].cells[7].textContent.trim().replace(',', '.')); // Ajuste para decimales con coma
            // Sumar al total
            total += importe;
        }
    }

    // Mostrar el total
    document.getElementById("percepciones").value = total.toFixed(3)
   // alert("La suma total de importes es: " + total.toFixed(2)); // Mostrar dos decimales
}

function Liquido() {
 
    var valor1 = Number(document.getElementById("percepciones").value);
    var valor2 = Number(document.getElementById("deducciones").value);

    
    if (isNaN(valor1) || isNaN(valor2)) {
        alert("Por favor ingresa números válidos en ambos campos.");
        return;
    }

    var resultado = valor1 - valor2;
    var resultadof = resultado.toFixed(3)
    document.getElementById("liquido").value =  resultadof;
}



// Ejemplo de cómo llamar a la función
// limpiarYRecrearTablaPercepcionesFijas();




/*function eliminarFilasPercepcionesFijas(idTabla, idInicio, idFinal) {
    const tabla = document.getElementById(idTabla);
    const tableBody = tabla.querySelector("tbody");
  
    if (!tabla || !tableBody) {
      console.error(`Tabla o elemento tbody no se encuentra`);
      return;
    }
  
    for (let i = idInicio; i <= idFinal; i++) {
      const rowToRemove = document.getElementById(`fila${i}`);
      if (rowToRemove) {
        tableBody.removeChild(rowToRemove);
      } else {
        console.error(`Fila con el ID "fila${i}" No se encuentra.`);
      }
    }
  }*/
