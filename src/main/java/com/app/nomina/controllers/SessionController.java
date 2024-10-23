package com.app.nomina.controllers;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.models.sg_usuario;

@RestController
public class SessionController {

    Logger logger = LoggerFactory.getLogger(SessionController.class);
    
    @Autowired
    private HttpServletRequest request;
    
    @Autowired
    private AuditoriaDao auditoria;
    
    @PostMapping("api/sesion/crearSesion")
	public String CrearSesion(@RequestBody sg_usuario usuario) {
    	
    	try {
			logger.info("Creando sesión");
			
			HttpSession session = request.getSession(true);
			
			session.setAttribute("idUsuario", usuario.getUsu_id());
			
			Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();
			
			while (networkInterfaces.hasMoreElements()) {
				NetworkInterface networkInterface = networkInterfaces.nextElement();
				
				if (!networkInterface.isLoopback() && networkInterface.isUp()) {
					
					Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
					
					for (InetAddress inetAddress : Collections.list(inetAddresses)) {
						
						if (!inetAddress.isLoopbackAddress() && inetAddress.getHostAddress().indexOf(':') == -1) {
							session.setAttribute("ipUsuario", inetAddress.getHostAddress());
						}
					}
				}
			}

			Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
			
	        while (interfaces.hasMoreElements()) {
	            NetworkInterface interfacee = interfaces.nextElement();

	            byte[] macAddress = interfacee.getHardwareAddress();

	            if (macAddress != null) {
	            	session.setAttribute("macUsuario", 
	            			String.format("%02X:%02X:%02X:%02X:%02X:%02X", macAddress[0], macAddress[1], 
	            					macAddress[2], macAddress[3], macAddress[4], macAddress[5]));
	            }
	        }
			
			String idUsuario = session.getAttribute("idUsuario").toString();
			String ipUsuario = session.getAttribute("ipUsuario").toString();
			String macUsuario = session.getAttribute("macUsuario").toString();
			
			//session.setMaxInactiveInterval(30 * 60); // 30 minutos
			
			session.setMaxInactiveInterval(36000); // 10 horas
			
			logger.info(idUsuario + "|Sesión creada correctamente.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 1, 0, 
					"Inicio de sesión. ", ipUsuario, macUsuario);
			
			return "OK";
			
		} catch (Exception e) {
			logger.error("Error al crear sesión. SessionController.CrearSesion. " + e.getMessage(), e);
			
		    return "FAIL";
		}
	}
    
    @GetMapping("api/sesion/reiniciarContadorSesion")
    public boolean ReiniciarContadorSesion() {
    	HttpSession session = request.getSession(true);
    	
    	String idUsuario = null;
    	
    	if(session.getAttribute("idUsuario") == null) {
    		return false;
    		
    	}else {
    		
    		idUsuario = session.getAttribute("idUsuario").toString();
    	}
    	
		try {
			
			//session.setMaxInactiveInterval(30 * 60); // 30 minutos
			
			session.setMaxInactiveInterval(36000); // 10 horas
			
			logger.info(idUsuario + "|Reiniciando contador de sesión");
			
			return true;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al reiniciar contador. SessionController.ReiniciarContadorSesion. " + e.getMessage(), e);
			
			return false;
		}
    }
    
    public HashMap<String, String> sesionUsuario() {
		
		try {
			HttpSession session = request.getSession(true);
			
			HashMap<String, String> sesionUsuario = new HashMap<String, String>();
			
			Object idUsusarioObject = session.getAttribute("idUsuario");
			Object ipUsusarioObject = session.getAttribute("ipUsuario");
			Object macUsusarioObject = session.getAttribute("macUsuario");
			
			if (idUsusarioObject != null
					&& ipUsusarioObject != null
					&& macUsusarioObject != null) {
				
			    sesionUsuario.put("idUsuario", idUsusarioObject.toString());
			    sesionUsuario.put("ipUsuario", ipUsusarioObject.toString());
			    sesionUsuario.put("macUsuario", macUsusarioObject.toString());
				
				return sesionUsuario;
			}
			
			return new HashMap<String, String>();
			
		} catch (Exception e) {
			logger.error("Error al obtener datos de sesión del usuario. SessionController.CerrarSesion. " + e.getMessage(), e);
		    
			return new HashMap<String, String>();
		}
    }
    
    @GetMapping("api/sesion/verificarSesion")
    public boolean VerificarSesion() {
    	HttpSession session = request.getSession(true);
    	
    	String idUsuario = session.getAttribute("idUsuario").toString();
    	String ipUsuario = session.getAttribute("ipUsuario").toString();
		String macUsuario = session.getAttribute("macUsuario").toString();
    	
		try {
			
			logger.info(idUsuario + "|Verificando sesión del usuario.");
			
			if (idUsuario == null) {
				logger.info(idUsuario + "|La sesión es inválida. Redirigiendo a login.");
				
				session.invalidate();

				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 1, 7, "Cerrando sesión. ", ipUsuario,
						macUsuario);
				
				return false;
			}
			
			logger.info(idUsuario + "|Sesión del usuario vigente.");
			return true;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al reiniciar contador. SessionController.ReiniciarContadorSesion. " + e.getMessage(), e);
			
			return false;
		}
    }
    
	@GetMapping("api/sesion/borrarSesion")
    public String CerrarSesion() {
    	
        HttpSession session = request.getSession(true);
		
		try {

			Object idUsusarioObject = session.getAttribute("idUsuario");
			Object ipUsusarioObject = session.getAttribute("ipUsuario");
			Object macUsusarioObject = session.getAttribute("macUsuario");

			if (idUsusarioObject != null && ipUsusarioObject != null && macUsusarioObject != null) {

				String idUsuario = idUsusarioObject.toString();
				String ipUsuario = ipUsusarioObject.toString();
				String macUsuario = macUsusarioObject.toString();

				if (session != null) {
					// Invalidate and destroy the session
					session.invalidate();

					logger.info(idUsuario + "|Sesión borrada exitosamente");

					auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 1, 7, "Cerrando sesión. ", ipUsuario,
							macUsuario);

					return "OK";
				}

			}
			logger.info("Sesión borrada por tiempo");

			return "OK";

		} catch (Exception e) {
			logger.error("Error al cerrar sesión. SessionController.CerrarSesion. " + e.getMessage(), e);
		    
			return "FAIL";
		}
    }
}