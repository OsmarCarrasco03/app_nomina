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
import com.app.nomina.dao.ctg_municipioDAO;

@RestController
@RequestMapping("api/municipio")
public class ctg_municipioController {
    Logger logger = LoggerFactory.getLogger(ctg_municipioController.class);
    
    @Autowired
    private ctg_municipioDAO municipioDAO;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    
    @GetMapping("/numero/edopadre/nombre") // api/municipio/numero/edopadre/nombre
    public List<Object[]> ApiCtgMunicipio() {

        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

            sesionUsuario = sesion.sesionUsuario();

            String idUsuario = sesionUsuario.get("idUsuario");
            String ipUsuario = sesionUsuario.get("ipUsuario");
            String macUsuario = sesionUsuario.get("macUsuario");

        try {
            logger.info("Se ejecuto el ApiCtgMunicipio en com.app.nomina.controllers > ctg_municipioController"); 

            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 44, 2,
            "El idModulo es el mod_padre ya que se usa es mas de 1 modulo, en este caso los modulos hijos son 45 y 47. Se ejecuto el ApiCtgMunicipio en com.app.nomina.controllers > ctg_municipioController",
            ipUsuario, macUsuario);

            return municipioDAO.queryUnoCtgMunicipio();
        } catch (Exception e) {
            logger.error("Algo salio mal en ApiCtgMunicipio de com.app.nomina.controllers > ctg_municipioController: " + e);

            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 44, 8,
            "El idModulo es el mod_padre ya que se usa es mas de 1 modulo, en este caso los modulos hijos son 45 y 47. Algo salio mal en ApiCtgMunicipio de com.app.nomina.controllers > ctg_municipioController",
            ipUsuario, macUsuario);

            return new ArrayList<>();
        }
    }
}