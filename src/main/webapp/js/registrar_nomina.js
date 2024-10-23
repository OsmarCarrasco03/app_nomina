//Función que nos ayuda a obtener el ejercicio actual de nómina

async function obtEjercicioActual() {
  try {
    const request = await fetch("api/consultar/ejercicio", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      throw new Error("Error al consultar el ejercicio actual");
    }

    let ejercicio = await request.json();

    if (Array.isArray(ejercicio) && ejercicio.length > 0) {
      return Object.values(ejercicio); //Convertir a arreglo
    } else {
      throw new Error("No se encontraron datos para el ejercicio actual");
    }
  } catch (error) {
    swal({
      title: "Error",
      text: error.message,
      icon: "error",
      button: "Cerrar",
    });
    return []; // Devolvemos un arreglo vacío en caso de error
  }
}

obtEjercicioActual()
  .then((ejercicioActual) => {
    // Obtener el elemento select
    const selectEjercicio = document.getElementById("inpEjercicio");

    // Crear una nueva opción para la leyenda "Selecciona una opción"
    const opcionDefault = document.createElement("option");
    //opcionDefault.text = "Selecciona una opción";
    //opcionDefault.value = ""; // Puedes establecer el valor como vacío o según necesites

    // Insertar la opción al inicio del select
    //selectEjercicio.insertBefore(opcionDefault, selectEjercicio.firstChild);

    // Obtener el año de ejercicio
    const anioEjercicio = ejercicioActual[0].ejer_ejercicio;
    
    // Crear una nueva opción con el año de ejercicio
    const nuevaOpcion = document.createElement("option");
    nuevaOpcion.text = anioEjercicio;
    nuevaOpcion.value = anioEjercicio;

    // Agregar la nueva opción al select
    selectEjercicio.add(nuevaOpcion);

  })
  .catch((error) => {
    console.error(error);
  });

// Termina función para obtener el ejercicio actual de Nómina

async function AgregarInputActivoPeriodo() {
  
  const solicitud = await fetch("api/consultar/periodo", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await solicitud.json();

  periodo_actual=data[0].pp_quincena;

  // Obtén el elemento select
  const selectPeriodo = document.getElementById("inpPeriodo");

  // Crea una nueva opción con la leyenda "Selecciona una opción"
  const opcionDefault = document.createElement("option");
  opcionDefault.text = periodo_actual;
  opcionDefault.value = periodo_actual; // Puedes establecer el valor como vacío o según necesites

  // Agrega la nueva opción al inicio del select
  selectPeriodo.insertBefore(opcionDefault, selectPeriodo.firstChild);
  document.getElementById("botonBuscar").removeAttribute("disabled");
    document
      .getElementById("botonBuscar")
      .addEventListener("click", buscarNomina);

}
AgregarInputActivoPeriodo();

// Función que nos ayuda a obtener el periodo actual de Nómina

async function obtenerPeriodos() {
  try {
    const solicitud = await fetch("api/nomina/periodos", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    

    if (!solicitud.ok) {
      throw new Error("Error al consultar el ejercicio actual");
    }

    let periodo = await solicitud.json();
    
    if (Array.isArray(periodo) && periodo.length > 0) {
      return periodo; // No es necesario convertir a arreglo ya que se espera que periodo ya sea un arreglo
    } else {
      throw new Error("No se encontraron datos para el periodo actual");
    }
  } catch (error) {
    // Aquí deberías mostrar el error usando SweetAlert
    swal({
      title: "Error",
      text: error.message,
      icon: "error",
      button: "Cerrar",
    });
    return []; // Devolvemos un arreglo vacío en caso de error
  }
}

obtenerPeriodos()
  .then((periodoActual) => {

    // // Obtén el elemento select
     const selectPeriodo = document.getElementById("inpPeriodo");

    // // Crea una nueva opción con la leyenda "Selecciona una opción"
    // const opcionDefault = document.createElement("option");
    // opcionDefault.text = "Selecciona una opcion";
    // opcionDefault.value = ""; // Puedes establecer el valor como vacío o según necesites

    // // Agrega la nueva opción al inicio del select
    // selectPeriodo.insertBefore(opcionDefault, selectPeriodo.firstChild);

    // Utiliza un Set para almacenar los periodos únicos
    const periodosUnicos = new Set();
    
    // Recorre todos los periodos en periodoActual
    for (const periodo of periodoActual) {
      // Agrega cada periodo al Set
      periodosUnicos.add(periodo.pp_quincena);
    }

    // Recorre el Set de periodos únicos y agrégalos al select
    for (const periodo of periodosUnicos) {
      // Crea una nueva opción con el periodo
      const nuevaOpcion = document.createElement("option");
      nuevaOpcion.text = periodo;
      nuevaOpcion.value = periodo;



      // Agrega la nueva opción al select
      selectPeriodo.add(nuevaOpcion);
      // selectPeriodo.add(nuevaOpcion.periodo.pp_quincena[1]);

    }
  })
  .catch((error) => {
    console.error('Error al obtener los periodos:', error);
  });

  // function muestraSeleccion(){

  //     /* Para obtener el valor */
  //     var cod = document.getElementById("inpPeriodo").value;
  //     alert(cod);

  //     /* Para obtener el texto */
  //     var combo = document.getElementById("inpPeriodo");
  //     var selected = combo.options[combo.selectedIndex].text;
  //     alert(selected)

  // }

  

//Termina función para obtener el periodo actual de Nómina

//Inicio Llamada a la API Periodo Actual

const inputPeriodo = document.getElementById('inpPeriodo');

async function obtenerPeriodoActual(periodo_lista) {
  
  const solicitud = await fetch("api/consultar/periodo", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await solicitud.json();
 
  periodo_actual=data[0].pp_quincena;
  
  
  
  if(periodo_actual==periodo_lista) {
    document.getElementById("botonBuscar").removeAttribute("disabled");
    document
      .getElementById("botonBuscar")
      .addEventListener("click", buscarNomina);
  } else {
     // Obtén el botón por su ID
        const boton = document.getElementById("botonBuscar");

        // Añade el atributo disabled al botón
        boton.disabled = true;
  }
  
}

inputPeriodo.addEventListener('input', (event) => {

 
  periodo_lista =document.getElementById("inpPeriodo").value;
  obtenerPeriodoActual(periodo_lista);
  
});



//Fin llamada a la API Periodo Actual



//Función para obtener los 101 valores de la tabla ctg_nominas y pasarlos al modal
// var data_id = null;
// var usucapturo_id = null;

// //Inicio de función para dejar apretar el boton buscar una vez que se escoge el ejercicio y periodo
// let contador = 0;
// let contEjer = 0;
// let contPerio = 0;
// document
//   .getElementById("inpEjercicio")
//   .addEventListener("change", contadorEjercicio);
// document
//   .getElementById("inpPeriodo")
//   .addEventListener("change", contadorPeriodo);

// function contadorEjercicio() {
//   contEjer++;
//   if (contEjer == 1) {
//     accesoBuscarNomina();
//   }
// }

// function contadorPeriodo() {
//   contPerio++;
//   if (contPerio == 1) {
//     accesoBuscarNomina();
//   }
// }

// function accesoBuscarNomina() {
//   contador++;
//   if (contador === 2) {
//     document.getElementById("botonBuscar").removeAttribute("disabled");
//     document
//       .getElementById("botonBuscar")
//       .addEventListener("click", buscarNomina);
//   }
// }


//Inicio para llenar la tabla con los datos que ya fueron registrados en sn_nominasoperando

async function buscarNominasOperando() {
  try {
    const request = await fetch("api/nomina/consulta/buscarNominaOperando", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const nominasoperando = await request.json();

    // Referencia a la tabla
    var tabla2 = document
      .getElementById("tablaInfoNominasOperando")
      .getElementsByTagName("tbody")[0];
    
    for (let i = 0; i < nominasoperando.length; i++) {
      // Crear una nueva fila para cada nombre de la tabla de nomina
      var fila = tabla2.insertRow();

      // Insertar celdas en la fila para cada atributo de la nomina
      //var celdaId = fila.insertCell(0);
      var celdaEjercicio = fila.insertCell(0);
      var celdaClave = fila.insertCell(1);
      var celdaNombre = fila.insertCell(2);
      var celdaSituacion = fila.insertCell(3);
      var celdaperiodo = fila.insertCell(4);
      var celdaInicio = fila.insertCell(5);
      var celdaTermino = fila.insertCell(6);
      var celdaSeleccion = fila.insertCell(7);
      //tabla2.rows[i].cells[0].classList.toggle('oculto');
      //celdaId.innerHTML = nominasoperando[i][0]//`<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][0]}" disabled style="visibility: hidden; />`; // Incremento el índice en 1 para empezar desde 1 en lugar de 0
      celdaEjercicio.innerHTML = nominasoperando[i][1];
      celdaClave.innerHTML = nominasoperando[i][2];
      celdaNombre.innerHTML = nominasoperando[i][3];

      if (nominasoperando[i][4] == 1) {
        celdaSituacion.innerHTML = "ACTIVO";
      } else {
        celdaSituacion.innerHTML = "INACTIVO";
      }

      celdaperiodo.innerHTML = nominasoperando[i][5];
      celdaInicio.innerHTML = nominasoperando[i][6];
      if (nominasoperando[i][7] == undefined) {
        celdaTermino.innerHTML = "";
      } else {
        celdaTermino.innerHTML = nominasoperando[i][7];
      }

      if(nominasoperando[i][4]== 1 && nominasoperando[i][2] != 1 && nominasoperando[i][2] != 77){
        celdaSeleccion.innerHTML = `<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][2]}"/>`;
      }else{
        celdaSeleccion.innerHTML = `<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][2]}" disabled style="appearance: none; -webkit-appearance: none; -moz-appearance: none; background-color: gray; border: 1px solid #444; width: 16px; height: 16px; border-radius: 50%; cursor: pointer; position: relative;"/>`;
      }

      // function ocultarColumna(index) {
      //   var table = document.getElementById('tablaInfoNominasOperando');
      //   for (var i = 0; i < table.rows.length; i++) {
      //       table.rows[i].cells[index].classList.toggle('oculto');
      //   }
      // }

      DarbajaNominas(nominasoperando);
    }
  } catch (error) {
    console.error("Error al obtener las nominas operando:", error);
    swal({
      title: "Error al obtener las nominas operando.",
      text: "Por favor, inténtelo de nuevo más tarde.",
      icon: "error",
      button: "Aceptar",
    });
  }
}

buscarNominasOperando();
//Fin para llenar la tabla con los datos que ya fueron registrados en sn_nominasoperando

/* Inicio Función Buscar Nomina */

async function buscarNomina() {
  try {
    const request = await fetch("api/nomina/consulta/ejercicio", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const nominas = await request.json();

    llenaModalX(nominas);
  } catch (error) {
    console.error("Error al obtener las nominas:", error);
    swal({
      title: "Error al obtener las nominas.",
      text: "Por favor, inténtelo de nuevo más tarde.",
      icon: "error",
      button: "Aceptar",
    });
  }
}
//Termina función de obtener 101 valores y llenar modal

//Selecciona los valores del modal por medio de form-check-input, y llena toda la tabla con esta información

async function llenaModalX(nomina) {
  const modal = document.getElementById("modalInfo");
  const modalTitle = modal.querySelector(".modal-title");
  const modalBody = modal.querySelector(".modal-body");
  const seleccionarBtn = document.getElementById("seleccionarBtn"); // Agregar el botón de "Seleccionar"

  $(modal).modal("show");
  modalTitle.textContent = "Selecciona una nomina para registrar";

  modalBody.innerHTML = "";
  modalBody.innerHTML = `<table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Ejercicio</th>      
                <th scope="col">Clave</th>
                <th scope="col">Nombre</th> 
                <th scope="col">Situación</th>  
                <th scope="col">Seleccionar</th>    <!-- Agregar una columna para los checkboxes -->  
            </tr>
        </thead>
        <tbody></tbody>
    </table>`;

  const table = modalBody.querySelector("table tbody");
  table.innerHTML = "";
  let contador = 0;

  if (nomina.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = "<td colspan='6'>No se encontraron datos</td>";
    table.appendChild(row);
    return;
  }

  for (var i = 0; i < nomina.length; i++) {
    contador++;
    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.innerHTML = `<label class="form-check-label">${nomina[i][2]}</label>`; //#

    const cell2 = document.createElement("td");
    cell2.innerHTML = `<label class="form-check-label">${nomina[i][1]}</label>`; //Ejercicio

    const cell3 = document.createElement("td");
    cell3.innerHTML = `<label class="form-check-label">${nomina[i][2]}</label>`; //Clave

    const cell4 = document.createElement("td");
    cell4.innerHTML = `<label class="form-check-label">${nomina[i][3]}</label>`; //Nombre

    const cell5 = document.createElement("td");
    if (nomina[i][4] == 1) {
      //Situación
      cell5.innerHTML = `<label class="form-check-label">ACTIVO</label>`;
    } else {
      cell5.innerHTML = `<label class="form-check-label">INACTIVO</label>`;
    }
    //Aquí hay que modificar esta celda
    const cell6 = document.createElement("td");
    cell6.innerHTML = `<input class="form-check-input" type="radio" name="seleccion" value="${nomina[i][0]}" id="${nomina[i][0]}"
        ejercicio="${nomina[i][1]}" clave="${nomina[i][2]}" nombre="${nomina[i][3]}"/>`;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.appendChild(cell6);

    table.appendChild(row);
  }

  seleccionarBtn.addEventListener("click", function () {
    const selectedCheckboxes = modalBody.querySelectorAll(
      'input[type="radio"]:checked'
    );

    // Recorrer los elementos seleccionados
    selectedCheckboxes.forEach((checkbox) => {
      // Obtener el valor del checkbox
      var valorCheckbox = checkbox.value;
      
      // Asignar valores a cada celda
      
      for (let j = 0; j < nomina.length; j++) {
        if (valorCheckbox == nomina[j][0]) {
          const ejercicioSelect = document.getElementById("inpEjercicio");
          const ejercicio = ejercicioSelect.value.trim();
          const periodoSelect = document.getElementById("inpPeriodo");
          const periodo = periodoSelect.value.trim();

          const inicio = document.getElementById("inpFechaInicio").value;
          // const usucapturo = sessionStorage.idUsuario;
          const fechamod = document.getElementById(
            "inpFechaModificacion"
          ).value;
          // const situacionControl = document.getElementById('inpSituacion').value;
          // const usumod = sessionStorage.idUsuario;
          const numNomina = nomina[j][2];

          const situacion = nomina[j][4];

          const nuevaNomina = {
            nop_ejercicio: ejercicio,
            nop_periodo: periodo,
            nop_numnomina: numNomina,
            nop_etapa: 1,
            nop_secuenciarad: 1,
            nop_situacion: situacion,
            nop_fechainicio: inicio,
            nop_usucapturo: inpUsuarioCapturo,
            nop_fechamod: fechamod,
            nop_usumodifico: inpUsuarioModifico,
          };

          swal({
            title: "¿Estás seguro de registrar esta nómina?",
            text: "Una vez registrada, no podrás deshacer esta acción",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
          }).then((willRegister) => {
            if (willRegister) {
              fetch("api/nomina/registroNomina", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevaNomina),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al registrar la nómina");
                  }
                  return response.json();
                })
                .then((data) => {
  
                  if (data === true) {
                    swal("¡Nómina registrada exitosamente!", {
                      icon: "success",
                    });
                    limpiarTabla();
                    buscarNominasOperando();
                  } else {
                    swal({
                      title: "¡Error al registrar la nómina!",
                      // text: `La nómina ya existe. Detalles de la nómina:\n${detallesPuesto}`,
                      text: `La nómina ya existe. Detalles de la nómina:`,
                      icon: "error",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  swal("¡Error al registrar la nómina!", {
                    icon: "error",
                  });
                });
            }
          });
        }
      }
      limpiarInputs();

      // Desmarcar el checkbox
      checkbox.checked = false;
    });

    $(modal).modal("hide");
  });
}

function limpiarTabla() {
  // Referencia a la tabla
  var tabla = document
    .getElementById("tablaInfoNominasOperando")
    .getElementsByTagName("tbody")[0];

  // Limpiar la tabla eliminando todas las filas
  tabla.innerHTML = "";
}

//FIN función limpiar campos

function limpiarInputs() {
  document.getElementById("inpEjercicio").value = "";
  document.getElementById("inpPeriodo").value = "";
  //limpiarTabla();
  contador = 0;
  contEjer = 0;
  contPerio = 0;
  // Obtén el botón por su ID
  const boton = document.getElementById("botonBuscar");

  // Añade el atributo disabled al botón
  boton.disabled = true;
}

async function DarbajaNominas(nominasoperando) {
  bajaNomina.addEventListener("click", function () {

    const table2 = document.getElementById("tablaInfoNominasOperando");
    const longitud =table2.rows.length ;
    
    const selectedCheckboxes = table2.querySelectorAll(
      'input[type="radio"]:checked'
    );
    // Recorrer los elementos seleccionados
    selectedCheckboxes.forEach((checkbox) => {
      // Obtener el valor del checkbox
      var valorCheckbox = checkbox.value;
      
      // Asignar valores a cada celda
      for (j  = 0; j < longitud; j++) {
        if (valorCheckbox == table2.rows[j].cells[1].innerHTML) {

          const situacion = 2;
          var fechaTer = new Date().toISOString().split("T")[0];
          const fechatermino = fechaTer;
          const fechamodificacion = fechaTer;
          const UsuarioModifico = sessionStorage.idUsuario;
          const clave = table2.rows[j].cells[1].innerHTML;
  
          const bajaNomina = {
            nop_numnomina: clave,
            nop_situacion: situacion,
            nop_fechatermino: fechatermino,
            nop_fechamod: fechamodificacion,
            nop_usumodifico: UsuarioModifico,
          };
  
          swal({
            title: "¿Estás seguro de dar de baja esta nomina?",
            text: "Una vez dada de baja, no podrás deshacer esta acción",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
          }).then((willRegister) => {
            if (willRegister) {
              fetch("api/nomina/bajaNomina", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bajaNomina),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al registrar la nómina");
                  }
                  return response.json();
                })
                .then((data) => {
    
                  if (data === true) {
                    swal("¡Nómina dada de baja exitosamente!", {
                      icon: "success",
                    });
                    //tabla2.remove();
                    limpiarTabla();
                    // buscarNominasOperando();
                    tablaPeriodo();
                    
                  } else {
                    swal({
                      title: "¡Error al dar de baja la nómina!",
                      // text: `La nómina ya existe. Detalles de la nómina:\n${detallesPuesto}`,
                      text: `La nómina ya se dio de baja. Detalles de la nómina:`,
                      icon: "error",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  swal("¡Error al dar de baja la nómina!", {
                    icon: "error",
                  });
                });
            }
          });
        }
        
      }
      

      for (let j = 0; j < nominasoperando.length; j++) {

        if (valorCheckbox == nominasoperando[j][2]) {
      
          const situacion = 2;
          var fechaTer = new Date().toISOString().split("T")[0];
          const fechatermino = fechaTer;
          const fechamodificacion = fechaTer;
          const UsuarioModifico = sessionStorage.idUsuario;
          const clave = nominasoperando[j][2];

          const bajaNomina = {
            nop_numnomina: clave,
            nop_situacion: situacion,
            nop_fechatermino: fechatermino,
            nop_fechamod: fechamodificacion,
            nop_usumodifico: UsuarioModifico,
          };

          swal({
            title: "¿Estás seguro de dar de baja esta nomina?",
            text: "Una vez dada de baja, no podrás deshacer esta acción",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
          }).then((willRegister) => {
            if (willRegister) {
              fetch("api/nomina/bajaNomina", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bajaNomina),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al registrar la nómina");
                  }
                  return response.json();
                })
                .then((data) => {
                
                  if (data === true) {
                    swal("¡Nómina dada de baja exitosamente!", {
                      icon: "success",
                    });
                    //tabla2.remove();
                    limpiarTabla();
                    // buscarNominasOperando();
                    tablaPeriodo();
                    
                  } else {
                    swal({
                      title: "¡Error al dar de baja la nómina!",
                      // text: `La nómina ya existe. Detalles de la nómina:\n${detallesPuesto}`,
                      text: `La nómina ya se dio de baja. Detalles de la nómina:`,
                      icon: "error",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  swal("¡Error al dar de baja la nómina!", {
                    icon: "error",
                  });
                });
            }
          });
        } 
      }
      
      // Desmarcar el checkbox
      checkbox.checked = false;
      
    });

  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Comienza función  tablaPeriodo 
//boton.addEventListener("click", async function () {

async function tablaPeriodo() {

  let datos = {};
  datos.sn_nominasoperando = document
      .getElementById("inpPeriodo")
      .value.split("-")[0]
      .trim();

  try {
  
    const request = await fetch("api/nomina/tablaPorPeriodo/" + datos.sn_nominasoperando, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    });

    if (!request.ok) {
      throw new Error('Error al recuperar los datos');

  }

    const objeto = await request.json();
  
    //Convierte un object data a un arreglo
		const nominasoperando = Object.values(objeto.data);



    if (datos.sn_nominasoperando.length === 0) {
      swal({
          title: 'Por favor, ingrese un periodo válido.',
          icon: 'error',
          button: 'Aceptar'
      });
      return;  
    }

    limpiarTabla();

    var tabla2 = document
      .getElementById("tablaInfoNominasOperando")
      .getElementsByTagName("tbody")[0];
      

      for (let i = 0; i < nominasoperando.length; i++) {
        // Crear una nueva fila para cada nombre de la tabla de nomina
        var fila = tabla2.insertRow();

        // Insertar celdas en la fila para cada atributo de la nomina
        //var celdaId = fila.insertCell(0);
        var celdaEjercicio = fila.insertCell(0);
        var celdaClave = fila.insertCell(1);
        var celdaNombre = fila.insertCell(2);
        var celdaSituacion = fila.insertCell(3);
        var celdaperiodo = fila.insertCell(4);
        var celdaInicio = fila.insertCell(5);
        var celdaTermino = fila.insertCell(6);
        var celdaSeleccion = fila.insertCell(7);
        //tabla2.rows[i].cells[0].classList.toggle('oculto');
        //celdaId.innerHTML = nominasoperando[i][0]//`<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][0]}" disabled style="visibility: hidden; />`; // Incremento el índice en 1 para empezar desde 1 en lugar de 0
        celdaEjercicio.innerHTML = nominasoperando[i][1];
        celdaClave.innerHTML = nominasoperando[i][2];
        celdaNombre.innerHTML = nominasoperando[i][3];

        if (nominasoperando[i][4] == 1) {
          celdaSituacion.innerHTML = "ACTIVO";
        } else {
          celdaSituacion.innerHTML = "INACTIVO";
        }

        celdaperiodo.innerHTML = nominasoperando[i][5];
        celdaInicio.innerHTML = nominasoperando[i][6];
        if (nominasoperando[i][7] == undefined) {
          celdaTermino.innerHTML = "";
        } else {
          celdaTermino.innerHTML = nominasoperando[i][7];
        }

        if(nominasoperando[i][4]== 1 && nominasoperando[i][2] != 1 && nominasoperando[i][2] != 77){
          celdaSeleccion.innerHTML = `<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][2]}"/>`;
        }else{
          celdaSeleccion.innerHTML = `<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][2]}" disabled style="appearance: none; -webkit-appearance: none; -moz-appearance: none; background-color: gray; border: 1px solid #444; width: 16px; height: 16px; border-radius: 50%; cursor: pointer; position: relative;"/>`;
        }
        
      } 
        
  } catch(error){
    console.error("Error:", error);

    swal({
      title: "¡No existen datos de este periodo!",
      text: `Selecciona otro periodo`,
      icon: "error",
    });
  }

};


//DATOS CONTROL

datosControl1();

