package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.services.sn_ejercicioService;

@RestController
@RequestMapping("api/ejercicio") 
public class sn_ejercicioController { 

    Logger logger = LoggerFactory.getLogger(sn_ejercicioController.class);
	
	private sn_ejercicioService ejercicioService;

     //Inicio variables de auditoria
     @PersistenceContext
     EntityManager entityManager;
 
     @Autowired
     private AuditoriaDao auditoria;
 
     @Autowired
     private SessionController sesion;
     //Fin variables de auditoria 

    @Autowired
    public sn_ejercicioController(sn_ejercicioService ejercicioService) {
        this.ejercicioService = ejercicioService;
    }

    @GetMapping("/anio") // api/ejercicio/anio
    public List<Object[]> snEjercicioApiUno() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try{
            logger.info("Se ejecuto el snEjercicioApiUno en com.app.nomina.controllers > sn_ejercicioController"); 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 76, 2,
            "Se consulto el año con situacion 1 en la tabla sn_ejercicio",
            ipUsuario, macUsuario); 
            return ejercicioService.getAllQueryUnoSnEjercicio();
        } catch(Exception e){
            logger.error("Algo salio mal en com.app.nomina.controllers > sn_ejercicioController: " + e);
            return new ArrayList<>();
        }
    }
    @GetMapping("/id/ejercicio/fechainicio/fechatermino/situacion") // api/ejercicio/id/ejercicio/fechainicio/fechatermino/situacion
    public List<Object[]> snEjercicioApiDos() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try{
            logger.info("Se ejecuto el snEjercicioApiDos en com.app.nomina.controllers > sn_ejercicioController"); 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 75, 2,
            "Se consultaron fechas , id y situacion de los datos en la tabla sn_ejercicio",
            ipUsuario, macUsuario); 
            return ejercicioService.getAllQueryDosSnEjercicio();
        } catch(Exception e){
            logger.error("Algo salio mal en com.app.nomina.controllers > sn_ejercicioController: " + e);
            return new ArrayList<>();
        }
    }
} 