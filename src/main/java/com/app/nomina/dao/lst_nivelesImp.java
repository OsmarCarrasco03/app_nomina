package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.models.ctg_niveles;

@Repository
@Transactional
public class lst_nivelesImp implements lst_nivelesDAO {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")

	@Override
	public List<ctg_niveles> obtenerDatos() {
		String query = "FROM ctg_niveles";
		return entityManager.createQuery(query).getResultList();
	}

}
