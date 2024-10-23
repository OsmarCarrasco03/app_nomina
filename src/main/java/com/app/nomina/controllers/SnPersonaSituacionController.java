package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.services.*;
import org.slf4j.*;
import java.util.*;


@RestController
@RequestMapping("api/empleado")
public class SnPersonaSituacionController {

    Logger logger = LoggerFactory.getLogger(SnPersonaSituacionController.class);

    private final SnPersonaSituacionService service;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;

    public SnPersonaSituacionController(SnPersonaSituacionService service){

        this.service = service;
    }

    @GetMapping("/conSituacion") // api/empleado/conSituacion
    public List<Object[]>findByQueryPersona(){

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");

        try {

             // Falta modificar el numero del modulo y el id de operacion

            logger.info("Se ejecutó com.app.nomina.controllers.SnPersonaSituacionController ");
             auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 3,
                    "Se consulto la informacion de los Empleados",
                    ipUsuario, macUsuario); 

            return service.findByQueryPersona();

        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.controllers.SnPersonaSituacionController: ", e);
            List<Object[]> errorList = new ArrayList<>();
            errorList.add(new Object[] {
                    "La consulta en com.app.nomina.controllers.SnPersonaSituacionController tuvo problemas: " + e });
            return errorList;
        }
        
    }

}
