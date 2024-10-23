package com.app.nomina.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.models.*;
import com.app.nomina.services.*;
import org.slf4j.*;
import java.util.*;
import javax.persistence.*;


@RestController
public class sn_cfgpuestoshaController {   
    
    Logger logger = LoggerFactory.getLogger(sn_cfgpuestoshaController.class);

    private final sncfgpuestoshaService servicio;

    @PersistenceContext
    EntityManager entityManager;
	
	@Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    
    public sn_cfgpuestoshaController(sncfgpuestoshaService servicio) {
        this.servicio = servicio;
    }
    
    @PostMapping("api/guardapuestoha")
    public String guardarInfo(@RequestBody sn_cfgpuestosha[] info){

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");

        

        try {
            logger.info("Se ejecutó com.app.nomina.controllers.sn_cfgpuestoshaController ");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 3, 
							"Se modifico la información del puesto", 
							ipUsuario, macUsuario);

            for(sn_cfgpuestosha infoArray : info){          
                servicio.guardaInfo(infoArray);
            } 

            logger.info("El registro fue exitoso");
            return "El registro fue exitoso";

        } catch (Exception e) {

            logger.error("Algo salio mal en com.app.nomina.controllers.sn_cfgpuestoshaController: ", e);
            return "El registro en com.app.nomina.controllers.sn_cfgpuestoshaController tuvo problemas: " +e;

        }                 
        
    }
}
