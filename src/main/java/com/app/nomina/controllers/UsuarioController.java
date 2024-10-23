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
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.dao.UsuarioDao;
import com.app.nomina.models.buscar_persona;
import com.app.nomina.models.sg_usuario;

@RestController
public class UsuarioController {
	
    @Autowired
    private UsuarioDao usuarioDao;
    
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;
    
    Logger logger = LoggerFactory.getLogger(UsuarioController.class);
	
    @PostMapping("api/usuario/actualizar")
	public String actualizarUsuario(@RequestBody sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
    	
    	logger.info(idUsuario + "|Request a la API actualizar usuario");
    	
    	try {
    		
    		if(usuarioDao.actualizarUsuario(usuario)) {
    			logger.info(idUsuario + "|Correcta respuesta de la API actualizar usuario");
    			return "OK";
    		}
    		
    		auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API actualizar usuario. UsuarioController.actualizarUsuario. ", 
    				ipUsuario, macUsuario);
    		
    		return "FAIL";
    		
    	} catch (Exception e) {
    		logger.error(idUsuario + "|Error en request a la API actualizar usuario. UsuarioController.actualizarUsuario. " 
    				+ e.getMessage(), e);
    		
    		auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API actualizar usuario. UsuarioController.actualizarUsuario. " 
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
    		
    		return "FAIL";
    	}
	}
    
    @GetMapping("api/usuario/autocompletarPersona")
   	public List<Object[]> autocompletarUsuarioPersona() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API autocompletar usuario persona");
	   		
	   		return usuarioDao.autocompletarUsuarioPersona();
	   		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API autocompletar usuario persona. UsuarioController.autocompletarUsuarioPersona. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API autocompletar usuario persona. UsuarioController.autocompletarUsuarioPersona. "
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}
   	
   	@GetMapping("api/usuario/autocompletarUsuario")
   	public List<sg_usuario> autocompletarUsuario() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API autocompletar usuario");
	   		
	   		return usuarioDao.autocompletarUsuario();
	   		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API autocompletar usuario. UsuarioController.autocompletarUsuario. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API autocompletar usuario. UsuarioController.autocompletarUsuario. "
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}
   	
   	@PostMapping("api/usuario/navbar")
   	public Object[] ObtenerNavbar(@RequestBody sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API Obtener Navbar");
	   		
	   		return usuarioDao.ObtenerNavbar(usuario);
	   		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API obtener navbar. UsuarioController.ObtenerNavbar. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API obtener navbar. UsuarioController.ObtenerNavbar. "
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
    		
			return new Object[0];
		}
   	}
   	
    @PostMapping("api/usuario/registrar/buscarUsuario")
   	public List<Object[]> buscarUsuario(@RequestBody buscar_persona persona) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API buscar usuario");
	    	
	   		return usuarioDao.buscarUsuario(persona);
	   		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API buscar usuario. UsuarioController.buscarUsuario. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API buscar usuario. UsuarioController.buscarUsuario."
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
   	}
   	
   	@PostMapping("api/usuario/registrar")
   	public String RegistrarUsuario(@RequestBody sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API registrar usuario");
	    	
	    	if(usuarioDao.registrarUsuario(usuario)) {
				logger.info(idUsuario + "|Correcta respuesta de la API registrar usuario");
				return "OK";
			}
	    	logger.error(idUsuario + "|Error en respuesta de la API registrar usuario");
			return "FAIL";
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API registrar usuario. UsuarioController.RegistrarUsuario. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API registrar usuario. UsuarioController.RegistrarUsuario."
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
			return "FAIL";
		}
   	}
   	
   	@PostMapping("api/usuario/registrar/verificarUsuario")
   	public String VerificarUsuario(@RequestBody sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API verificar usuario");
	    	
	    	String verificar = usuarioDao.verificarUsuario(usuario);
	    	
	    	if(verificar == "registrado") {
				return "registrado";
				
			}else if(verificar == "no_registrado") {
				
				return "no_registrado";
			}
	    	
			logger.error(idUsuario + "|Error en respuesta de la API verificar usuario");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API verificar usuario. UsuarioController.VerificarUsuario.", 
    				ipUsuario, macUsuario);
			
			return "error";
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API verificar usuario. UsuarioController.VerificarUsuario. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API verificar usuario. UsuarioController.VerificarUsuario. " 
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
			
			return "error";
		}
   	}
   	
   	@PostMapping("api/usuario/consultar")
   	public List<sg_usuario> ConsultarUsuario(@RequestBody sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
   		
		try {
			logger.info(idUsuario + "|Request a la API consultar usuario");
	    	
	    	return usuarioDao.consultarUsuario(usuario);
	    	
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API consultar usuario. UsuarioController.VerificarUsuario. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API consultar usuario. UsuarioController.VerificarUsuario. " 
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
   	}
   	
   	@PostMapping("api/usuario/cambiarContrasena")
   	public boolean CambiarContrasena(@RequestBody sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
   		
		try {
			logger.info(idUsuario + "|Request a la API cambiar contraseña.");
			
	    	return usuarioDao.CambiarContrasena(usuario);
	    	
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en request a la API cambiar contraseña. UsuarioController.CambiarContrasena. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API cambiar contraseña. UsuarioController.CambiarContrasena. " 
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
			
			return false;
		}
   	}
}