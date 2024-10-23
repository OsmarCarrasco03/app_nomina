package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

import com.app.nomina.services.ctgHistoricoPlazaRepository;
import com.app.nomina.services.ctgHistoricoPlazaService;

import scala.Int;

@RestController
public class ctgHistoricoPlazaController {
    
    Logger logger = LoggerFactory.getLogger(ctgHistoricoPlazaController.class);

    // @Autowired
    // private ctgHistoricoPlazaRepository HistoricoPlazaRepository;

    @Autowired
    private ctgHistoricoPlazaService HistoricoPlazaService;

    //Inicio variables de auditoria
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    //Fin variables de auditoria

    // INICIO API para buscar datos de la plaza
    @GetMapping("api/consulta/HistoricoPlaza/{input}")
    public ResponseEntity<List<Object[]>> getHistoricoPlaza(@PathVariable Integer  input) {
  
        try {
            List<Object[]> consultadatosPlaza = HistoricoPlazaService.getallfindbydatosplaza(input);
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
    // FIN API para buscar datos de la plaza

    // INICIO API para buscar datos de el puesto
    @GetMapping("api/consulta/HistoricoPuesto/{input}")
    public ResponseEntity<List<Object[]>> getHistoricoPuesto(@PathVariable Integer  input) {
  
        try {
            List<Object[]> consultadatosPuesto = HistoricoPlazaService.getallfindbydatospuesto(input);
            if (consultadatosPuesto.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos del puesto historico se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultadatosPuesto);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    // FIN API para buscar datos de el puesto


    //HISTORICA
    // INICIO API Obtener las personas que han tenido esa plaza
    @GetMapping("api/consulta/HistoricoPersonaPlaza/{input}")
    public ResponseEntity<List<Object[]>> getHistoricoPersonasPorPlaza(@PathVariable Integer  input) {
  
        try {
            List<Object[]> consultadatosPersonaPlaza = HistoricoPlazaService.getallfindbydatospersonasporplazaha(input);
            if (consultadatosPersonaPlaza.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos de persona plaza historico se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultadatosPersonaPlaza);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    // FIN API Obtener las personas que han tenido esa plaza
    
    //ACTUAL
    // INICIO API Obtener la persona con esta plaza actualmente
    @GetMapping("api/consulta/ActualPersonaPlaza/{input}")
    public ResponseEntity<List<Object[]>> getActualPersonaPorPlaza(@PathVariable Integer  input) {
  
        try {
            List<Object[]> consultadatosPersonaPlaza = HistoricoPlazaService.getallfindbydatospersonasporplaza(input);
            if (consultadatosPersonaPlaza.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos de persona plaza se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultadatosPersonaPlaza);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    // FIN API Obtener la persona con esta plaza actualmente
    



    //HISTORICA
    // INICIO API para buscar las plazas que ha tenido una persona
    @GetMapping("api/consulta/HistoricoPlazasPorPersona/{input}")
    public ResponseEntity<List<Object[]>> getHistoricoPlazasPorPersona(@PathVariable Integer  input) {
  
        try {
            List<Object[]> consultadatosPlazasPorPersona = HistoricoPlazaService.getallfindbydatosplazasporpersonaha(input);
            if (consultadatosPlazasPorPersona.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos de PlazasPorPersona historico se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultadatosPlazasPorPersona);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    // FIN API para buscar las plazas que ha tenido una persona

    //ACTUAL
    // INICIO API para buscar la plaza actual de una persona
    @GetMapping("api/consulta/ActualPlazasPorPersona/{input}")
    public ResponseEntity<List<Object[]>> getActualPlazasPorPersona(@PathVariable Integer  input) {
  
        try {
            List<Object[]> consultadatosPlazasPorPersona = HistoricoPlazaService.getallfindbydatosplazasporpersona(input);
            if (consultadatosPlazasPorPersona.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos de PlazasPorPersona actual se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultadatosPlazasPorPersona);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
            // return
            // ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
    // FIN API para buscar la plaza actual de una persona





     // INICIO API para obtener todos los datos del empleado
     @GetMapping("api/consulta/datosEmpleado/{input}")
     public ResponseEntity<List<Object[]>> getdatosEmpleado(@PathVariable Integer  input) {
   
         try {
             List<Object[]> consultadatosEmpleado = HistoricoPlazaService.getdatosempleados(input);
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
     // FIN API para obtener todos los datos del empleado



}
