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
import com.app.nomina.dao.ctg_bancosDAO;
 
@RestController
@RequestMapping("/api/bancos")
public class ctg_bancosController {
    Logger logger = LoggerFactory.getLogger(ctg_bancosController.class);
    
    //Inicio variables de auditoria
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    //Fin variables de auditoria

    @Autowired
    private ctg_bancosDAO Ctg_bancosDAO;
    
    @GetMapping("/clave/nombre")
    public List<Object[]> listarBancos() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {
            logger.info("Se realizo una consulta en la tabla ctg_bancos, listarBancos()"); 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 48, 2,
            "El idModulo es el modulo_padre ya que se usa en mas de un modulo. Consulta en la tabla ctg_bancos",
            ipUsuario, macUsuario); 
            return Ctg_bancosDAO.listarBancos();
        } catch (Exception e) {
            logger.error("Mensaje"+ e);
            return new ArrayList<>();
        }
    }
    
}