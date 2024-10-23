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

public class ctg_lstctabanperIMP implements ctg_lstctabanperDAO{
    Logger logger = LoggerFactory.getLogger(ctg_lstctabanperIMP.class);

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> listarTipo() {
        try {
            String query = "SELECT ctal_clave, ctal_descripcion FROM ctg_lstctabanper WHERE ctal_clase='1'";
            logger.info("*****<ctg_bancosIMP> listarTipo*****"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {

            logger.error("Mensaje");

            logger.error("Algo salio mal en com.app.nomina.dao > ctg_bancosIMP listarTipo " + e );

            return new ArrayList<>();
        }
    }

    @Override
    public List<Object[]> listarModopago() {
        try {
            String query = "SELECT ctal_clave, ctal_descripcion FROM ctg_lstctabanper WHERE ctal_clase='2'";
            logger.info("*****<ctg_bancosIMP> listarModopago*****"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {

            logger.error("Mensaje");

            logger.error("Algo salio mal en com.app.nomina.dao > ctg_bancosIMP listarModopago " + e );

            return new ArrayList<>();
        }
    }

    @Override
    public List<Object[]> listarMoneda() {
        try {
            String query = "SELECT ctal_clave, ctal_descripcion FROM ctg_lstctabanper WHERE ctal_clase='3'";
            logger.info("*****<ctg_bancosIMP> listarMoneda*****"); 
            return entityManager.createQuery(query).getResultList();
        } catch (Exception e) {

            logger.error("Mensaje");

            logger.error("Algo salio mal en com.app.nomina.dao > ctg_bancosIMP listarMoneda " + e );

            return new ArrayList<>();
        }
    }

}
