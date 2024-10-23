package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.models.ctg_agrupamiento;

@Repository
@Transactional
public class lst_agrupamientoImp implements lst_agrupamientoDAO {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")

	@Override
	public List<ctg_agrupamiento> obtenerDatos() {
		String query = "from ctg_agrupamiento";

		return entityManager.createQuery(query).getResultList();
	}

}
