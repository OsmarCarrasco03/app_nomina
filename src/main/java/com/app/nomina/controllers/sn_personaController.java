package com.app.nomina.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.dao.sn_personaDAO;
 
@RestController
@RequestMapping("api/personas")
public class sn_personaController {
    Logger logger = LoggerFactory.getLogger(sn_personaController.class);
    
    @Autowired
    private sn_personaDAO personaDAO;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    
    @GetMapping("/id/curp/nombre/apellidos") // api/personas/id/curp/nombre/apellidos
    public List<Object[]> ApiCtgPersona() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

            sesionUsuario = sesion.sesionUsuario();

            String idUsuario = sesionUsuario.get("idUsuario");
            String ipUsuario = sesionUsuario.get("ipUsuario");
            String macUsuario = sesionUsuario.get("macUsuario");

        try {
            logger.info("Se ejecuto el ApiCtgPersona en com.app.nomina.controllers > sn_personaController"); 
            
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 44, 2,
                    "El idModulo es el mod_padre ya que se usa es mas de 1 modulo, en este caso la API se utiliza en bastantes modulos. Se ejecuto el ApiCtgPersona en com.app.nomina.controllers > sn_personaController",
                    ipUsuario, macUsuario); 
            
            return personaDAO.queryUnoSnPersona();
        } catch (Exception e) {
            logger.error("Algo salio mal en ApiCtgPersona de com.app.nomina.controllers > sn_personaController: " + e);

            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 44, 8,
                    "El idModulo es el mod_padre ya que se usa es mas de 1 modulo, en este caso la API se utiliza en bastantes modulos. Algo salio mal en ApiCtgPersona de com.app.nomina.controllers > sn_personaController",
                    ipUsuario, macUsuario); 

            return new ArrayList<>();
        }
    }
    
    @GetMapping("/id/curp/nombre/apellidos/numempleado") // api/personas/id/curp/nombre/apellidos/numempleado
    public List<Object[]> ApiCtgPersona_AsignarPlaza() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

            sesionUsuario = sesion.sesionUsuario();

            String idUsuario = sesionUsuario.get("idUsuario");
            String ipUsuario = sesionUsuario.get("ipUsuario");
            String macUsuario = sesionUsuario.get("macUsuario");

        try {
            logger.info("Se ejecuto el ApiCtgPersona_AsignarPlaza en com.app.nomina.controllers > sn_personaController"); 

            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 40, 2,
                    "Se ejecuto el ApiCtgPersona_AsignarPlaza en com.app.nomina.controllers > sn_personaController",
                    ipUsuario, macUsuario); 

            return personaDAO.queryDosSnPersona();
        } catch (Exception e) {
            logger.error("Algo salio mal en ApiCtgPersona_AsignarPlaza de com.app.nomina.controllers > sn_personaController: " + e);

            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 40, 8,
                    "Algo salio mal en ApiCtgPersona_AsignarPlaza de com.app.nomina.controllers > sn_personaController",
                    ipUsuario, macUsuario); 

            return new ArrayList<>();
        }
    }
    
}