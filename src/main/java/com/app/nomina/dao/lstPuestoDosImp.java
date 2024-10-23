package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import com.app.nomina.models.ctg_lstpuesto;


@Repository
@Transactional

public class lstPuestoDosImp implements lstPuestoDosDAO{
	
Logger logger = LoggerFactory.getLogger(lstPuestoDosImp.class);
	
	@PersistenceContext
    EntityManager entityManager;
	
	@SuppressWarnings("unchecked")
	
	@Override
	public List<ctg_lstpuesto> lstPuestoDAO() {
		
		List <ctg_lstpuesto> prueba;
		
		String query = "FROM ctg_lstpuesto";	
		prueba = entityManager.createQuery(query).getResultList();
		
		logger.info("Esta es la prueba: " + prueba);
		
		return entityManager.createQuery(query).getResultList();

}

	

	



}


	