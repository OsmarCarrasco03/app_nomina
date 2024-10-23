package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.models.ctg_lstplaza;

@Repository
@Transactional

public class lst_ctglstplazaImp implements lst_ctglstplazaDAO {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")

	@Override
	public List<ctg_lstplaza> listarPlaza() {
		String query = "from ctg_lstplaza";
		return entityManager.createQuery(query).getResultList();
	}

}
