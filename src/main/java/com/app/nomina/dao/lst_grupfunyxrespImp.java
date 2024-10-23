package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.models.ctg_grupfunyxresp;

@Repository
@Transactional

public class lst_grupfunyxrespImp implements lst_grupfunyxrespDAO {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")

	@Override

	/*
	 * public List<ctg_grupfunyxresp> obtenerDatos() { String query =
	 * "select lgrup_descripcion from ctg_grupfunyxresp where lgrup_tipopuesto = 1";
	 * return entityManager.createQuery(query).getResultList(); }
	 */
	public List<ctg_grupfunyxresp> obtenerDatos() {
		String query = "from ctg_grupfunyxresp";

		return entityManager.createQuery(query).getResultList();
	}

}// String query = "select c.lgrup_descripcion from ctg_grupfunyxresp c where
	// c.lgrup_tipopuesto = 1";
