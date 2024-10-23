package com.app.nomina.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.app.nomina.controllers.IndexController;


import com.app.nomina.models.ctg_puesto;
import com.app.nomina.models.ctg_lstpuesto;


@Repository
@Transactional
public class RegistroPuestoImp implements RegistroPuestoDao {

	@PersistenceContext
	EntityManager entityManager;
	Logger logger = LoggerFactory.getLogger(IndexController.class);

	

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpuesto> obtenerTipoPuesto() {
		try {
			String query = "from ctg_lstpuesto where lpto_clase = 1 ";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por tipo puesto: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}



	@Override
	public boolean registroPuesto(ctg_puesto puesto) {
		try {
			// Verificar si el código ya existe
			if (codigoExiste(puesto.getCtgp_codigo())) {
				logger.warn("El código de puesto ya existe: " + puesto.getCtgp_codigo());
				return false; // Retorna false indicando que no se pudo registrar el puesto
			}
	
			String query = "INSERT INTO ctg_puesto (ctgp_codigo, ctgp_descripcion, ctgp_tipo, ctgp_fechainicio, ctgp_usucapturo, ctgp_fechamod, ctgp_usumodifico, ctgp_situacion) "
						 + "VALUES (:ctgp_codigo, :ctgp_descripcion, :ctgp_tipo, :ctgp_fechainicio, :ctgp_usucapturo, :ctgp_fechamod, :ctgp_usumodifico, :ctgp_situacion)";
			
			int filasAfectadas = entityManager.createNativeQuery(query)
					.setParameter("ctgp_codigo", puesto.getCtgp_codigo())
					.setParameter("ctgp_descripcion", puesto.getCtgp_descripcion())
					.setParameter("ctgp_tipo", puesto.getCtgp_tipo())
					.setParameter("ctgp_fechainicio", puesto.getCtgp_fechainicio())
					.setParameter("ctgp_usucapturo", puesto.getCtgp_usucapturo())
					.setParameter("ctgp_fechamod", puesto.getCtgp_fechamod())
					.setParameter("ctgp_usumodifico", puesto.getCtgp_usumodifico())
					.setParameter("ctgp_situacion", puesto.getCtgp_situacion())
					.executeUpdate();
	
			return filasAfectadas > 0;
		} catch (Exception e) {
			logger.error("Error al registrar puesto : " + e.getMessage(), e);
			return false;
		}
	}
	


@Override
	public boolean codigoExiste(String codigo) {
		try {
			String query = "SELECT COUNT(*) FROM ctg_puesto WHERE ctgp_codigo = :codigo";
			Long count = entityManager.createQuery(query, Long.class).setParameter("codigo", codigo).getSingleResult();

			return count > 0; // Retorna true si el CURP existe, false si no existe
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta si el codigo existe: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}


	
	@Override
	public List<ctg_puesto> obtenerDatosXcodigoPuesto(String codigoPuesto) {
		try {
			String query = "FROM ctg_puesto WHERE ctgp_codigo = :codigo";
			return entityManager.createQuery(query, ctg_puesto.class)
					.setParameter("codigo", codigoPuesto)  // Asigna el valor del parámetro 'codigoPuesto' a ':codigo'
					.getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por código: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> obtenerDatosctg_lstpuesto() {
		String query ="SELECT ctgp_id, ctgp_codigo, ctgp_descripcion,ctgp_fechainicio, ctgp_fechatermino, ctgp_usucapturo, ctgp_fechamod, ctgp_usumodifico, ctgp_situacion, ctgp_tipo,\n" + //
						"(SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 1 AND lpto_clave = ctgp_tipo) AS tipo_desc,\n" + //
						"(SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 8 AND lpto_clave = ctgp_situacion) AS situ_desc,\n" + //
						"(SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usucapturo) AS alias_capturo,\n" + //
						"(SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usumodifico) AS alias_modifico\n" + //
						"FROM ctg_puesto\t";
		
		return entityManager.createNativeQuery(query).getResultList();
	}




@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpuesto> obtenerSituPuesto() {
		try {
			String query = "from ctg_lstpuesto where lpto_clase = 8 ";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por tipo puesto: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}




// QUERY PARA ACTUALIZAR LOS DATOS DEL PUESTO
public boolean actualizarPuesto(ctg_puesto puesto) {
	logger.info("ACTUALIZACION DE DATOS DEL PUESTO");
	try {
		logger.info("Iniciando el proceso de actualización de datos...");

		if (puesto.getCtgp_fechatermino() == null) {
			return ejecutarPrimeraConsulta(puesto);
		} else {
			return ejecutarSegundaConsulta(puesto);
		}
	} catch (Exception e) {
		logger.error("Error al actualizar datos", e);
		return false;
	}
}


private boolean ejecutarPrimeraConsulta(ctg_puesto puesto) {
	try {
		logger.info("Entrando a la primera consulta...");
		String query = "UPDATE ctg_puesto SET "
		             + "ctgp_codigo = :ctgp_codigo, "
		             + "ctgp_descripcion = :ctgp_descripcion, "
					 + "ctgp_fechainicio = :ctgp_fechainicio, "
					 + "ctgp_fechamod = :ctgp_fechamod, "
					 + "ctgp_situacion = :ctgp_situacion, "
					 + "ctgp_tipo = :ctgp_tipo, "
					 + "ctgp_usucapturo = :ctgp_usucapturo, "
					 + "ctgp_usumodifico = :ctgp_usumodifico "
					 + "WHERE ctgp_id = :ctgp_id";

		int filasAfectadas = entityManager.createNativeQuery(query)
			.setParameter("ctgp_codigo", puesto.getCtgp_codigo())
			.setParameter("ctgp_descripcion", puesto.getCtgp_descripcion())
			.setParameter("ctgp_fechainicio", puesto.getCtgp_fechainicio())
			.setParameter("ctgp_fechamod", puesto.getCtgp_fechamod())
			.setParameter("ctgp_situacion", puesto.getCtgp_situacion())
			.setParameter("ctgp_tipo", puesto.getCtgp_tipo())
			.setParameter("ctgp_usucapturo", puesto.getCtgp_usucapturo())
			.setParameter("ctgp_usumodifico", puesto.getCtgp_usumodifico())
			
		
			.setParameter("ctgp_id", puesto.getCtgp_id())
			.executeUpdate();

		logger.info("Filas afectadas en la primera consulta: " + filasAfectadas);

		return filasAfectadas > 0;
	} catch (Exception e) {
		logger.error("Error al ejecutar la actualización de datos sin fecha baja: " + e.getMessage(), e);
		throw new RuntimeException("Error al ejecutar la consulta", e);
	}
}

private boolean ejecutarSegundaConsulta(ctg_puesto puesto) {
	try {
		logger.info("Entrando a la segunda consulta...");
		String query = "UPDATE ctg_puesto SET "
					 + "ctgp_descripcion = :ctgp_descripcion, "
					 + "ctgp_tipo = :ctgp_tipo, "
					 + "ctgp_fechainicio = :ctgp_fechainicio, "
					 + "ctgp_fechatermino = :ctgp_fechatermino, "
					 + "ctgp_usucapturo = :ctgp_usucapturo, "
					 + "ctgp_fechamod = :ctgp_fechamod, "
					 + "ctgp_usumodifico = :ctgp_usumodifico, "
					 + "ctgp_situacion = :ctgp_situacion "
					 + "WHERE ctgp_codigo = :ctgp_codigo";

		int filasAfectadas = entityManager.createNativeQuery(query)
			.setParameter("ctgp_codigo", puesto.getCtgp_codigo())
			.setParameter("ctgp_descripcion", puesto.getCtgp_descripcion())
			.setParameter("ctgp_tipo",puesto.getCtgp_tipo())
			.setParameter("ctgp_fechainicio",puesto.getCtgp_fechainicio())
			.setParameter("ctgp_fechatermino", puesto.getCtgp_fechatermino())
			.setParameter("ctgp_usucapturo", puesto.getCtgp_usucapturo())
			.setParameter("ctgp_fechamod", puesto.getCtgp_fechamod())
			.setParameter("ctgp_usumodifico", puesto.getCtgp_usumodifico())
			.setParameter("ctgp_situacion", puesto.getCtgp_situacion())
			.executeUpdate();

		if (puesto.getCtgp_fechatermino() != null) {
			String segundaConsulta = "UPDATE ctg_puesto SET ctgp_fechatermino = NULL " +
									 "WHERE ctgp_fechatermino = :ctgp_fechatermino " +
									 "AND ctgp_situacion = 1";
			int filasAfectadasSegundaConsulta = entityManager.createNativeQuery(segundaConsulta)
				.setParameter("ctgp_fechatermino", puesto.getCtgp_fechatermino())
				.executeUpdate();
			// Manejar el resultado de la segunda consulta si es necesario
		}

		logger.info("Filas afectadas en la segunda consulta: " + filasAfectadas);

		return filasAfectadas > 0;
	} catch (Exception e) {
		logger.error("Error al ejecutar la actualización de datos con fecha baja: " + e.getMessage(), e);
		throw new RuntimeException("Error al ejecutar la consulta", e);
	}
}
			
}	