package com.app.nomina.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

	Logger logger = LoggerFactory.getLogger(IndexController.class);

	@RequestMapping("/")
	public String index() {
		return "index";
	}

	@RequestMapping("/cambiar_contrasena")
	public String CambiarContrasena() {
		return "cambiar_contrasena";
	}

	@RequestMapping("/index")
	public String paginaInicio() {
		logger.info("Ha ingresado al index correctamente");
		return "bienvenida";
	}

	@RequestMapping("/registrar_concepto")
	public String registrarConcepto() {
		return "ide_concepto";
	}

	@RequestMapping("/consultar_concepto")
	public String ConsultarConcepto() {
		return "ide_concepto";
	}

	@RequestMapping("/modificar_concepto")
	public String ModificarConcepto() {
		return "ide_concepto";
	}

	@RequestMapping("/ide_concepto")
	public String ideConcepto() {
		return "ide_concepto";
	}

	@RequestMapping("/puesto")
	public String puesto() {
		return "puesto";
	}

	@RequestMapping("/catalogo_puestos")
	public String CatalogoPuesto() {

		return "puesto";
	}

	@RequestMapping("/consultar_plaza")
	public String consultar_plaza() {
		return "consulta_plazas";
	}

	@RequestMapping("/registrar_plaza")
	public String registrar_plaza() {
		return "registrar_plaza";
	}

	@RequestMapping("/modificar_plaza")
	public String modificar_plaza() {
		return "modificar_plaza";
	}

	@RequestMapping("/consulta_pagos_actual")
	public String ConsultaPagosActual() {
		return "consulta_empleado";
	}

	@RequestMapping("/consulta_pagos_ha")
	public String ConsultaPagosHA() {
		return "consulta_empleado";
	}

	@RequestMapping("/consulta_pagos_fl")
	public String ConsultaPagosFL() {
		return "consulta_empleado";
	}

	@RequestMapping("/registrar_usuario")
	public String RegistrarUsuario() {
		return "registrar_usuario";
	}

	@RequestMapping("/consultar_usuario")
	public String ConsultarUsuario() {
		return "consultar_usuario";
	}

	@RequestMapping("/modificar_usuario")
	public String ModificarUsuario() {
		return "modificar_usuario";
	}

	@RequestMapping("/registrar_puesto")
	public String RegistrarPuesto() {
		return "ConfiguracionPuesto";
	}

	@RequestMapping("/consultar_puesto")
	public String ConsultarPuesto() {
		return "Consultar_puesto";
	}

	@RequestMapping("/modificar_puesto")
	public String ModificarPuesto() {
		return "Modifica_puesto";
	}

	@RequestMapping("/asignar_modulos")
	public String AsignarModulos() {
		return "AsignarModulos";
	}

	@RequestMapping("/consultar_modulos")
	public String ConsultarModulos() {
		return "ConsultarModulos";
	}

	@RequestMapping("/registrar_persona")
	public String registrar_persona() {
		return "registrar_persona";
	}

	@RequestMapping("/modificar_persona")
	public String modificar_persona() {
		return "modificar_persona";
	}

	@RequestMapping("/consultar_persona")
	public String consultarPersona() {
		return "consultar_persona";
	}

	@RequestMapping("/reporteador_persona")
	public String reportes_persona() {
		return "reportes_persona";
	}

	@RequestMapping("/plaza")
	public String plaza() {
		return "plaza";
	}

	@RequestMapping("/Modal_ctratrabajo")
	public String Modal_ctratrabajo() {
		return "Modal_ctratrabajo";
	}

	@RequestMapping("/reporteador_puesto")
	public String reportes_puestos() {
		return "reportes_puestos";
	}

	@RequestMapping("/Modal_cdisdistribucion")
	public String Modal_cdisdistribucion() {
		return "Modal_cdisdistribucion";
	}

	@RequestMapping("/pdf_documents")
	public String pdf_documents() {
		return "pdf_documents";
	}

	@RequestMapping("/Plaza_Persona")
	public String PlazaPersona() {
		return "Plaza_Persona";
	}

	@RequestMapping("/pruebacsv")
	public String pruebacsv() {
		return "pruebacsv";
	}

	@RequestMapping("/registrar_domicilio")
	public String registrar_domicilio() {
		return "registrar_domicilio";
	}

	@RequestMapping("/consulta_plazas")
	public String consultar_plazas() {
		return "consulta_plazas";
	}

	@RequestMapping("/registrar_ctabancpersona")
	public String registrar_ctabancpersona() {
		return "registrar_ctabancpersona";
	}

	@RequestMapping("/registro_puesto")
	public String registro_puesto() {
		return "registro_puesto";
	}

	@RequestMapping("/modificar_puestoxcodigo")
	public String modificar_puestoxcodigo() {
		return "modificar_puestoxcodigo";
	}

	@RequestMapping("/reportes_puestoxcodigo")
	public String reportes_puestoxcodigo() {
		return "reportes_puestoxcodigo";
	}

	@RequestMapping("/consulta_ctabancpersona")
	public String consulta_ctabancpersona() {
		return "consulta_ctabancpersona";
	}

	@RequestMapping("/modificar_ctabancpersona")
	public String modificar_ctabancpersona() {
		return "modificar_ctabancpersona";
	}

	@RequestMapping("/consulta_domicilio")
	public String consulta_domicilio() {
		return "consulta_domicilio";
	}

	@RequestMapping("/modificar_domicilio")
	public String modificar_domicilio() {
		return "modificar_domicilio";
	}

	@RequestMapping("/alta_nivel")
	public String alta_nivel() {
		return "alta_nivel";
	}

	@RequestMapping("/consulta_nivel")
	public String consulta_nivel() {
		return "consulta_nivel";
	}

	@RequestMapping("/modificar_nivel")
	public String modificar_nivel() {
		return "modificar_nivel";
	}


	@RequestMapping("/conceptosVariables")
	public String conceptosVariables() {
		return "conceptosVariables";
	}

	@RequestMapping("/modificacion_conceptos_Variables")
	public String ModificacionconceptosVariables() {
		return "modificacion_conceptos_Variables";
	}

	@RequestMapping("/consulta_conceptos_Variables")
	public String consultaConceptosVariables() {
		return "consulta_conceptos_Variables";
	}

	@RequestMapping("/consulta_historico_plazas")
	public String consultaHistoricoPlazas() {
		return "consulta_historico_plazas";
	}

	@RequestMapping("/modifica_plaza_persona")
	public String modificaPlazaPersona() {
		return "modifica_plaza_persona";
	}

	@RequestMapping("/consulta_plaza_persona")
	public String consultaPlazaPersona() {
		return "consulta_plaza_persona";
	}


	@RequestMapping("/Baja_plazas_por_persona")
	public String BajaPlazasPorPersona() {
		return "Baja_plazas_por_persona";
	}

	@RequestMapping("/registrar_conceptosvariables")
	public String registrar_conceptosvariables() {

		return "registrar_conceptosvariables";
	}
	
	@RequestMapping("/consulta_Generica")
	public String consultaGenerica() {

		return "consulta_Generica";
	}
	
	@RequestMapping("/carga_masiva")
	public String carga_masiva() {

		return "carga_masiva";
	}	 

	@RequestMapping("/prueba_osmar")
	public String prueba_osmar() {

		return "prueba_osmar";
	}	 
	
}