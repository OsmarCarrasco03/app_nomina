package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.services.*;
import org.slf4j.*;
import java.util.*;

@RestController
@RequestMapping("api/cptosdenomina")
public class CtgConceptosDeNominaController {

    Logger logger = LoggerFactory.getLogger(CtgConceptosDeNominaController.class);

    private CtgConceptosDeNominaService service;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;

    @Autowired
    public CtgConceptosDeNominaController(CtgConceptosDeNominaService service) {
        this.service = service;

    }

    @GetMapping("/conceptos") // api/cptosdenomina/conceptos
    public List<Object[]> getByQuery() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");

        try {

            // Falta modificar el numero del modulo y el id de operacion

            logger.info("Se ejecutó com.app.nomina.controllers.CtgConceptosDeNominaController ");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 3,
                    "Se consulto la informacion de los conceptos",
                    ipUsuario, macUsuario);
            return service.findByQueryConcepto();
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.controllers.CtgConceptosDeNominaController: ", e);
            List<Object[]> errorList = new ArrayList<>();
            errorList.add(new Object[] {
                    "La consulta en com.app.nomina.controllers.CtgConceptosDeNominaController tuvo problemas: " + e });
            return errorList;
        }

    }

    @GetMapping("/conceptosAnt") // api/cptosdenomina/conceptosAnt
    public List<Object[]> getByQueryAnt() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");

        try {

            // logger.info("Se ejecutó com.app.nomina.controllers.CtgConceptosDeNominaController ");
            // auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 3,
            //         "Se consulto la informacion de los conceptos antecedentes",
            //         ipUsuario, macUsuario);

            return service.findByQueryConceptoAnt();

        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.controllers.CtgConceptosDeNominaController: ", e);
            List<Object[]> errorList = new ArrayList<>();
            errorList.add(new Object[] {
                    "La consulta en com.app.nomina.controllers.CtgConceptosDeNominaController tuvo problemas en conceptps Antecedentes: " + e });
            return errorList;
        }

    }

}
