package com.app.nomina.controllers;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.HashMap;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.services.snNumeroPlazaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/numero_plaza")  //api/numero_plaza/numerosPlaza
public class snNumeroPlazaController {
    Logger logger = LoggerFactory.getLogger(snNumeroPlazaController.class);

    private final snNumeroPlazaService SnNumeroPlazaService;

    public snNumeroPlazaController(snNumeroPlazaService SnNumeroPlazaService) {
        this.SnNumeroPlazaService = SnNumeroPlazaService;
    }

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;

    @GetMapping("/numerosPlaza")
    public List<Integer> getNumeroPlaza() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

            sesionUsuario = sesion.sesionUsuario();

            String idUsuario = sesionUsuario.get("idUsuario");
            String ipUsuario = sesionUsuario.get("ipUsuario");
            String macUsuario = sesionUsuario.get("macUsuario");

        try{

            logger.info("Se ejecuto el getNumeroPlaza de com.app.nomina.controllers > snNumeroPlazaController");
            
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 39, 2,
            "El idModulo es el mod_padre ya que se usa es mas de 1 modulo. Se ejecuto el getNumeroPlaza de com.app.nomina.controllers > snNumeroPlazaController",
            ipUsuario, macUsuario); 
            
            return SnNumeroPlazaService.getAllNumeroPlazaData();

        }catch(Exception e){

            logger.info("Algo salio mal en getNumeroPlaza de com.app.nomina.controllers > snNumeroPlazaController");
            
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 39, 8,
            "El idModulo es el mod_padre ya que se usa es mas de 1 modulo. Algo salio mal en getNumeroPlaza de com.app.nomina.controllers > snNumeroPlazaController",
            ipUsuario, macUsuario); 
            
            return new ArrayList<>();
        }
        
    }

    @GetMapping("/id/numerosPlaza") // api/numero_plaza/id/numerosPlaza
    public List<Object[]> getNumeroIdPlaza() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

            sesionUsuario = sesion.sesionUsuario();

            String idUsuario = sesionUsuario.get("idUsuario");
            String ipUsuario = sesionUsuario.get("ipUsuario");
            String macUsuario = sesionUsuario.get("macUsuario");

         try { 
            logger.info("Se ejecuto el getNumeroIdPlaza de com.app.nomina.controllers > snNumeroPlazaController"); 
            
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 39, 2,
                    "El idModulo es el mod_padre ya que se usa es mas de 1 modulo. Se ejecuto el getNumeroIdPlaza de com.app.nomina.controllers > snNumeroPlazaController",
                    ipUsuario, macUsuario); 
            
            return SnNumeroPlazaService.getNumeroIdPlaza();
         } catch (Exception e) {
             logger.error("Algo salio mal en getNumeroIdPlaza de com.app.nomina.controllers > snNumeroPlazaController: " + e);
             
             auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 39, 8,
             "El idModulo es el mod_padre ya que se usa es mas de 1 modulo. Algo salio mal en getNumeroIdPlaza de com.app.nomina.controllers > snNumeroPlazaController",
             ipUsuario, macUsuario); 
             
             return new ArrayList<>();
         } 
    }

}
