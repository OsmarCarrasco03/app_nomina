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
import com.app.nomina.dao.ModuloDao;
import com.app.nomina.models.sg_modulo;

@RestController
public class ModuloController {
	Logger logger = LoggerFactory.getLogger(ModuloController.class);
	
	@Autowired
	ModuloDao moduloDao;
	
	@Autowired
    private SessionController sesion;
	
	@Autowired
    private AuditoriaDao auditoria;
    
    @GetMapping("api/modulo/privilegios")
	public List<sg_modulo> ArbolPrivilegios() {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		logger.info(idUsuario + "|Request a la API Arbol Privilegios");
		
		try {
			
			return moduloDao.ObtenerArbolPrivilegios();
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al obtener árbol de privilegios. ModuloController.ArbolPrivilegios. " + e.getMessage(),
					e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 7, 8, 
					"Error al obtener árbol de privilegios. ModuloController.ArbolPrivilegios.",
					ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
	}
}