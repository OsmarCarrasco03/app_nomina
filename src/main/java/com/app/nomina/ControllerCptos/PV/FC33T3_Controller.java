package com.app.nomina.ControllerCptos.PV;

import java.math.BigDecimal;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.ServiceCptos.PV.FC33T3_Service;
import com.app.nomina.controllers.SessionController;
import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.pojos.DataFuncionFC33T3;

@RestController
@RequestMapping("api/concepto")
public class FC33T3_Controller {
	
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;
	
	@Autowired
	private FC33T3_Service service;
	
	Logger logger = LoggerFactory.getLogger(FC33T3_Controller.class);
	
	@PostMapping("/puntualidad")
	public BigDecimal ObtenerConceptoPuntualidad(@RequestBody DataFuncionFC33T3 dataFuncionFC33T3) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		logger.info(idUsuario + "|Request a la API de Puntualidad");
		
		return service.FC33T3(dataFuncionFC33T3);
	}
	
}
