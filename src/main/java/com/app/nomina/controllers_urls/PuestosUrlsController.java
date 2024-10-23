package com.app.nomina.controllers_urls;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
 
@Controller
public class PuestosUrlsController {
 
	Logger logger = LoggerFactory.getLogger(PuestosUrlsController.class);
	
	@RequestMapping("/tabulador_consulta_puesto")
	public String TabuladorConsultaPuesto() {
		return "tabulador_consulta_puesto";
	}
	
	@RequestMapping("/tabulador_modificar_puesto")
	public String TabuladorModificarPuesto() {
		return "tabulador_modificar_puesto";
	}
	
	@RequestMapping("/tabulador_registrar_puesto")
	public String TabuladorRegistrarPuesto() {
		return "tabulador_registrar_puesto";
	}
}
