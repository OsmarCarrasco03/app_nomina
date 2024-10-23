package com.app.nomina.controllers;

import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.app.nomina.dao.*;
import com.app.nomina.models.ctg_niveles;

@RestController
@RequestMapping("api/nivel")
public class AltaNivelController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;

    Logger logger = LoggerFactory.getLogger(AltaNivelController.class);

    private final AltaNivelDao altaNivelDao;

    public AltaNivelController(AltaNivelDao altaNivelDao) {
        this.altaNivelDao = altaNivelDao;
    }

    // Obtener los datos de el modelo ctg_lstpuesto
    @GetMapping("/consulta/dosDatos")
    public List<ctg_niveles> obtenerDosDatos() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
        try {
            logger.info(idUsuario + "|Request a la API consulta dos Datos");

            return altaNivelDao.obtenerDosDatos();
            
        } catch (Exception e) {
            logger.info(idUsuario + "|Error en request a la API consulta dos Datos. AltaNivelController.consulta dos Datos. "
                    + e.getMessage(), e);
    //         //e.printStackTrace();
    //         //throw new RuntimeException("Ocurrió un error al obtener persona por tabla.");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 61, 8, 
    				"Error en request a la API autocompletar usuario persona. UsuarioController.autocompletarUsuarioPersona. ", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
        }
    }

    // Registro para la tabla ctg_lstpuesto
    @PostMapping("/registro")
    public boolean registroAlta(@RequestBody ctg_niveles alta) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
   		
        try {
            logger.info(idUsuario + "|Request a la API consulta dos Datos");

            return altaNivelDao.registroAlta(alta);
            
        } catch (Exception e) {
            logger.info(idUsuario + "|Error en request a la API consulta dos Datos. AltaNivelController.consulta dos Datos. "
                    + e.getMessage(), e);
            //e.printStackTrace();
            //throw new RuntimeException("Ocurrió un error al obtener persona por tabla.");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 61, 8, 
    				"Error en request a la API autocompletar usuario persona. UsuarioController.autocompletarUsuarioPersona. ", 
    				ipUsuario, macUsuario);
    		
    		return false;
        }
    }
             
    // Consulta de la tabla ctg_niveles para autocompletar en la búsqueda
    @PostMapping("/autocompletarNivel/{input}")
    public ResponseEntity<Object> getautocompletarNivel(@PathVariable("input") String input) {
        
        try {
            List<ctg_niveles> consultaNivelDetails = altaNivelDao.autocompletarNivel(input);
            if (consultaNivelDetails.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message",
                                "No existen datos para la plaza con número: " + input));
            }
            logger.info("Los datos del puesto autorizado se obtuvieron satisfatoriamente");
            return ResponseEntity.ok().body(Collections.singletonMap("data", consultaNivelDetails));
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Algo salió mal en la comunicación con el servidor"));
        }
    }

    //Consulta de nombres de usuarios que capturaron
    @GetMapping("consulta/usuarioCapturo")
    public List<ctg_niveles> usuarioCapturo() {

    	HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API usuarioCapturo");
	   		
            return altaNivelDao.usuarioCapturo();
	   		
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API usuarioCapturo. UsuarioController.usuarioCapturo. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 61, 8, 
    				"Error en request a la API autocompletar usuario. AltaNivelController.autocompletarUsuario.", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}
 
    // Registro para la tabla ctg_lstpuesto
    @PostMapping("/actualizar")
    public boolean actualizarNivel(@RequestBody ctg_niveles alta) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
   		
		try {
			logger.info(idUsuario + "|Request a la API actualizar.");
			
	    	return altaNivelDao.actualizarNivel(alta);
	    	
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API actualizar. UsuarioController. actualizar. " 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API cambiar contraseña. UsuarioController.CambiarContrasena.", 
    				ipUsuario, macUsuario);
			
			return false;
		}
    	
   	}

}
