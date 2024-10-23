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
@RequestMapping("api/dataNom")
public class CtgnominasController {

    Logger logger = LoggerFactory.getLogger(CtgnominasController.class);
    private final CtgnominasService service;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;

    public CtgnominasController(CtgnominasService service) {

        this.service = service;

    }

    @GetMapping("/nominas") // api/dataNom/nominas
    public List<Object[]> findByQueryListNom() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");

        try {
            logger.info("Se ejecutó com.app.nomina.controllers.CtgnominasController ");

            // Falta actualziar el numero del modulo y el id de operacion

            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 3,
                    "Se consulto la informacion de los factores",
                    ipUsuario, macUsuario);
            return service.findByQueryListNom();
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.controllers.CtgnominasController: ", e);
            List<Object[]> errorList = new ArrayList<>();
            errorList.add(new Object[] {
                    "La consulta en com.app.nomina.controllers.CtgnominasController tuvo problemas: " + e });
            return errorList;
        }

    }

}
