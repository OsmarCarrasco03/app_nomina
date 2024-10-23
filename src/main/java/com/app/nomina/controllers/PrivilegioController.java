package com.app.nomina.controllers;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.dao.PrivilegioDao;
import com.app.nomina.models.sg_privilegio;

@RestController
public class PrivilegioController {

    Logger logger = LoggerFactory.getLogger(PrivilegioController.class);
    
	@Autowired
    private SessionController sesion;
    
    @Autowired
    private PrivilegioDao privilegioDao;
    
    @Autowired
    private AuditoriaDao auditoria;
    
    @PostMapping("api/usuario/mostrarPagina")
   	public boolean MostrarPagina(@RequestBody sg_privilegio privilegio) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API mostrar página");
	    	
	    	return privilegioDao.mostrarPagina(privilegio);
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al consultar privilegio para visualizar el módulo. PrivilegioDaoImp.mostrarPagina. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), privilegio.getPriv_idmodulo(), 8, 
					"Error al consultar privilegio para visualizar el módulo. PrivilegioController.MostrarPagina.", 
					ipUsuario, macUsuario);
			
			return false;
		}
   	}
}