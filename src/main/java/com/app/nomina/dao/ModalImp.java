package com.app.nomina.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import com.app.nomina.controllers.modalController;
import com.app.nomina.models.ctg_centrodist;
import com.app.nomina.models.ctg_centrotrabajo;


@Repository
@Transactional
public class ModalImp implements ModalDao {

	@PersistenceContext
	EntityManager entityManager;
	Logger logger = LoggerFactory.getLogger(modalController.class);


	// QUERY PARA OBTENER DATOS CENTRO DE TRABAJO DE ACUEROD A SU CLAVE Y
	// DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_centrotrabajo> obtenerDatosXcentrotrabajo() {
		try {
			String query = "from ctg_centrotrabajo";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por centro de trabajo: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS CENTRO DE TRABAJO DE ACUEROD A SU CLAVE Y
	// DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS CENTRO DE DISTRIBUCIÓN DE ACUEROD A SU CLAVE Y
	// DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_centrotrabajo> obtenerDatosXdistribucion() {
		try {
			String query = "from ctg_centrodist";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por centro de distribucion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS CENTRO DE DISTRIBUCIÓN DE ACUEROD A SU CLAVE Y
	// DESCRIPCIÓN







	@SuppressWarnings("rawtypes")
	public List<ctg_centrotrabajo> obtenerDatosXctratrabajo(ctg_centrotrabajo ctra_estado) {
		try {
			String query = "SELECT ctra_id, ctra_clave, ctra_nombre, ctra_estado, ctra_municipio, ctra_calle, ctra_localidad,ctra_colonia, ctra_numext,ctra_numint, "
					+ "(SELECT edo_nombre FROM ctg_estado WHERE edo_id = ctra_estado) AS estado_desc, "
					+ "(SELECT mun_nombre FROM ctg_municipio WHERE mun_id = ctra_municipio) AS municipio_desc "
					+ "FROM ctg_centrotrabajo " + "WHERE 1 = 1 ";

			if (ctra_estado.getCtra_estado() != null) {
				// Realiza la comparación aquí
				query += " AND ctra_estado = :estadoElegido";
			}

			if (ctra_estado.getCtra_municipio() != null) {
				query += " AND ctra_municipio = :municipioElegida"; // Agregamos la condición de situación
			}

			Query consulta = (Query) entityManager.createQuery(query);

			if (ctra_estado.getCtra_estado() != null) {
				consulta.setParameter("estadoElegido", ctra_estado.getCtra_estado());

			}

			if (ctra_estado.getCtra_municipio() != null) {
				consulta.setParameter("municipioElegida", ctra_estado.getCtra_municipio());
			}
			@SuppressWarnings("unchecked")
			List<ctg_centrotrabajo> descripcion = consulta.getResultList();

			return descripcion;
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por centro de trbajo especificado " + e.getMessage(),
					e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_centrodist> obtenerDatosXcentrodist(ctg_centrodist cdis_estado) {
		try {
			String query = "FROM ctg_centrodist WHERE cdis_estado = :estado"; // Definir la comparación

			List<ctg_centrodist> personas = entityManager.createQuery(query)
					.setParameter("estado", cdis_estado.getCdis_estado()) // Asignamos el valor del estado
					.getResultList();

			logger.info("query resultado " + personas);
			return personas;
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por centro de distribucion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}










}
