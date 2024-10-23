package com.app.nomina.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class sn_personaIMP implements sn_personaDAO {

    Logger logger = LoggerFactory.getLogger(sn_personaIMP.class);

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> queryUnoSnPersona() {
        try {
            String query = "SELECT per_id, per_curp, per_nombre, per_appaterno, per_apmaterno FROM sn_persona";
            logger.info("Se ejecuto el queryUnoSnPersona en com.app.nomina.dao > sn_personaIMP\"); \n" + //
                                "            return entityManager.createQuery(quernoSnPersona en com.app.nomina.dao > sn_personaIMP"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.dao > sn_personaIMP: " + e );
            return new ArrayList<>();
        }
    }
    
    @Override
    public List<Object[]> queryDosSnPersona() {
        try {
            String query = "SELECT per_id, per_curp, per_nombre, per_appaterno, per_apmaterno, per_numempleado FROM sn_persona";
            logger.info("Se ejecuto el queryUnoSnPersona en com.app.nomina.dao > sn_personaIMP"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.dao > sn_personaIMP: " + e );
            return new ArrayList<>();
        }
    }
}