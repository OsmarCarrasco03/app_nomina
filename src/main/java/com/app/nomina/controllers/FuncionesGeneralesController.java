package com.app.nomina.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.dao.FuncionesGeneralesDao;
import com.app.nomina.models.sn_ejercicio;
import com.app.nomina.models.sn_periodosdepago;
import com.app.nomina.models.sn_vigtabulador;

@RestController
public class FuncionesGeneralesController {
	
	@Autowired
	private FuncionesGeneralesDao funcionesGeneralesDao;
	
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;
    
    Logger logger = LoggerFactory.getLogger(FuncionesGeneralesController.class);
	
   	@GetMapping("api/consultar/ejercicio")
   	public List<sn_ejercicio> ObtenerEjercicioActual() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API obtener ejercicio actual.");
	   		
			return funcionesGeneralesDao.EjercicioActual();
	   		
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API Obtener Ejercicio Actual. FuncionesGeneralesController.ObtenerEjercicioActual." 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API Obtener Ejercicio Actual. FuncionesGeneralesController.ObtenerEjercicioActual.", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}
   	
   	@GetMapping("api/consultar/periodo")
   	public List<sn_periodosdepago> ObtenerPeriodoActual() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API obtener periodo actual");
	   		
			return funcionesGeneralesDao.PeriodoActual();
	   		
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API Obtener Periodo Actual. FuncionesGeneralesController.ObtenerPeriodoActual." 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API Obtener Periodo Actual. FuncionesGeneralesController.ObtenerPeriodoActual.", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}
   	
   	@GetMapping("api/consultar/tabulador")
   	public List<sn_vigtabulador> ObtenerTabuladorActual() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API obtener tabulador actual");
	   		
			return funcionesGeneralesDao.TabuladorActual();
	   		
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API Obtener Tabulador Actual. FuncionesGeneralesController.ObtenerTabuladorActual." 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API Obtener Tabulador Actual. FuncionesGeneralesController.ObtenerTabuladorActual.", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}
}