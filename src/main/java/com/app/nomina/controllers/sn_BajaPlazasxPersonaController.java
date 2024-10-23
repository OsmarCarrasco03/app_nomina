package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.models.*;

import com.app.nomina.services.sn_BajaPlazasxPersonaRepository;
import com.app.nomina.services.sn_BajaPlazasxPersonaService;

import scala.Int;

@RestController
public class sn_BajaPlazasxPersonaController {
    
    Logger logger = LoggerFactory.getLogger(sn_BajaPlazasxPersonaController.class);

    // @Autowired
    // private ctgHistoricoPlazaRepository HistoricoPlazaRepository;

    @Autowired
    private sn_BajaPlazasxPersonaService BajaPlazasxPersonaService;

    //Inicio variables de auditoria
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    //Fin variables de auditoria

    // INICIO API para insertar los datos de la tabla sn_plazapersona a sn_plazapersonaha
    @PostMapping("api/insertar/snplazapersonaha/{input1}/{input2}")
    public ResponseEntity<List<Object[]>> insertdatasnplazapersonaha(@PathVariable Integer  input1, @PathVariable Integer  input2) {
  
        try {
            List<Object[]> consultadatosPlaza = BajaPlazasxPersonaService.getallinsertdatasnplazapersonaha(input1, input2);
            if (consultadatosPlaza.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos del plaza historico se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultadatosPlaza);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    // FIN API para insertar los datos de la tabla sn_plazapersona a sn_plazapersonaha

   // INICIO API para insertar fechatermino a sn_plazapersonaha
   @PostMapping("api/insertarfechatermino/snplazapersonaha/{input1}/{input2}/{fecha}")
   public ResponseEntity<List<Object[]>> fechaterminosnplazapersonaha(@PathVariable Integer  input1, @PathVariable Integer  input2, @PathVariable Date fecha) {
 
       try {
           List<Object[]> consultadatosPlaza = BajaPlazasxPersonaService.getallfechaterminosnplazapersonaha(input1, input2, fecha);
           if (consultadatosPlaza.isEmpty()) {
               logger.info("No existen datos");
               return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
           }
           logger.info("Los datos del plaza historico se obtuvieron satisfactoriamente");
           return ResponseEntity.ok(consultadatosPlaza);
       } catch (Exception e) {
           logger.error("Algo salio mal en la comunicación con el servidor" + e);
           // return
           // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
       }
   }
   // FIN API para insertar fechatermino a sn_plazapersonaha

   // INICIO API para actualizar el plz_estatusocup a 2 en sn_plaza
   @PostMapping("api/actualizarestatusocupado/snplaza/{input1}")
   public ResponseEntity<List<Object[]>> actualizarestatusocupado(@PathVariable Integer  input1) {
 
       try {
           List<Object[]> consultadatosPlaza = BajaPlazasxPersonaService.getallactualizarestatusocupado(input1);
           if (consultadatosPlaza.isEmpty()) {
               logger.info("No existen datos");
               return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
           }
           logger.info("Los datos del plaza historico se obtuvieron satisfactoriamente");
           return ResponseEntity.ok(consultadatosPlaza);
       } catch (Exception e) {
           logger.error("Algo salio mal en la comunicación con el servidor" + e);
           // return
           // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
       }
   }
   // FIN API para actualizar el plz_estatusocup a 2 en sn_plaza




    // INICIO API para borrar las plazas de sn_plazapersona que ya fueron pasadas a sn_plazapersonaha
    @PostMapping("api/borrar/snplazapersona/{input1}/{input2}")
    public ResponseEntity<List<Object[]>> deletedatasnplazapersona(@PathVariable Integer  input1, @PathVariable Integer  input2) {
  
        try {
            List<Object[]> consultadatosEmpleado = BajaPlazasxPersonaService.getalldeletedatasnplazapersona(input1, input2);
            if (consultadatosEmpleado.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos de datosEmpleado se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultadatosEmpleado);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    // FIN API para borrar las plazas de sn_plazapersona que ya fueron pasadas a sn_plazapersonaha

}
