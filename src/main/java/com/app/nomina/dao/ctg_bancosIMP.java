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

public class ctg_bancosIMP implements ctg_bancosDAO{
    Logger logger = LoggerFactory.getLogger(ctg_bancosIMP.class);

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> listarBancos() {
        try {
            String query = "SELECT ban_clave, ban_nombre FROM ctg_bancos";
            logger.info("*****ctg_bancosIMP*****"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {

            logger.error("Mensaje");

            logger.error("Algo salio mal en com.app.nomina.dao > ctg_bancosIMP: " + e );

            return new ArrayList<>();
        }
        
        
    }
}
