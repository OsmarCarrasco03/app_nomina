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
public class ctg_estadoIMP implements ctg_estadoDAO {

    Logger logger = LoggerFactory.getLogger(ctg_estadoIMP.class);

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> queryUnoCtgEstado() {
        try {
            String query = "SELECT edo_id, edo_nombre FROM ctg_estado";
            logger.info("Se ejecuto el queryUnoCtgEstado en com.app.nomina.dao > ctg_estadoIMP"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.dao > ctg_estadoIMP: " + e);
            return new ArrayList<>();
        }
    }
}