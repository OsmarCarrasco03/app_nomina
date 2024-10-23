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
public class ctg_municipioIMP implements ctg_municipioDAO {

    Logger logger = LoggerFactory.getLogger(ctg_municipioIMP.class);

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> queryUnoCtgMunicipio() {
        try {
            String query = "SELECT mun_numero, mun_edopadre, mun_nombre FROM ctg_municipio";
            logger.info("Se ejecuto el queryUnoCtgMunicipio en com.app.nomina.dao > ctg_municipioIMP"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.dao > ctg_municipioIMP: " + e );
            return new ArrayList<>();
        }
    }
}