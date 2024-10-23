					
					async function consultarPuesto() {
						
						
						const ptotipoElegido = document.getElementById('tipo').value;
						const zonaElegida = document.getElementById('zona').value;
						const nivelElegido = document.getElementById('Nivel').value;
						const categoriaElegido = document.getElementById('Categoria').value;
						const subcategoriaElegido = document.getElementById('Subcateegoria').value;
						const clasfinternaElegido = document.getElementById('Clasificación_Interna').value;
						const contratacionElegido = document.getElementById('Contratacion').value;
						const declaracionElegido = document.getElementById('Declaracion').value;
						const idcodpuestoElegido = document.getElementById('ctgp_id').value;
						const datos = {};
					
						if (ptotipoElegido) {
							datos.pto_tipo = ptotipoElegido;
							 console.log('Tipo elegido:', ptotipoElegido);
						}
					
						if (zonaElegida) {
							datos.pto_zona = zonaElegida;
						}
					
						if (nivelElegido) {
							datos.pto_nivel = nivelElegido;
						}
					
						if (categoriaElegido) {
							datos.pto_categoria = categoriaElegido;
						}
					
						if (subcategoriaElegido) {
							datos.pto_subcategoria = subcategoriaElegido;
						}
					
						if (clasfinternaElegido) {
							datos.pto_clasfinterna = clasfinternaElegido;
						}
					
						if (contratacionElegido) {
							datos.pto_contratacion = contratacionElegido;
						}
					
						if (declaracionElegido) {
							datos.pto_declaracion = declaracionElegido;
						}
					
						if (idcodpuestoElegido) {
							datos.pto_idcodpuesto = idcodpuestoElegido;
						}
					
					
						const request = await fetch('api/puestos/consulta/datosXelecciondepuesto', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(datos)
						});                                                
					
						const personas = await request.json();
						/*console.log('Datos de persona:', personas);*/
					
					 console.log('Datos de persona:', personas);
						descargarCSV(personas);
					
					
					}
					
					const button = document.getElementById('btnregistro');
const loadingOverlay = document.getElementById('loadingOverlay');

button.addEventListener('click', async function() {
    try {
        loadingOverlay.style.display = 'flex'; // Cambia a 'flex' para centrar verticalmente
        await consultarPuesto();

        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            swal({
                title: "Reporte generado con éxito!",
                text: "Buen trabajo!",
                icon: "success",
                button: "Aceptar",
            });
        }, 3000);

    } catch (error) {
        /*console.error('Error al consultar puesto:', error);*/
        loadingOverlay.style.display = 'none';
    }

    const selects = document.querySelectorAll('select');
    selects.forEach(function(select) {
        select.value = "";
    });
});

					
					function convertirAFormatoCSV(datos) {
						const separador = ',';
						const csvRows = [];
					
					
						const encabezado = ['CODIGO DE PUESTO', 'DESCRIPCION DE PUESTO', 'DESCRPICON TIPO', 'DESCRIPCION DE ZONA', 'DESCRIPCION DEL NIVEL', 'DESCRIPCION CATEGORIA', 'DESCRIPCION SUBCATEGORIA',
							'CLASIFICACION INTERNA', 'CONTRATACION', 'DECLARACION', 'FECHA DE INICIO', 'FECHA DE TERMINO', 'USUARIO QUE CAPTURO', 'FECHA DE MODIFICACION', 'USUARIO QUE MODIFICO'];
						csvRows.push(encabezado);
					
					
						datos.forEach(fila => {
							const filaCSV = Object.values(fila).map(valor =>  {
					           
					
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
						enlace.setAttribute('download', 'datos.csv');
					
					
						enlace.style.display = 'none';
						document.body.appendChild(enlace);
						enlace.click();
						document.body.removeChild(enlace);
					}
					
					document.addEventListener("DOMContentLoaded", function() {
						async function autocompletarTrabajo() {
							const request = await fetch('api/puestos/consulta/', {
								method: "GET",
								headers: {
									Accept: "application/json",
									"Content-Type": "application/json",
								},
							});
					
							const puestos = await request.json();
					
							let stringDatos = '';
					
							for (let puesto of puestos) {
								stringDatos += puesto.ctgp_id + ' - ' + puesto.ctgp_codigo + ' - ' + puesto.ctgp_descripcion + ';';
							}
					
							let arrayDatosTrabajo = stringDatos.split(";");
					
							const autoCompleteTrabajo = new autoComplete({
								selector: "#autoComplete",
								placeHolder: "Búsqueda por clave o nombre",
								data: {
									src: arrayDatosTrabajo,
									cache: true,
								},
								resultItem: {
									element: (item, data) => {
										const values = data.value.split(" - ");
										const resultItem = document.createElement("div");
										resultItem.innerHTML = `<span>${values.slice(1).join(" - ")}</span>`;
										item.innerHTML = "";
										item.appendChild(resultItem);
									},
									highlight: true,
								},
								events: {
									input: {
										selection: (event) => {
											const selection = event.detail.selection.value;
											const values = selection.split(' - ');
											const ctgp_id = values[0];
											autoCompleteTrabajo.input.value = values.slice(1).join(' - ');
											document.getElementById('ctgp_id').value = ctgp_id;
					
					
											const btnBusqueda = document.getElementById('btnbusqueda');
											btnBusqueda.disabled = autoCompleteTrabajo.input.value.trim() === '';
										},
									},
								},
							});
					
					
							document.getElementById('btnbusqueda').addEventListener('click', function() {
					
								const selectedValue = autoCompleteTrabajo.input.value;
					
					
								const values = selectedValue.split(' - ');
					
								if (values.length >= 2) {
					
									document.getElementById('descripcion').value = values[0];
					
					
									document.getElementById('descripcionuno').value = values[1];
								} else {
					
								/*	console.error("No se ha seleccionado nada.");*/
					
					
								}
							});
						}
					
						autocompletarTrabajo();
					});
					
					
					
					
					async function buscarPuesto() {
					
						$('#codigoPuesto').prop("disabled", true);
						$('#descripcion').prop("disabled", true);
						$('#situacion').prop("disabled", true);
					
						let datos = {};
						datos.ctgp_codigo = document.getElementById('autoComplete').value.split("-")[0].trim();
					
						const request = await fetch('api/puestos/consulta/datosXcodigo', {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(datos)
						});
					
						const puestos = await request.json();
					
						if (!verificarJson(puestos)) {
							$('#modificarPuesto').removeAttr('disabled');
						}
					
						for (let puesto of puestos) {
					
							$('#codigoPuesto').val(puesto.ctgp_codigo);
							$('#descripcion').val(puesto.ctgp_descripcion);
					
					
							if (puesto.ctgp_situacion === 1) {
								$('#situacion').val("Activo");
							} else {
								$('#situacion').val("Inactivo");
							}
						}
					}
					
					
					function limpiarCampos() {
						const camposALimpiar = [
							'#descripcion', '#descripcionuno', '#autoComplete', '#tipo', '#zona', '#Nivel', '#Categoria', '#Subcateegoria', '#Clasificación_Interna', '#Contratacion', '#Declaracion']
					
						camposALimpiar.forEach(function(campo) {
							$(campo).val('');
						});
					}
					
					
					$('#btnlimpiar').on('click', limpiarCampos);
					
					
					async function consultarPuestoTipo() {
						const request = await fetch('api/persona/ObtenerTipo', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
						});
					
						const puestos = await request.json();
						/*console.log(puestos);*/
					
						const TipoSelect = $('#tipo');
						TipoSelect.empty();
					
						TipoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						puestos.forEach(puesto => {
							TipoSelect.append(`<option value="${puesto.lpto_clave}">${puesto.lpto_descripcion}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestoTipo();
					});
					
					
					async function consultarPuestoIndice() {
						const request = await fetch('api/persona/ObtenerIndice', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
						});
					
						const indices = await request.json();
						/*console.log(indices);*/
					
						const IndiceSelect = $('#zona');
						IndiceSelect.empty();
					
						IndiceSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						indices.forEach(indice => {
							IndiceSelect.append(`<option value="${indice.lpto_clave}">${indice.lpto_descripcion}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestoIndice();
					});
					
					
					
					async function consultarPuestoNivel() {
						const request = await fetch('api/persona/ObtenerNivel', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							}, 
						});
					
						const niveles = await request.json();
					/*	console.log(niveles);*/
					
						const nivelSelect = $('#Nivel');
						nivelSelect.empty();
					
						nivelSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						niveles.forEach(nivel => {
							nivelSelect.append(`<option value="${nivel.nvl_id}">${nivel.nvl_nivel}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestoNivel();
					});
					
					
					
					
					async function consultarPuestoCategoria() {
						const request = await fetch('api/persona/ObtenerCategoria', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
						});
					
						const categorias = await request.json();
						/*console.log(categorias);*/
					
						const categoriaSelect = $('#Categoria');
						categoriaSelect.empty();
					
						categoriaSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						categorias.forEach(categoria => {
							categoriaSelect.append(`<option value="${categoria.lpto_clave}">${categoria.lpto_descripcion}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestoCategoria();
					});
					
					
					
					
					
					
					async function consultarPuestosubCategoria() {
						const request = await fetch('api/persona/ObtenerSubCategoria', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
						});
					
						const subcategorias = await request.json();
						/*console.log(subcategorias);*/
					
						const subcategoriaSelect = $('#Subcateegoria');
						subcategoriaSelect.empty();
					
						subcategoriaSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						subcategorias.forEach(subcategoria => {
							subcategoriaSelect.append(`<option value="${subcategoria.lpto_clave}">${subcategoria.lpto_descripcion}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestosubCategoria();
					});
					
					
					
					async function consultarPuestointerna() {
						const request = await fetch('api/persona/ObtenerInterna', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
						});
					
						const internas = await request.json();
						/*console.log(internas);*/
					
						const internaSelect = $('#Clasificación_Interna');
						internaSelect.empty();
					
						internaSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						internas.forEach(interna => {
							internaSelect.append(`<option value="${interna.lpto_clave}">${interna.lpto_descripcion}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestointerna();
					});
					
					
					
					
					
					async function consultarPuestocontratacion() {
						const request = await fetch('api/persona/Obtenercontratacion', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
						});
					
						const contrataciones = await request.json();
						/*console.log(contrataciones);*/
					
						const contratacionSelect = $('#Contratacion');
						contratacionSelect.empty();
					
						contratacionSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						contrataciones.forEach(contratacion => {
							contratacionSelect.append(`<option value="${contratacion.lpto_clave}">${contratacion.lpto_descripcion}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestocontratacion();
					});
					
					
					
					async function consultarPuestodeclaracion() {
						const request = await fetch('api/persona/Obtenerdeclaracion', {
							method: 'GET',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
						});
					
						const declaraciones = await request.json();
						/*console.log(declaraciones);*/
					
						const declaracionSelect = $('#Declaracion');
						declaracionSelect.empty();
					
						declaracionSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
						declaraciones.forEach(declaracion => {
							declaracionSelect.append(`<option value="${declaracion.lpto_clave}">${declaracion.lpto_descripcion}</option>`);
						});
					}
					
					$(document).ready(function() {
						consultarPuestodeclaracion();
					});
					
					
					let footer = document.querySelector('footer');
					
					if (!footer) {
						footer = document.createElement('footer');
					
					
						footer.innerHTML = `  <div class="footer-content"> <p>Copyright &copy; 2023. Financiera para el Bienestar, Todos los derechos reservados.</p></div>`;
					
					
						footer.style.backgroundColor = '#13322b';
						footer.style.color = 'white';
						footer.style.textAlign = 'center';
						footer.style.fontSize = '15px';
						footer.style.position = 'fixed';
						footer.style.bottom = '0';
						footer.style.width = '100%';
					
					
						document.body.appendChild(footer);
					}
					
					
					
					
			
/*
document.getElementById('btnsiguiente').addEventListener('click', function() {
    alert("si entro aquí");
    // Tu lógica para manipular sessionStorage aquí
    // Por ejemplo:
    sessionStorage.setItem('ctroDist', 'valor');
    const valorObtenido = sessionStorage.getItem('ctroDist');
    alert('ctroDist: ' + valorObtenido);
    sessionStorage.removeItem('ctroDist');
    alert('sessionStorage borrado');
});




*/
					
					
