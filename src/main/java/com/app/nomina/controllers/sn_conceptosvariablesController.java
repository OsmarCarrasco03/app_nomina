package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.dao.FuncionesGeneralesDaoImp;
import com.app.nomina.models.*;
import com.app.nomina.services.*;
import com.fasterxml.jackson.databind.JsonNode;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.*;
import java.util.*;
import javax.persistence.*;

@RestController
public class sn_conceptosvariablesController {

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;

    private final sn_conceptosvariablesService service;

    FuncionesGeneralesDaoImp fungendaoimp;

    Logger logger = LoggerFactory.getLogger(sn_conceptosvariablesController.class);

    public sn_conceptosvariablesController(FuncionesGeneralesDaoImp fungendaoimp, sn_conceptosvariablesService service) {
        this.service = service;
        this.fungendaoimp = fungendaoimp;
    }

    

    @PostMapping("api/guardaconceptoVar")
    public ResponseEntity<String> guardarInfo(@RequestBody sn_conceptosvariables[] info) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
        sesionUsuario = sesion.sesionUsuario();
        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");

        try {
            logger.info("Se ejecutó com.app.nomina.controllers.sn_conceptosvariablesController ");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 3,
                    "Se guardo la nueva informacion de los conceptos variables", ipUsuario, macUsuario);

            for (sn_conceptosvariables infoArray : info) {
                service.guardaInfo(infoArray);
            }
            return ResponseEntity.ok("El registro fue exitoso");
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.controllers.sn_conceptosvariablesController: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Hubo un problema con el registro: " + e.getMessage());
        }
    }

    @PostMapping("api/consultarConceptoVar/{idPersona}")
    public ResponseEntity<List<Object[]>> consultarInfo(@PathVariable Integer idPersona) {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();
        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");

        // Actualizar el numero de modulo que se esta utilizando

        /*
         * auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 24, 4,
         * "Se consultó la información de los conceptos variables", ipUsuario,
         * macUsuario);
         * 
         * logger.
         * info("Se ejecutó com.app.nomina.controllers.sn_conceptosvariablesController  consultarConceptoVar"
         * );
         */
        try {
            List<Object[]> results = service.findAllDate(fungendaoimp.TabuladorActualNUmero(), idPersona);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            logger.error(
                    "Algo salio mal en com.app.nomina.controllers.sn_conceptosvariablesController consultarConceptoVar: ",
                    e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("api/actualizaDatosConVar/{idRegistro}")
    public String guardarDatos(@RequestBody JsonNode newData, @PathVariable int idRegistro) {

        service.ActualizaInfo(newData, idRegistro);

        return "Datos actualizados exitosamente";
    }
}
