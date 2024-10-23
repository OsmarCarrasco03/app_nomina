package com.app.nomina.controllers_urls;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NominaUrlsController {
    Logger logger = LoggerFactory.getLogger(NominaUrlsController.class);

    @RequestMapping("/consulta_periodos_anuales")
	public String ConsultaPeriodosAnuales() {
		return "consulta_periodos_anuales";
	}

    @RequestMapping("/consulta_periodos_quincenales")
	public String ConsultaPeriodosQuincenales() {
		return "consulta_periodos_quincenales";
	}
    
    @RequestMapping("/procesar_nomina")
	public String ProcesarNomina() {
		return "procesar_nomina";
	}
}
