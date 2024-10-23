package com.app.nomina.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.dao.UsuarioDao;
import com.app.nomina.models.buscar_persona;
import com.app.nomina.models.ctg_unidad;
import com.app.nomina.models.sg_usuario;
import com.app.nomina.models.sn_persona;
import com.app.nomina.services.ProcesarNominaService;

@RestController
@RequestMapping("api/nomina/")
public class ProcesarNominaController {
	
    @Autowired
    private ProcesarNominaService procesarNominaService;
    
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;
    
    Logger logger = LoggerFactory.getLogger(ProcesarNominaController.class);
	
    @PostMapping("traerUnidades")
	public List<Object[]> TraerUnidades(@RequestBody ctg_unidad unidad) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
    	
    	logger.info(idUsuario + "|Request a la API traer unidades.");
    	
    	try {
    		
    		if (unidad.getUni_tipo() == 2) {
				return procesarNominaService.TraerUnidadesCentrales(unidad);
			
    		} else if (unidad.getUni_tipo() == 3) {
				return procesarNominaService.TraerUnidadesForaneas(unidad);
			}
    		
    		return procesarNominaService.TraerTodasLasUnidades(unidad);
    		
    	} catch (Exception e) {
    		logger.error(idUsuario + "|Error en request a la API traer unidades. ProcesarNominaController.TraerUnidades. " 
    				+ e.getMessage(), e);
    		
    		auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API traer unidades. ProcesarNominaController.TraerUnidades. " 
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
    	}
	}
    
	@GetMapping("listaPersonas")
	public List<Object[]> TraerListaPersonas() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
    	
    	logger.info(idUsuario + "|Request a la API traer unidades.");
    	
    	try {
    		
    		return procesarNominaService.TraerListaPersonas();
    		
    	} catch (Exception e) {
    		logger.error(idUsuario + "|Error en request a la API traer unidades. ProcesarNominaController.TraerUnidades. " 
    				+ e.getMessage(), e);
    		
    		auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API traer unidades. ProcesarNominaController.TraerUnidades. " 
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
    	}
	}
	
	@PostMapping("EmpleadoPorCurp")
	public List<Object[]> BuscarEmpleadoPorCurp(@RequestBody sn_persona curp) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
    	
    	logger.info(idUsuario + "|Request a la API traer unidades.");
    	
    	try {
    		System.out.println(curp.getPer_curp());
    		
    		return procesarNominaService.BuscarEmpleadoPorCurp(curp);
    		
    	} catch (Exception e) {
    		logger.error(idUsuario + "|Error en request a la API traer unidades. ProcesarNominaController.TraerUnidades. " 
    				+ e.getMessage(), e);
    		
    		auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API traer unidades. ProcesarNominaController.TraerUnidades. " 
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
    	}
	}
}