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
import com.app.nomina.dao.ctg_lstctabanperDAO;

@RestController
@RequestMapping("api/ctg_lstctabanper")
public class ctg_lstctabanperController {
    Logger logger = LoggerFactory.getLogger(ctg_lstctabanperController.class);
    
    @Autowired
    private ctg_lstctabanperDAO Ctg_lstctabanper;

    //Inicio variables de auditoria
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    //Fin variables de auditoria 
    
    @GetMapping("/tipo/clave/descripcion")
    public List<Object[]> listarTipo() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {
            logger.info("Se realizo una consulta en la tabla ctg_lstctabanper,listarTipo()"); 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 48, 2,
            "El idModulo es el modulo_padre ya que se usa en mas de un modulo. Consulta en la tabla ctg_lstctabanper",
            ipUsuario, macUsuario); 
            return Ctg_lstctabanper.listarTipo();
        } catch (Exception e) {
            logger.error("Mensaje"+ e);
            return new ArrayList<>();
        }
    }

    @GetMapping("/modopago/clave/descripcion")
    public List<Object[]> listarModopago() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {
            logger.info("Se realizo una consulta en la tabla ctg_lstctabanper, listarModopago()"); 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 48, 2,
            "El idModulo es el modulo_padre ya que se usa en mas de un modulo. Consulta en la tabla ctg_lstctabanper",
            ipUsuario, macUsuario);  
            return Ctg_lstctabanper.listarModopago();
        } catch (Exception e) {
            logger.error("Mensaje"+ e);
            return new ArrayList<>();
        }
    }

    @GetMapping("/moneda/clave/descripcion")
    public List<Object[]> listarMoneda() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {
            logger.info("Se realizo una consulta en la tabla ctg_lstctabanper,listarMoneda()"); 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 48, 2,
            "El idModulo es el modulo_padre ya que se usa en mas de un modulo. Consulta en la tabla ctg_lstctabanper",
            ipUsuario, macUsuario);  
            return Ctg_lstctabanper.listarMoneda();
        } catch (Exception e) {
            logger.error("Mensaje"+ e);
            return new ArrayList<>();
        }
    }
    
}