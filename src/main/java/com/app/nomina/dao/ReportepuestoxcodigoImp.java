package com.app.nomina.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.app.nomina.controllers.IndexController;
import com.app.nomina.models.ctg_puesto;
import com.app.nomina.models.ctg_lstpuesto;


@Repository
@Transactional
public class ReportepuestoxcodigoImp implements ReportepuestoxcodigoDao {

	@PersistenceContext
	EntityManager entityManager;
	Logger logger = LoggerFactory.getLogger(IndexController.class);

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpuesto> obtenerTipoPuestoreporte() {
		try {
			String query = "from ctg_lstpuesto where lpto_clase = 1 ";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por tipo puesto: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	
	
	
	
	
	
	
	
	

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> obtenerCodigos() {
		try {
			String query = "SELECT ctgp_codigo FROM ctg_puesto";
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de códigos de ctg_puesto: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	// @SuppressWarnings("unchecked")
	// @Override
	// public List<ctg_puesto> obtenerDatosctgReporte(ctg_puesto puesto) {
	// String query ="SELECT ctgp_id, ctgp_codigo,
	// ctgp_descripcion,ctgp_fechainicio, ctgp_fechatermino, ctgp_usucapturo,
	// ctgp_fechamod, ctgp_usumodifico, ctgp_situacion, ctgp_tipo,\n" + //
	// "(SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 1 AND
	// lpto_clave = ctgp_tipo) AS tipo_desc,\n" + //
	// "(SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 8 AND
	// lpto_clave = ctgp_situacion) AS situ_desc,\n" + //
	// "(SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usucapturo) AS
	// alias_capturo,\n" + //
	// "(SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usumodifico) AS
	// alias_modifico\n" + //
	// "FROM ctg_puesto\t";

	// return entityManager.createNativeQuery(query).getResultList();
	// }

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpuesto> obtenerSituPuestoReporte() {
		try {
			String query = "from ctg_lstpuesto where lpto_clase = 8 ";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por tipo puesto: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<ctg_puesto> obtenerDatosctgReporte(ctg_puesto eleccion) {

		try {
			String query = "SELECT ctgp_id, ctgp_codigo, ctgp_descripcion, ctgp_fechainicio, ctgp_fechatermino, ctgp_usucapturo, ctgp_fechamod, ctgp_usumodifico, ctgp_situacion, ctgp_tipo,\n"
					+
					"(SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 1 AND lpto_clave = ctgp_tipo) AS tipo_desc,\n"
					+
					"(SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 8 AND lpto_clave = ctgp_situacion) AS situ_desc,\n"
					+
					"(SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usucapturo) AS alias_capturo,\n" +
					"(SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usumodifico) AS alias_modifico\n" +
					"FROM ctg_puesto WHERE 1 = 1"; // Agrega espacio en blanco después de la cláusula FROM y antes de
													// WHERE

			if (eleccion.getCtgp_codigo() != null) {
				query += " AND ctgp_codigo LIKE :codigoElegido"; // Espacio en blanco agregado antes de la nueva
																	// condición
			}

			if (eleccion.getCtgp_descripcion() != null) {
				query += " AND ctgp_descripcion LIKE :descripcionElegido"; // Espacio en blanco agregado antes de la
																			// nueva condición
			}

			if (eleccion.getCtgp_tipo() != null) {
				query += " AND ctgp_tipo = :tipoElegido"; // Espacio en blanco agregado antes de la nueva condición
			}

			if (eleccion.getCtgp_situacion() != null) {
				query += " AND ctgp_situacion = :situacionElegido"; // Espacio en blanco agregado antes de la nueva
																	// condición
			}

			Query consulta = (Query) entityManager.createQuery(query);

			if (eleccion.getCtgp_codigo() != null && !eleccion.getCtgp_codigo().isEmpty()) {
				consulta.setParameter("codigoElegido", "%" + eleccion.getCtgp_codigo() + "%"); // Agregar comodines %
																								// para usar LIKE
			}

			if (eleccion.getCtgp_descripcion() != null) {
				consulta.setParameter("descripcionElegido", "%" + eleccion.getCtgp_descripcion() + "%");
			}

			if (eleccion.getCtgp_tipo() != null) {
				consulta.setParameter("tipoElegido", eleccion.getCtgp_tipo());
			}

			if (eleccion.getCtgp_situacion() != null) {
				consulta.setParameter("situacionElegido", eleccion.getCtgp_situacion());
			}

			List<ctg_puesto> descripcion = consulta.getResultList();
			logger.info("Consulta exitosa al generar repote de puesto x codigo " + descripcion);
			return descripcion;

		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

}