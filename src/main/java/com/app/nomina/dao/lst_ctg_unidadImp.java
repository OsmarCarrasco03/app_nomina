package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.models.ctg_unidad;

@Repository
@Transactional

public class lst_ctg_unidadImp implements lst_ctg_unidadDAO {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")

	@Override
	public List<ctg_unidad> obtenerDatosUnidad() {
		String query = "from ctg_unidad";

		return entityManager.createQuery(query).getResultList();

	}

}
