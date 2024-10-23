$(async function () {
	if (sessionStorage.idUsuario != null) {
		await CrearNavbar();
	}
});

const navDinamico = document.getElementById('nav-dinamico');

function crearMenuItem(modulos) {
	const li = document.createElement('li');
	li.id = `${modulos}`;
	li.classList.add('nav-item');
	li.classList.add('dropdown');
	return li;
}

function crearLinkMenuItem(text, href) {
	const link = document.createElement('a');
	link.href = href;
	link.classList.add('nav-link', 'dropdown-toggle', 'active');
	link.setAttribute('data-bs-toggle', 'dropdown');
	link.setAttribute('data-bs-auto-close', 'outside');
	link.textContent = text;
	return link;
}

function crearUlMenuItem(id) {
	const ul = document.createElement('ul');
	ul.id = id;
	ul.classList.add('dropdown-menu', 'shadow');
	return ul;
}

function agregarMenuItem(li, a, ul) {
	li.appendChild(a).appendChild(ul);
	navDinamico.appendChild(li);
}

function crearSubmenu(modulos) {
	const li = document.createElement("li");
	li.id = `${modulos}`;
	li.classList.add('dropend');
	return li;
}

function crearLinkSubmenu(text, href) {
	const a = document.createElement("a");
	a.href = href;
	a.classList.add('dropdown-item', 'dropdown-toggle');
	a.setAttribute("data-bs-toggle", "dropdown");
	a.setAttribute("data-bs-auto-close", "outside");
	a.textContent = text;
	return a;
}

function crearLinkSubmenuUnico(id, text, href) {
	const a = document.createElement("a");
	a.id = id;
	a.classList.add('dropdown-item');
	a.textContent = text;
	a.href = href;

	a.addEventListener("click", function () {
		window.location.href = href;
	});

	return a;
}

function agregarSubmenu(id, li, a) {
	const ulUsuarioSeguridad = document.getElementById(id);
	ulUsuarioSeguridad.appendChild(li).appendChild(a);
}

function crearSubmenuItem(id) {
	let submenuUsuario = document.getElementById(id);

	if (submenuUsuario !== null) {
		return submenuUsuario;

	} else {
		const ul = document.createElement("ul");
		ul.id = id;
		ul.classList.add('dropdown-menu');
		ul.classList.add('shadow');

		return ul;
	}
}

//Crea un <li> que tendrá un nuevo link para el submenu
function crearLiSubmenuItem() {
	const li = document.createElement("li");
	return li;
}

function crearLinkSubmenuItem(id, text, href) {
	const a = document.createElement("a");
	a.id = id;
	a.classList.add('dropdown-item');
	a.textContent = text;
	a.href = href;

	a.addEventListener("click", function () {
		window.location.href = href;
	});

	return a;
}

function agregarSubmenuItem(id, ul, li, a) {
	const liUsuario = document.getElementById(id);
	liUsuario.appendChild(ul).appendChild(li).appendChild(a);
}

async function CrearNavbar() {
	let datos = {};
	datos.usu_id = sessionStorage.idUsuario;
	datos.usu_administrador = sessionStorage.permisos;

	let li = '';
	let a = '';
	let ul = '';

	const request = await fetch('api/usuario/navbar', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});

	const respuesta = await request.json();

	if (verificarJson1(respuesta)) {
		swal({
			title: "Error al obtener la barra de navegación",
			text: "Consulte al administrador",
			icon: "error",
			button: "Cerrar",
		});

		li = document.createElement("li");
		li.classList.add('nav-item');

		a = document.createElement("a");
		a.classList.add('nav-link');
		a.classList.add('active');
		a.textContent = "Cerrar Sesión";
		a.href = '#';
		a.addEventListener("click", cerrarSesion);

		navDinamico.appendChild(li).appendChild(a);
		return;
	}

	for (const modulos of respuesta) {
		switch (modulos) {
			case 2: // MENU Seguridad
				li = crearMenuItem(modulos);
				a = crearLinkMenuItem('Seguridad', '#');
				ul = crearUlMenuItem('ul-usuario-seguridad');
				agregarMenuItem(li, a, ul);
				break;
			case 3: // SUBMENU Usuario
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Usuario', '#');
				agregarSubmenu('ul-usuario-seguridad', li, a);
				break;
			case 4: // Registrar usuario
				ul = crearSubmenuItem('submenu-usuario');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-usuario', 'Registrar Usuario', 'registrar_usuario');
				agregarSubmenuItem(3, ul, li, a);
				let submenuUsuario = document.getElementById('submenu-usuario');
				break;
			case 5: // Consultar usuario
				ul = crearSubmenuItem('submenu-usuario');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-usuario', 'Consultar Usuario', 'consultar_usuario');
				agregarSubmenuItem(3, ul, li, a);
				break;
			case 6: // Modificar Usuario
				ul = crearSubmenuItem('submenu-usuario');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('modificar-usuario', 'Modificar Usuario', 'modificar_usuario');
				agregarSubmenuItem(3, ul, li, a);
				break;
			case 7: // SUBMENU Privilegios
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Privilegios', '#');
				agregarSubmenu('ul-usuario-seguridad', li, a);
				break;
			case 8: // Asignar Modulos
				ul = crearSubmenuItem('submenu-privilegios');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('asignar-modulos', 'Asignar Modulos', 'asignar_modulos');
				agregarSubmenuItem(7, ul, li, a);
				break;
			case 9: // Consultar modulos asignados
				ul = crearSubmenuItem('submenu-privilegios');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-modulos', 'Consultar Modulos Asignados', 'consultar_modulos');
				agregarSubmenuItem(7, ul, li, a);
				break;
			case 10: // MENU Nómina
				li = crearMenuItem(modulos);
				a = crearLinkMenuItem('Nómina', '#');
				ul = crearUlMenuItem('ul-persona-pagos');
				agregarMenuItem(li, a, ul);
				break;
			case 11: // SUBMENU Persona
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Persona', '#');
				agregarSubmenu('ul-persona-pagos', li, a);
				break;

			case 12: // Registrar Persona
				ul = crearSubmenuItem('submenu-persona');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-persona', 'Registrar Persona', 'registrar_persona');
				agregarSubmenuItem(11, ul, li, a);
				break;
			case 13: // Consultar Persona
				ul = crearSubmenuItem('submenu-persona');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-persona', 'Consultar Persona', 'consultar_persona');
				agregarSubmenuItem(11, ul, li, a);
				break;
			case 14: // Modificar Persona
				ul = crearSubmenuItem('submenu-persona');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('modificar-persona', 'Modificar Persona', 'modificar_persona');
				agregarSubmenuItem(11, ul, li, a);
				break;
			case 15: // SUBMENU Consulta de Pagos
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Consulta de Pagos', '#');
				agregarSubmenu('ul-persona-pagos', li, a);
				break;
			case 16: // Consulta de Pagos Actual
				ul = crearSubmenuItem('submenu-pagos');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-pagos-ac', 'Consulta Genérica de Pagos Actual', 'consulta_Generica');
				agregarSubmenuItem(15, ul, li, a);
				break;
			case 17: // Consulta de Pagos HA
				ul = crearSubmenuItem('submenu-pagos');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-pagos-ha', 'Consulta de Pagos HA', 'consulta_pagos_ha');
				agregarSubmenuItem(15, ul, li, a);
				break;
			case 18: // Consulta de Pagos FL
				ul = crearSubmenuItem('submenu-pagos');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-pagos-fl', 'Consulta de Pagos FL', 'consulta_pagos_fl');
				agregarSubmenuItem(15, ul, li, a);
				break;

			case 74: // SUBMENU Control
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Control', '#');
				agregarSubmenu('ul-persona-pagos', li, a);
				break;

			case 75: // Control Ejercicio
				ul = crearSubmenuItem('submenu-control');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('control-ejercicio', 'Ejercicio', 'consulta_periodos_anuales');
				agregarSubmenuItem(74, ul, li, a);
				break;

			case 76: // Control Periodos
				ul = crearSubmenuItem('submenu-control');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('control-periodos', 'Periodos', 'consulta_periodos_quincenales');
				agregarSubmenuItem(74, ul, li, a);
				break;


			case 19: // MENU Puestos
				li = crearMenuItem(modulos);
				a = crearLinkMenuItem('Puesto', '#');
				ul = crearUlMenuItem('ul-catalogo-puesto');
				agregarMenuItem(li, a, ul);
				break;

			// case 20: // LINK UNICO Catálogo de Puestos
			// 	li = crearSubmenu(modulos);
			//     a = crearLinkSubmenuUnico('consultar-puesto', 'Catálogo de Puestos', 'catalogo_puestos');
			//     agregarS	ubmenu('ul-catalogo-puesto', li, a);
			//     break;


			case 20: // SUBMENU Catalogo puesto
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Catalogo Código de Puestos', '#');
				agregarSubmenu('ul-catalogo-puesto', li, a);
				break;




			case 21: // SUBMENU Puesto
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Configuración de Puesto', '#');
				agregarSubmenu('ul-catalogo-puesto', li, a);
				break;


			case 22: // Registrar Puesto
				ul = crearSubmenuItem('submenu-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-puesto', 'Registrar Puesto', 'registrar_puesto');
				agregarSubmenuItem(21, ul, li, a);
				break;


			case 23: // Consultar Puesto
				ul = crearSubmenuItem('submenu-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-puesto', 'Consultar Puesto', 'consultar_puesto');
				agregarSubmenuItem(21, ul, li, a);
				break;
			case 24: // Modificar Puesto
				ul = crearSubmenuItem('submenu-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('modificar-puesto', 'Modificar Puesto', 'modificar_puesto');
				agregarSubmenuItem(21, ul, li, a);
				break;


			case 25: // MENU Plazas
				li = crearMenuItem(modulos);
				a = crearLinkMenuItem('Plazas', '#');
				ul = crearUlMenuItem('ul-plazas');
				agregarMenuItem(li, a, ul);
				break;


			case 26: // Registrar Plaza
				ul = crearSubmenuItem('submenu-plazas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar_plaza', 'Registrar Plaza', 'registrar_plaza');
				agregarSubmenuItem(25, ul, li, a);
				break;

			case 27: // Consultar Plaza
				ul = crearSubmenuItem('submenu-plazas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar_plaza', 'Consultar Plaza', 'consultar_plaza');
				agregarSubmenuItem(25, ul, li, a);
				break;
			case 28: // Modificar Plaza
				ul = crearSubmenuItem('submenu-plazas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('modificar_plaza', 'Modificar Plaza', 'modificar_plaza');
				agregarSubmenuItem(25, ul, li, a);
				break;


			case 29: // MENU Concepto
				li = crearMenuItem(modulos);
				a = crearLinkMenuItem('Concepto', '#');
				ul = crearUlMenuItem('ul-concepto');
				agregarMenuItem(li, a, ul);
				break;



			
			

			case 30: // Registrar Concepto
				ul = crearSubmenuItem('submenu-concepto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-concepto', 'Registrar Concepto', 'registrar_concepto');
				agregarSubmenuItem(29, ul, li, a);
				break;
			case 31: // Consultar Concepto
				ul = crearSubmenuItem('submenu-concepto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-concepto', 'Consultar Concepto', 'consultar_concepto');
				agregarSubmenuItem(29, ul, li, a);
				break;
			case 32: // Modificar Concepto
				ul = crearSubmenuItem('submenu-concepto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('modificar_concepto', 'Modificar Concepto', 'modificar_concepto');
				agregarSubmenuItem(29, ul, li, a);
				break;
			case 36: // Reporteador Persona
				ul = crearSubmenuItem('submenu-persona');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('reporteador-persona', 'Reporteador Persona', 'reporteador_persona');
				agregarSubmenuItem(11, ul, li, a);
				break;
			case 37: // Reporteador Puesto
				ul = crearSubmenuItem('submenu-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('reporteador-puesto', 'Reporteador Puesto', 'reporteador_puesto');
				agregarSubmenuItem(21, ul, li, a);
				break;
			case 39: // SUBMENU Asignacion plazas	        
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Asignacion de plazas', '#');
				agregarSubmenu('submenu-plazas', li, a);
				break;
			case 40: // SUB-SUBMENU ASIGNAR PLAZA por persona	         
				ul = crearSubmenuItem('ul-plazas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Plaza X Persona', 'Asignar Plaza por Persona', 'Plaza_Persona');
				agregarSubmenuItem(39, ul, li, a);
				break;
			case 41: // SUB-SUBMENU CONSULTAR PLAZA por persona	         
				ul = crearSubmenuItem('ul-plazas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Plaza X Persona', 'Consultar Plaza por Persona', 'consulta_plaza_persona');
				agregarSubmenuItem(39, ul, li, a);
				break;
			case 42: // SUB-SUBMENU MODIFICAR PLAZA por persona	         
				ul = crearSubmenuItem('ul-plazas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Plaza X Persona', 'Baja De Plaza Por Persona', 'Baja_plazas_por_persona');
				agregarSubmenuItem(39, ul, li, a);
				break;
			case 43: // MENU Puestos
				li = crearMenuItem(modulos);
				a = crearLinkMenuItem('Empleado', '#');
				ul = crearUlMenuItem('ul-empleado');
				agregarMenuItem(li, a, ul);
				break;

			case 44: // SUBMENU Puesto
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Domicilios', '#');
				agregarSubmenu('ul-empleado', li, a);
				break;


			





			case 45: // Registrar Puesto
				ul = crearSubmenuItem('submenu-empleado');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-domicilio', 'Registrar Domicilio', 'registrar_domicilio');
				agregarSubmenuItem(44, ul, li, a);
				break;
			case 48: // SUBMENU Asignacion plazas	        
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Cuentas', '#');
				agregarSubmenu('ul-empleado', li, a);
				break;
			case 49: // SUB-SUBMENU ASIGNAR PLAZA por persona	         
				ul = crearSubmenuItem('ul-cuentas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Cuenta X Persona', 'Registrar Cuenta', 'registrar_ctabancpersona');
				agregarSubmenuItem(48, ul, li, a);
				break;
			case 50: // SUBMENU Tabulador de Puesto
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Tabulador de Puesto', '#');
				agregarSubmenu('ul-catalogo-puesto', li, a);
				break;
			case 51: // Tabulador Consultar Puesto
				ul = crearSubmenuItem('submenu-tabulador-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('tabulador_consulta_puesto', 'Consulta Tabulador de Puesto', 'tabulador_consulta_puesto');
				agregarSubmenuItem(50, ul, li, a);
				break;

			case 52: // Registrar Puesto
				ul = crearSubmenuItem('submenu-catalogo-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-puesto', 'Registrar código de puesto ', 'registro_puesto');
				agregarSubmenuItem(20, ul, li, a);
				break;

			// case 51: // Registrar Puesto
			// 	ul = crearSubmenuItem('submenu-catalogo-puesto');
			// 	li = crearLiSubmenuItem();
			// 	a = crearLinkSubmenuItem('registrar-puesto', 'Catalogo código de puesto', 'catalogo_puestos');
			// 	agregarSubmenuItem(20, ul, li, a);
			// 	break;

			case 53: // Registrar Puesto
				ul = crearSubmenuItem('submenu-catalogo-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-puesto', 'Modificar código de puesto', 'modificar_puestoxcodigo');
				agregarSubmenuItem(20, ul, li, a);
				break;
			case 54: // Registrar Puesto
				ul = crearSubmenuItem('submenu-catalogo-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('registrar-puesto', 'Reporteador código de puesto', 'reportes_puestoxcodigo');
				agregarSubmenuItem(20, ul, li, a);
				break;
			case 55: // Registrar Puesto
				ul = crearSubmenuItem('ul-cuentas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Cuenta X Persona', 'Consultar cuenta', 'consulta_ctabancpersona');
				agregarSubmenuItem(48, ul, li, a);
				break;
			case 56: // Registrar Puesto
				ul = crearSubmenuItem('ul-cuentas');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Cuenta X Persona', 'Modificar cuenta', 'modificar_ctabancpersona');
				agregarSubmenuItem(48, ul, li, a);
				break;

			case 57: // Registrar Puesto
				ul = crearSubmenuItem('submenu-empleado');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Cuenta X Persona', 'Consultar domicilio', 'consulta_domicilio');
				agregarSubmenuItem(44, ul, li, a);
				break;
			case 58: // Registrar Puesto
				ul = crearSubmenuItem('submenu-empleado');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Cuenta X Persona', 'Modificar domicilio', 'modificar_domicilio');
				agregarSubmenuItem(44, ul, li, a);
				break;
				
			case 59: // Registrar Puesto
				ul = crearSubmenuItem('submenu-catalogo-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consultar-puesto', 'Consulta código de puesto ', 'puesto');
				agregarSubmenuItem(20, ul, li, a);
				break;

			

	

				case 71:         
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Carga de conceptos variables', '#');
				agregarSubmenu('submenu-concepto', li, a);
				break;

			

				case 72: 
				ul = crearSubmenuItem('ul-carga');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('carga-conceptos', 'Carga masiva de conceptos', 'registrar_conceptosvariables');
				agregarSubmenuItem(71, ul, li, a);
				break;


			case 60: // Tabulador Modificar Puesto

				ul = crearSubmenuItem('submenu-tabulador-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('tabulador_modificar_puesto', 'Modificar Tabulador de Puesto', 'tabulador_modificar_puesto');
				agregarSubmenuItem(50, ul, li, a);
				break;
			case 61: // SUBMENU Niveles
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Niveles', '#');
				agregarSubmenu('ul-catalogo-puesto', li, a);
				break;
			case 62: // Registrar usuario
				ul = crearSubmenuItem('submenu-niveles');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('alta_nivel', 'Alta Nivel', 'alta_nivel');
				agregarSubmenuItem(61, ul, li, a);
				break;

			case 65: // Consulta nivel
				ul = crearSubmenuItem('submenu-niveles');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consulta_nivel', 'Consulta Nivel', 'consulta_nivel');
				agregarSubmenuItem(61, ul, li, a);
				break;

			case 66: // MOdificar nivel
				ul = crearSubmenuItem('submenu-niveles');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('modificar_nivel', 'Modificar Nivel', 'modificar_nivel');
				agregarSubmenuItem(61, ul, li, a);
				break;


			

				


			case 78:
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Conceptos variables', '#');
				agregarSubmenu('submenu-concepto', li, a);
				break;
			case 79: // SUB SUBMENU Conceptos variables
				ul = crearSubmenuItem('submenu-conceptos');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('Regisrtro_conceptos_variables', 'Registrar Conceptos Variables', 'conceptosVariables');
				agregarSubmenuItem(78, ul, li, a);
				break;

			case 80: // SUB SUBMENU Conceptos variables
				ul = crearSubmenuItem('submenu-conceptos');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consulta_conceptos_Variables', 'Consultar Conceptos Variables', 'consulta_conceptos_Variables');
				agregarSubmenuItem(78, ul, li, a);
				break;

			case 81: // SUB SUBMENU Conceptos variables
				ul = crearSubmenuItem('submenu-conceptos');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('modificacion_conceptos_Variables', 'Modificar Conceptos Variables', 'modificacion_conceptos_Variables');
				agregarSubmenuItem(78, ul, li, a);
				break;

			case 82:
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Historico Plazas', '#');
				agregarSubmenu('submenu-plazas', li, a);
				
				break;
			case 83: // SUB SUBMENU Conceptos variables
				ul = crearSubmenuItem('submenu-historico');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('consulta_historico_plazas', 'Consulta Historico de Plazas', 'consulta_historico_plazas');
				agregarSubmenuItem(82, ul, li, a);
				break;
				
			case 73: // Tabulador Registrar Puesto
				ul = crearSubmenuItem('submenu-tabulador-puesto');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('tabulador_registrar_puesto', 'Tabulador Registrar Puesto', 'tabulador_registrar_puesto');
				agregarSubmenuItem(50, ul, li, a);
				break;
			case 86: // SUBMENU Subprocesos de Nómina
				li = crearSubmenu(modulos);
				a = crearLinkSubmenu('Subprocesos de Nómina', '#');
				agregarSubmenu('ul-persona-pagos', li, a);
				break;

			case 87: // Procesar Nómina
				ul = crearSubmenuItem('submenu-procesar-nomina');
				li = crearLiSubmenuItem();
				a = crearLinkSubmenuItem('procesar-nomina', 'Procesar Nomina', 'procesar_nomina');
				agregarSubmenuItem(86, ul, li, a);
				break;
		}





	}

	li = document.createElement("li");
	li.classList.add('nav-item');

	a = document.createElement("a");
	a.classList.add('nav-link');
	a.classList.add('active');
	a.textContent = "Cerrar Sesión";
	a.href = '#';
	a.addEventListener("click", cerrarSesion);

	navDinamico.appendChild(li).appendChild(a);
}





// case 84: 

// console.log('carga_masiva')

// 				ul = crearSubmenuItem('ul-carga');
// 				li = crearLiSubmenuItem();
// 				a = crearLinkSubmenuItem('carga-conceptos', 'Carga masiva ', 'carga_masiva');
// 				agregarSubmenuItem(71, ul, li, a);
// 				break;