package com.app.nomina.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.app.nomina.controllers.ConceptosNominaController;
import com.app.nomina.models.ctg_conceptosdenomina;
import com.app.nomina.models.ctg_lstcptosdenomina;
import com.app.nomina.models.ctg_lsttimbrado;
import com.app.nomina.models.sn_cptosperiodosaplic;
import com.app.nomina.models.sn_periodosdepago;
import com.app.nomina.models.sn_persona;
import com.app.nomina.models.sp_clasificadordegasto;

@Repository
@Transactional
public class ConceptosNominaImp implements ConceptosNominaDao {

	@PersistenceContext
	EntityManager entityManager;
	Logger logger = LoggerFactory.getLogger(ConceptosNominaController.class);

	// EMPIZA LOS DATOS QUE SE VISUALIZAN EN LA BUSQUEDA O CUADRO DE CONUSLTA ==
	// MODAL
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_conceptosdenomina> obtenerDatosXconcepto() {
		try {
			String query = "SELECT con_tipo,con_concepto,\n" +
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 2 AND lcdm_clave = con_tipo) AS tipo, \n"
					+ //
					"con_descripcion, " +
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 1 AND lcdm_clave = con_clasificador) AS categoria "
					+
					"FROM ctg_conceptosdenomina\n" +
					"WHERE con_tipo BETWEEN 1 AND 4";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por genero: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_conceptosdenomina> obtenerDatosXGerenciaDatosPorContraconcepto(ctg_conceptosdenomina eleccion) {

		try {
			// Consulta para la primera lista
			String query = "SELECT \n" + //
					"con_id,con_ejercicio,con_vigencia,con_concepto,\n" +
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 1 AND lcdm_clave = con_clasificador) AS clasificacion, \n"
					+
					"con_clasificador,\n" +
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 2 AND lcdm_clave = con_tipo ) AS tipo, \n"
					+
					"con_tipo,con_descripcion, \n" +
					"(SELECT cg_nombre FROM sp_clasificadordegasto WHERE cg_ejercicio = 2024 AND cg_clave = con_partida) AS partida, \n"
					+
					"con_partida,con_tipoaplica, con_imprimir, \n" +
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 3 AND lcdm_clave = con_tipoimporte) AS tipoimporte, \n"
					+ //
					"con_tipoimporte, \n" + //
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 4 AND lcdm_clave = con_origenimp) AS origenimp, \n"
					+ //
					"con_origenimp, \n" + //
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 5 AND lcdm_clave = con_origenfactor) AS origenfactor, \n"
					+ //
					"con_origenfactor,con_lovfactor,con_importe,con_gvmodalidad,con_gvfactor,con_gvtipointegra,con_gvexcento,con_gvexcmod,con_gvexcfavor,\n"
					+ //
					"con_czmodalidad,con_czfactor,con_tabla,con_precedencia,con_impuesto,con_subsidiar,con_afxpension,con_afxsuspension,con_afxlicss,\n"
					+ //
					"con_afxlicms,con_afxfaltas,con_modoperacion,con_afxanlretro,con_afxcalfrac,con_afxpenneto,con_afxpenadic,con_subtcalac,con_subtgrvac,\n"
					+ //
					"con_subtcalba,con_subtgrvba,con_subgasto,con_tipogasto,\n" + //
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 17 AND lcdm_clave = con_grupoacum) AS grupoacum, \n"
					+ //
					"con_grupoacum,\n" + //
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 17 AND lcdm_clave = con_grupoacumd) AS grupoacumd,\n"
					+ //
					"con_grupoacumd, \n" + //
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 18 AND lcdm_clave = con_gruposecu) AS gruposecu, \n"
					+ //
					"con_gruposecu,con_clasegrpsec,con_afxcancelacion,con_afxreintegro,con_liqsueldos,con_liqotrasprest,con_grpindemni,con_tipocosto,\n"
					+ //
					"con_agrpxantecedente,con_rfpconcepto,con_afxmbcotizable,con_tipocostocan,\n" + //
					"(SELECT ltim_descripcion FROM ctg_lsttimbrado WHERE ltim_clase = con_cequivtimbrado AND ltim_clavealfabetica = con_equivtimbrado ) AS equivtimbrado, \n"
					+ //
					"con_equivtimbrado,  \n" +
					"con_cequivtimbrado, \n" +
					"con_afxfiniquito,con_rubrocontable,con_idprovgrp,con_cuentapasivo,con_costocentralizado,con_modcontadores,\n"
					+ //
					"con_fechainicio,con_fechatermino,con_usucapturo,con_fechamod,con_usucapturo,con_fechamod,con_usumodifico,con_situacion,\n"
					+ //
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 6 AND lcdm_clave = con_origenimp) AS descriciongvmodalidad, \n"
					+
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 7 AND lcdm_clave = con_origenimp) AS descriciongvtipointegra,\n"
					+
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 15 AND lcdm_clave = con_origenimp) AS subgasto,\n"
					+
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 11 AND lcdm_clave = con_origenimp) AS subcalac, \n"
					+
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 12 AND lcdm_clave = con_origenimp) AS subtgrvac, \n"
					+
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 13 AND lcdm_clave = con_origenimp) AS subtcalba, \n"
					+
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 14 AND lcdm_clave = con_origenimp) AS subtgrvba, \n"
					+
					"(SELECT lcdm_descripcion FROM ctg_lstcptosdenomina WHERE lcdm_clase = 9 AND lcdm_clave = con_origenimp) AS czmodalidad, \n"
					+
					"con_fechainicio, con_usucapturo, con_fechamod, con_usumodifico, con_situacion, " +
					"(SELECT ejer_ejercicio FROM sn_ejercicio WHERE ejer_situacion = 1 AND ejer_ejercicio = con_ejercicio) AS ejercicio "
					+
					"FROM \n" + //
					"ctg_conceptosdenomina \n" + //
					"WHERE 1 = 1";





					

			logger.info("Ejecutando primera consulta: " + query);

			if (eleccion != null && eleccion.getCon_concepto() != null) {
				query += " AND con_concepto = :conceptoElegido";
			}

			// Incluir la regla de contraconcepto en la consulta
			if (eleccion != null && eleccion.getCon_tipo() != null) {
				BigDecimal contraconcepto = BigDecimal
						.valueOf(obtenerContraconcepto(eleccion.getCon_tipo().intValue())); // Convertir int a
																							// BigDecimal
				BigDecimal regularconcepto = BigDecimal
						.valueOf(obtenerRegularconcepto(eleccion.getCon_tipo().intValue())); // Convertir int a
																								// BigDecimal
				query += " AND (con_tipo = :tipoElegido OR con_tipo = :contraTipo OR con_tipo = :regularTipo)";
			}

			@SuppressWarnings("rawtypes")
			Query consulta = (Query) entityManager.createQuery(query);

			if (eleccion != null && eleccion.getCon_concepto() != null) {
				consulta.setParameter("conceptoElegido", eleccion.getCon_concepto());
			}

			// Establecer el valor de la regla de contraconcepto como parámetro
			if (eleccion != null && eleccion.getCon_tipo() != null) {
				BigDecimal contraconcepto = BigDecimal
						.valueOf(obtenerContraconcepto(eleccion.getCon_tipo().intValue())); // Convertir int a
																							// BigDecimal
				BigDecimal regularconcepto = BigDecimal
						.valueOf(obtenerRegularconcepto(eleccion.getCon_tipo().intValue())); // Convertir int a
																								// BigDecimal
				consulta.setParameter("tipoElegido", eleccion.getCon_tipo());
				consulta.setParameter("contraTipo", contraconcepto);
				consulta.setParameter("regularTipo", regularconcepto);
			}

			List<ctg_conceptosdenomina> descripcion = consulta.getResultList();

			// Realizar la segunda consulta
			List<sn_cptosperiodosaplic> resultadosSegundaConsulta = realizarSegundaConsulta(eleccion);

			// Imprimir los resultados de la segunda consulta
			for (sn_cptosperiodosaplic ct : resultadosSegundaConsulta) {
				System.out.println("Concepto: " + ct.getCpa_concepto() + ", Tipo de Concepto: " + ct.getCpa_tipocon()
						+ ",Tipo de periodo: " + ct.getCpa_periodo());
			}

			return descripcion;

		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por eleccion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	// Método para realizar la segunda consulta
	@SuppressWarnings("unchecked")
	public List<sn_cptosperiodosaplic> realizarSegundaConsulta(ctg_conceptosdenomina eleccion) {
		try {
			String conceptoElegido = (eleccion != null && eleccion.getCon_concepto() != null)
					? eleccion.getCon_concepto()
					: null;
			String querySn = "SELECT cpa_concepto, cpa_tipocon, cpa_periodo FROM sn_cptosperiodosaplic WHERE cpa_concepto = :concepto";

			@SuppressWarnings("rawtypes")
			Query consultaSn = (Query) entityManager.createQuery(querySn);
			consultaSn.setParameter("concepto", conceptoElegido);

			List<Object[]> resultadosSn = consultaSn.getResultList();

			// Crear una lista para almacenar los resultados de la segunda consulta
			List<sn_cptosperiodosaplic> resultadosSegundaConsulta = new ArrayList<>();

			// Procesar los resultados de la segunda consulta y agregarlos a la lista
			for (Object[] fila : resultadosSn) {
				String cpa_concepto = (String) fila[0];
				BigDecimal cpa_tipocon = (BigDecimal) fila[1];
				BigDecimal cpa_periodo = (BigDecimal) fila[2];

				// Crear un objeto sn_cptosperiodosaplic con los datos de la fila y agregarlo a
				// la lista
				sn_cptosperiodosaplic conceptoTipo = new sn_cptosperiodosaplic();
				conceptoTipo.setCpa_concepto(cpa_concepto);
				conceptoTipo.setCpa_tipocon(cpa_tipocon);
				conceptoTipo.setCpa_periodo(cpa_periodo);
				resultadosSegundaConsulta.add(conceptoTipo);
			}

			// Devolver la lista de resultados de la segunda consulta
			return resultadosSegundaConsulta;

		} catch (Exception e) {
			logger.error("Error al ejecutar la segunda consulta: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_cptosperiodosaplic> obtenerDatosXperiodoaplic() {
		try {
			String query = "from sn_cptosperiodosaplic";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por periodosdepago: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	// METODOS PARA HACER CAMBIO DE CONTRACONCEPTO.
	private int obtenerContraconcepto(int tipoconcepto) {
		int contraconcepto = 0;

		if (tipoconcepto == 1 || tipoconcepto == 6) {
			contraconcepto = 7;
		} else if (tipoconcepto == 2 || tipoconcepto == 8) {
			contraconcepto = 9;
		} else if (tipoconcepto == 3 || tipoconcepto == 10) {
			contraconcepto = 11;
		} else if (tipoconcepto == 4 || tipoconcepto == 12) {
			contraconcepto = 13;
		}

		return contraconcepto;
	}

	// METODOS PARA HACER CAMBIO DE UN CONCEPTO REGULAR.
	private int obtenerRegularconcepto(int tipoconcepto) {
		int regularconcepto = 0;

		if (tipoconcepto == 6 || tipoconcepto == 7) {
			regularconcepto = 1;
		} else if (tipoconcepto == 8 || tipoconcepto == 9) {
			regularconcepto = 2;
		} else if (tipoconcepto == 10 || tipoconcepto == 11) {
			regularconcepto = 3;
		} else if (tipoconcepto == 12 || tipoconcepto == 13) {
			regularconcepto = 4;
		}

		return regularconcepto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_periodosdepago> obtenerDatosXperiodo() {
		try {
			String query = "from sn_periodosdepago where pp_ejercicio = 2024";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por periodosdepago: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_cptosperiodosaplic> obtenerDatosXfecha() {
		try {
			String query = "from sn_cptosperiodosaplic";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por periodosdepago: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXclasificacion() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 1";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXtipo() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 2";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXgrupoacum() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 17";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXgruposecu() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 18";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lsttimbrado> obtenerDatosXtimbrado() {
		try {
			String query = "from ctg_lsttimbrado";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<sp_clasificadordegasto> obtenerDatosXpartida() {
		try {
			String query = "from sp_clasificadordegasto where cg_ejercicio = 2024";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXtipoimporte() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 3";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXfactororigen() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 5";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXorigenimporte() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 4";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXmodalidaddedeterminaciondeimporte() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 6";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerDatosXmodalidaddeintegracionabasegravable() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 7";

			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> importeexcento() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 8";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();

		} catch (Exception e) {

			logger.error("error al raer la conuslta de importe excento", e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la conuslta");

		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> obtenerGatoAsignado() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 15";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();

		} catch (Exception e) {

			logger.error("error al raer la conuslta de gasto asignado", e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la conuslta");

		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> CalcularsobreBase() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 11";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();

		} catch (Exception e) {

			logger.error("error al raer la conuslta de Calcular sobre base", e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la conuslta");

		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> GravarSubsidio() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 12";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();

		} catch (Exception e) {

			logger.error("error al raer la conuslta de Gravar Subsidio", e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la conuslta");

		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> CalcularsobrebaseDos() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 13";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();

		} catch (Exception e) {

			logger.error("error al raer la conuslta de Calcular sobre base", e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la conuslta");

		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> GravarSubsidioDos() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 14";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();

		} catch (Exception e) {

			logger.error("error al raer la conuslta de Gravar Subsidio", e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la conuslta");

		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstcptosdenomina> ObtenerModalidad() {
		try {
			String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 9";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();

		} catch (Exception e) {

			logger.error("error al raer la conuslta de modalidad", e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la conuslta");

		}
	}





// ====================ESTE ES EL MÉTODO CON DOS QUERY'S PARA HACER EL REGISTRO
	// DE UNA PERSONA ========================= 
	public boolean registrarConcepto(ctg_conceptosdenomina concepto) {    
		try {
			String query = "INSERT INTO ctg_conceptosdenomina (con_ejercicio, con_vigencia, con_concepto, con_clasificador, con_tipo, con_descripcion, con_partida, con_tipocosto, con_agrpxantecedente,"
			            + "con_rfpconcepto,con_tipocostocan, con_grupoacum,con_clasegrpsec, con_idprovgrp, con_rubrocontable, con_costocentralizado, con_tipogasto, con_equivtimbrado, con_tipoaplica,"
						+ "con_afxmbcotizable, con_imprimir,con_afxfaltas,con_liqsueldos,con_liqotrasprest, con_afxfiniquito, con_afxanlretro, con_afxcalfrac,con_afxpension, con_afxpenneto, con_afxpenadic,"
						+"con_afxsuspension, con_afxlicss, con_afxlicms, con_afxreintegro, con_grpindemni) " 
			            +"VALUES (:con_ejercicio, :con_vigencia, :con_concepto, :con_clasificador, :con_tipo, :con_descripcion, :con_partida, :con_tipocosto, :con_agrpxantecedente,"
						+":con_rfpconcepto, :con_tipocostocan, :con_grupoacum, :con_clasegrpsec, :con_idprovgrp, :con_rubrocontable, :con_costocentralizado, :con_tipogasto, :con_equivtimbrado, :con_tipoaplica,"
						+":con_afxmbcotizable, :con_imprimir, :con_afxfaltas, :con_liqsueldos, :con_liqotrasprest, :con_afxfiniquito, :con_afxanlretro, :con_afxcalfrac, :con_afxpension, :con_afxpenneto, :con_afxpenadic, "
						+":con_afxsuspension,:con_afxlicss,:con_afxlicms, :con_afxreintegro, :con_grpindemni)";
	  
			int filasAfectadas = entityManager.createNativeQuery(query)
												.setParameter("con_ejercicio", concepto.getCon_ejercicio())
												.setParameter("con_vigencia", concepto.getCon_vigencia())
												.setParameter("con_concepto", concepto.getCon_concepto())
												.setParameter("con_clasificador", concepto.getCon_clasificador())
												.setParameter("con_tipo", concepto.getCon_tipo())
												.setParameter("con_descripcion", concepto.getCon_descripcion())
												.setParameter("con_partida", concepto.getCon_partida())
												.setParameter("con_tipocosto", concepto.getCon_tipocosto())
												.setParameter("con_agrpxantecedente", concepto.getCon_agrpxantecedente())
												.setParameter("con_rfpconcepto", concepto.getCon_rfpconcepto())
												.setParameter("con_tipocostocan", concepto.getCon_tipocostocan())
												.setParameter("con_grupoacum", concepto.getCon_grupoacum())
												.setParameter("con_clasegrpsec", concepto.getCon_clasegrpsec())
												.setParameter("con_idprovgrp", concepto.getCon_idprovgrp())
												.setParameter("con_rubrocontable", concepto.getCon_rubrocontable())
												.setParameter("con_costocentralizado", concepto.getCon_costocentralizado())
												.setParameter("con_tipogasto", concepto.getCon_tipogasto())
												.setParameter("con_equivtimbrado", concepto.getCon_equivtimbrado())
												.setParameter("con_tipoaplica", concepto.getCon_tipoaplica())
												.setParameter("con_afxmbcotizable", concepto.getCon_afxmbcotizable())
												.setParameter("con_imprimir", concepto.getCon_imprimir())
												.setParameter("con_afxfaltas", concepto.getCon_afxfaltas())
												.setParameter("con_liqsueldos", concepto.getCon_liqsueldos())
												.setParameter("con_liqotrasprest", concepto.getCon_liqotrasprest())
												.setParameter("con_afxfiniquito", concepto.getCon_afxfiniquito())
												.setParameter("con_afxanlretro", concepto.getCon_afxanlretro())
												.setParameter("con_afxcalfrac", concepto.getCon_afxcalfrac())
												.setParameter("con_afxpension", concepto.getCon_afxpension ())
												.setParameter("con_afxpenneto", concepto.getCon_afxpenneto  ())
												.setParameter("con_afxpenadic", concepto.getCon_afxpenadic  ())
												.setParameter("con_afxsuspension", concepto.getCon_afxsuspension ())
												.setParameter("con_afxlicss", concepto.getCon_afxlicss ())
												.setParameter("con_afxlicms", concepto.getCon_afxlicms())
												.setParameter("con_afxreintegro", concepto.getCon_afxreintegro())
												.setParameter("con_grpindemni", concepto.getCon_grpindemni())
												.executeUpdate();
	
			return filasAfectadas > 0;
		} catch (Exception e) {	
			logger.error("Error al registrar el concepto: " + e.getMessage(), e);
			return false;
		}
	}
	




}