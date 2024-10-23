package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.models.ctg_lstpuesto;

@Repository
@Transactional

public class LstPuestoImp implements LstPuestoDAO {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")

	@Override
	public List<ctg_lstpuesto> obtenerDatos() {
		String query = "from ctg_lstpuesto";
		return entityManager.createQuery(query).getResultList();
	}

}
