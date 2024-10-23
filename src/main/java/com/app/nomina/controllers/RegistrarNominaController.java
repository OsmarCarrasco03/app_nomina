package com.app.nomina.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.dao.FuncionesGeneralesDao;
import com.app.nomina.dao.RegistrarNominaDao;
import com.app.nomina.dao.UsuarioDao;
import com.app.nomina.models.sn_nominasoperando;
import com.app.nomina.models.sn_periodosdepago;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.ctg_nominas;

@RestController
@RequestMapping("api/nomina")
public class RegistrarNominaController {

	@Autowired
    private UsuarioDao usuarioDao;
	
	@Autowired
	private FuncionesGeneralesDao funcionesGeneralesDao;
	
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;
    
    Logger logger = LoggerFactory.getLogger(RegistrarNominaController.class);
	
    private final RegistrarNominaDao registrarNominaDao;

    public RegistrarNominaController(RegistrarNominaDao registrarNominaDao) {
        this.registrarNominaDao = registrarNominaDao;
    }

   // Consulta de la tabla ctg_nominas para autocompletar la búsqueda de la nómina actual
   	@GetMapping("/consulta/ejercicio")
   	public List<ctg_nominas> autocompletarNomina() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API obtener tabulador actual");
	   		
			return registrarNominaDao.autocompletarNomina();
	   		
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API Obtener Tabulador Actual. FuncionesGeneralesController.ObtenerTabuladorActual." 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API Obtener Tabulador Actual. FuncionesGeneralesController.ObtenerTabuladorActual.", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}

 // Registro para la tabla sn_nominasoperando
    @PostMapping("/registroNomina")
    public boolean registroNomina(@RequestBody sn_nominasoperando registrar) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
   		
        try {
            logger.info(idUsuario + "|Request a la API consulta registrar Nomina");

            return registrarNominaDao.registroNomina(registrar);
            
        } catch (Exception e) {
            logger.info(idUsuario + "|Error en request a la API registrar Nomina. RegistrarNominaController.registra Nomina. "
                    + e.getMessage(), e);
            //e.printStackTrace();
            //throw new RuntimeException("Ocurrió un error al obtener persona por tabla.");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 61, 8, 
    				"Error en request a la API autocompletar usuario persona. UsuarioController.autocompletarUsuarioPersona. ", 
    				ipUsuario, macUsuario);
    		
    		return false;
        }
    }	

	@GetMapping("/consulta/buscarNominaOperando")
   	public List<ctg_nominas> buscarNominasOperando() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API obtener tabulador actual");
	   		
			return registrarNominaDao.buscarNominasOperando();
	   		
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API Obtener Tabulador Actual. FuncionesGeneralesController.ObtenerTabuladorActual." 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API Obtener Tabulador Actual. FuncionesGeneralesController.ObtenerTabuladorActual.", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}

    // Registro para la tabla sn_nominasoperando
    @PostMapping("/bajaNomina")
    public boolean bajaNomina(@RequestBody sn_nominasoperando baja) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
   		
        try {
            logger.info(idUsuario + "|Request a la API consulta baja Nomina");

            return registrarNominaDao.bajaNomina(baja);
            
        } catch (Exception e) {
            logger.info(idUsuario + "|Error en request a la API baja Nomina. RegistrarNominaController. Nomina. "
                    + e.getMessage(), e);
            //e.printStackTrace();
            //throw new RuntimeException("Ocurrió un error al obtener persona por tabla.");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 61, 8, 
    				"Error en request a la API autocompletar usuario persona. UsuarioController.autocompletarUsuarioPersona. ", 
    				ipUsuario, macUsuario);
    		
    		return false;
        }
    }	

	@GetMapping("/periodos")
   	public List<sn_periodosdepago> Periodos() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Request a la API obtener periodo actual");
	   		
			return registrarNominaDao.Periodos();
	   		
		} catch (Exception e) {
			logger.info(idUsuario + "|Error en request a la API Obtener Periodo Actual. RegistrarNominaController.Periodos." 
    				+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
    				"Error en request a la API Obtener Periodo Actual. RegistrarNominaController.Periodos.", 
    				ipUsuario, macUsuario);
    		
    		return new ArrayList<>();
		}
   	}

	// Consulta de la tabla ctg_niveles para autocompletar en la búsqueda
    @PostMapping("/tablaPorPeriodo/{input}")
    public ResponseEntity<Object> gettablaPorPeriodo(@PathVariable("input") Integer input) {
        
        try {
            List<sn_nominasoperando> consultaNivelDetails = registrarNominaDao.tablaPorPeriodo(input);
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

}