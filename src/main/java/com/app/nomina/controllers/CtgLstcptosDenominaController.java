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
@RequestMapping("api/lstcptosdenomina") // api/lstcptosdenomina/tipoconcepto
public class CtgLstcptosDenominaController {

    Logger logger = LoggerFactory.getLogger(CtgLstcptosDenominaController.class);

    private final CtgLstcptosDenominaService service;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;

    @Autowired
    public CtgLstcptosDenominaController(CtgLstcptosDenominaService service) {
        this.service = service;
    }

    @GetMapping("/tipoconcepto")
    public List<Object[]> getByQuery() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");

        try {

            // Falta actualizar el numero del modulo y el id de operacion

            logger.info("Se ejecutó com.app.nomina.controllers.CtgLstcptosDenominaController ");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 3,
                    "Se consulto la informacion de los tipos de conceptos",
                    ipUsuario, macUsuario);
            return service.findByQuery();

        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.controllers.CtgLstcptosDenominaController: ", e);
            List<Object[]> errorList = new ArrayList<>();
            errorList.add(new Object[] {
                    "La consulta en com.app.nomina.controllers.CtgLstcptosDenominaController tuvo problemas: " + e });
            return errorList;
        }

    }
}
