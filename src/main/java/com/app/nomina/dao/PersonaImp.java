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
import com.app.nomina.models.ctg_escolaridad;
import com.app.nomina.models.ctg_estado;
import com.app.nomina.models.ctg_idioma;
import com.app.nomina.models.ctg_lstpersona;
import com.app.nomina.models.ctg_municipio;
import com.app.nomina.models.sg_usuario;
import com.app.nomina.models.sn_persona;
import java.math.BigInteger;

@Repository
@Transactional
public class PersonaImp implements PersonaDao {

	@PersistenceContext
	EntityManager entityManager;
	Logger logger = LoggerFactory.getLogger(IndexController.class);

	// === ESTA QUERY TRAE LOS DATOS NECESARIOS PARA CONSULTAR A UNA PESONA===//
	@SuppressWarnings("unchecked")
	@Override
	public List<sn_persona> obtenerDatosXGerencia(sn_persona curp) {
		try {
			String query = "SELECT \n" +
					"per_id, \n" +
					"per_curp, \n" +
					"per_rfc, \n" +
					"per_homoclave, \n" +
					"CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) AS nombre_completo,\n" + //
					"per_genero,\n" +
					"(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 1 AND lper_clave = per_genero) AS genero_desc,\n"
					+ //
					"per_noseguridad,\n" +
					"per_edocivil,\n" +
					"(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 2 AND lper_clave = per_edocivil) AS edocivil_desc,\n"
					+ //
					"per_fechaingreso, \n" +
					"per_fechaingresosp, \n" +
					"per_fechabaja,\n" +
					"per_nacionalidad,\n" +
					"(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 3 AND lper_clave = per_nacionalidad) AS nacionalidad_desc,\n"
					+ //
					"per_origenedo,\n" +
					"(SELECT CONCAT(edo_id,' - ',edo_nombre) FROM ctg_estado WHERE edo_id = per_origenedo) AS origenedo_desc,\n"
					+ //
					"per_origenmun,\n" +
					"(SELECT mun_nombre FROM ctg_municipio WHERE mun_edopadre = per_origenedo AND mun_numero = per_origenmun) AS origenmun_desc,\n"
					+ //
					"(SELECT idio_descripcion FROM ctg_idioma WHERE idio_id = per_idioma) AS idioma_desc,\n" + //
					"per_idioma,\n" +
					"(SELECT esc_descripcion FROM ctg_escolaridad WHERE esc_id = per_escolaridad) AS escolaridad_desc,\n"
					+ //
					"per_escolaridad,\n" +
					"per_fechanacimiento,\n" +
					"per_cpfiscal,\n" +
					"per_numempleado,\n" +
					"per_regimenissste,\n" +
					"(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 5 AND lper_clave = per_regimenissste) AS regimen_desc,\n"
					+ //
					"per_idrusp,\n" +
					"per_idinfonacot,\n" +
					"per_fechainicio,\n" +
					"per_fechatermino,\n" +
					"per_usucapturo,\n" +
					"(SELECT usu_alias FROM sg_usuario WHERE usu_id = per_usucapturo) AS usucapturo_desc,\n" + //
					"per_fechamod,\n" +
					"per_usumodifico,\n" +
					"(SELECT usu_alias FROM sg_usuario WHERE usu_id = per_usumodifico) AS usumodifico_desc,\n" + //
					"per_situacion,\n" +
					"(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 6 AND lper_clave = per_situacion) AS situacion_desc,\n"
					+ //
					"(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 7 AND lper_clave = per_tipodiscap) AS disp_desc,\n"
					+ //
					"per_tipodiscap,\n" +
					"per_email\n" +
					"FROM \n" +
					"sn_persona \n" +
					"WHERE \n" +
					"per_curp = :curp ";

			List<sn_persona> personas = entityManager.createQuery(query).setParameter("curp", curp.getPer_curp()) // Asignamos
					.getResultList();

			logger.info("SE EJECUTO CORRECTAMENTE LA CONSULTA " + personas);
			return personas;
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);

			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}
	// AQUI TERMINA MI FUNCIÓN PARA CREAR UNA QUERY DE MANERA SATISFACTORIA.....

	// ESTE METODO SE IMPLEMENTA EN EL BUSCADOR PARA RECABAR LOS DATOS DE MANERA QUE
	// TENGAN UN ORDEN.
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> obtenerDatosXTabla() {
		try {
			String query = "SELECT per_id, per_curp, CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) AS full_name "
					+ "FROM sn_persona " + "WHERE CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) LIKE '%' "
					+ "OR per_apmaterno LIKE '%' " + "OR CONCAT(per_appaterno, ' ', per_apmaterno) LIKE '%' "
					+ "OR per_nombre LIKE '%' " + "OR CONCAT(per_appaterno, ' ', per_apmaterno) LIKE '%' "
					+ "OR per_curp LIKE '%' " + "OR per_numempleado IS NOT NULL " + "OR per_nombre LIKE '%' "
					+ "OR per_appaterno LIKE '%' " + "OR per_apmaterno LIKE '%'";

			logger.info("SE ESTA EJECUTANDO CORRECTAMENTE LA CONSULTA"
					+ entityManager.createNativeQuery(query).getResultList());
			return entityManager.createNativeQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	// FIN DE ESTE METODO QUE SE IMPLEMENTA EN EL BUSCADOR PARA RECABAR LOS DATOS DE
	// MANERA QUE TENGAN UN ORDEN.

	// VALIDAR QUE EN LA BASE DE DATOS NO SE REPITA EL MISMO CURP
	@Override
	public boolean curpExiste(String curp) {
		try {
			String query = "SELECT COUNT(*) FROM sn_persona WHERE per_curp = :curp";
			Long count = entityManager.createQuery(query, Long.class).setParameter("curp", curp).getSingleResult();

			return count > 0; // Retorna true si el CURP existe, false si no existe
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta si el curp existe: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@Override
	public boolean EmpleadoExiste(Integer empleado) {
		try {
			String query = "SELECT COUNT(*) FROM sn_persona WHERE per_numempleado= :empleado";
			Long count = entityManager.createQuery(query, Long.class).setParameter("empleado", empleado)
					.getSingleResult();

			return count > 0; // Retorna true si el CURP existe, false si no existe
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta si el curp existe: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}
	// VALIDAR QUE EN LA BASE DE DATOS NO SE REPITA EL MISMO CURP

	// ====================ESTE ES EL MÉTODO CON DOS QUERY'S PARA HACER EL REGISTRO
	// DE UNA PERSONA =========================
	public boolean registrarPersona(sn_persona persona) {
		if (curpExiste(persona.getPer_curp())) {
			return false;
		}
		if (rfcHomoclaveExiste(persona.getPer_rfc() + persona.getPer_homoclave())) {
			return false;
		}

		if (EmpleadoExiste(persona.getPer_numempleado())) {
			return false;
		}
		if (persona.getPer_origenmun() == null) {
			return registrarPersonaSinFechaBaja(persona);
		} else {
			return registrarPersonaConFechaBaja(persona);
		}

	}

	private boolean registrarPersonaSinFechaBaja(sn_persona persona) {
		try {
			String query = "INSERT INTO sn_persona (per_curp, per_rfc, per_homoclave, per_nombre, per_appaterno, per_apmaterno, "
					+ "per_genero,per_edocivil,per_noseguridad, per_fechaingreso, per_fechaingresosp,"
					+ " per_nacionalidad, per_origenedo, "
					+ "per_numempleado, per_idrusp, per_idinfonacot, per_regimenissste, per_fechainicio,  "
					+ "per_usucapturo, per_fechamod, per_usumodifico, per_situacion, per_cpfiscal, per_fechanacimiento, per_email,per_tipodiscap,per_escolaridad,per_idioma) "
					+ "VALUES (:per_curp, :per_rfc, :per_homoclave, :per_nombre, :per_appaterno, :per_apmaterno, :per_genero, "
					+ ":per_edocivil,:per_noseguridad,:per_fechaingreso, :per_fechaingresosp,  "
					+ ":per_nacionalidad, :per_origenedo,:per_numempleado, "
					+ ":per_idrusp, :per_idinfonacot, :per_regimenissste, :per_fechainicio,  :per_usucapturo, "
					+ ":per_fechamod, :per_usumodifico, :per_situacion, :per_cpfiscal, :per_fechanacimiento, :per_email, :per_tipodiscap, :per_escolaridad, :per_idioma)";

			int filasAfectadas = entityManager.createNativeQuery(query).setParameter("per_curp", persona.getPer_curp())
					.setParameter("per_rfc", persona.getPer_rfc())
					.setParameter("per_homoclave", persona.getPer_homoclave())
					.setParameter("per_nombre", persona.getPer_nombre())
					.setParameter("per_appaterno", persona.getPer_appaterno())
					.setParameter("per_apmaterno", persona.getPer_apmaterno())
					.setParameter("per_genero", persona.getPer_genero())
					.setParameter("per_noseguridad", persona.getPer_noseguridad())
					.setParameter("per_edocivil", persona.getPer_edocivil())
					.setParameter("per_fechaingreso", persona.getPer_fechaingreso())
					.setParameter("per_fechaingresosp", persona.getPer_fechaingreso())
					.setParameter("per_nacionalidad", persona.getPer_nacionalidad())
					.setParameter("per_origenedo", persona.getPer_origenedo())
					.setParameter("per_numempleado", persona.getPer_numempleado())
					.setParameter("per_idrusp", persona.getPer_idrusp())
					.setParameter("per_idinfonacot", persona.getPer_idinfonacot())
					.setParameter("per_regimenissste", persona.getPer_regimenissste())
					.setParameter("per_fechainicio", persona.getPer_fechainicio())
					.setParameter("per_usucapturo", persona.getPer_usucapturo())
					.setParameter("per_fechamod", persona.getPer_fechamod())
					.setParameter("per_usumodifico", persona.getPer_usumodifico())
					.setParameter("per_situacion", persona.getPer_situacion())
					.setParameter("per_cpfiscal", persona.getPer_cpfiscal())
					.setParameter("per_fechanacimiento", persona.getPer_fechanacimiento())
					.setParameter("per_email", persona.getPer_email())
					.setParameter("per_tipodiscap", persona.getPer_tipodiscap())
					.setParameter("per_escolaridad", persona.getPer_escolaridad())
					.setParameter("per_idioma", persona.getPer_idioma()).executeUpdate();

			return filasAfectadas > 0;
		} catch (Exception e) {
			logger.error("Error al registrar la persona sin fecha de baja: " + e.getMessage(), e);
			return false;
		}
	}

	private boolean registrarPersonaConFechaBaja(sn_persona persona) {
		try {
			String query = "INSERT INTO sn_persona (per_curp, per_rfc, per_homoclave, per_nombre, per_appaterno, per_apmaterno, "
					+ "per_genero, per_noseguridad, per_edocivil, per_fechaingreso, per_fechaingresosp, "
					+ " per_nacionalidad, per_origenedo, per_origenmun, "
					+ "per_numempleado, per_idrusp, per_idinfonacot, per_regimenissste, per_fechainicio, "
					+ "per_usucapturo, per_fechamod, per_usumodifico, per_situacion, per_cpfiscal, per_fechanacimiento, per_email,per_tipodiscap,per_escolaridad,per_idioma) "
					+ "VALUES (:per_curp, :per_rfc, :per_homoclave, :per_nombre, :per_appaterno, :per_apmaterno, :per_genero, "
					+ ":per_noseguridad, :per_edocivil, :per_fechaingreso, :per_fechaingresosp, "
					+ ":per_nacionalidad, :per_origenedo, :per_origenmun,:per_numempleado, "
					+ ":per_idrusp, :per_idinfonacot, :per_regimenissste, :per_fechainicio, :per_usucapturo, "
					+ ":per_fechamod, :per_usumodifico, :per_situacion, :per_cpfiscal, :per_fechanacimiento, :per_email, :per_tipodiscap, :per_escolaridad, :per_idioma)";

			int filasAfectadas = entityManager.createNativeQuery(query).setParameter("per_curp", persona.getPer_curp())
					.setParameter("per_rfc", persona.getPer_rfc())
					.setParameter("per_homoclave", persona.getPer_homoclave())
					.setParameter("per_nombre", persona.getPer_nombre())
					.setParameter("per_appaterno", persona.getPer_appaterno())
					.setParameter("per_apmaterno", persona.getPer_apmaterno())
					.setParameter("per_genero", persona.getPer_genero())
					.setParameter("per_noseguridad", persona.getPer_noseguridad())
					.setParameter("per_edocivil", persona.getPer_edocivil())
					.setParameter("per_fechaingreso", persona.getPer_fechaingreso())
					.setParameter("per_fechaingresosp", persona.getPer_fechaingreso())
					.setParameter("per_nacionalidad", persona.getPer_nacionalidad())
					.setParameter("per_origenedo", persona.getPer_origenedo())
					.setParameter("per_origenmun", persona.getPer_origenmun())
					.setParameter("per_numempleado", persona.getPer_numempleado())
					.setParameter("per_idrusp", persona.getPer_idrusp())
					.setParameter("per_idinfonacot", persona.getPer_idinfonacot())
					.setParameter("per_regimenissste", persona.getPer_regimenissste())
					.setParameter("per_fechainicio", persona.getPer_fechainicio())
					.setParameter("per_usucapturo", persona.getPer_usucapturo())
					.setParameter("per_fechamod", persona.getPer_fechamod())
					.setParameter("per_usumodifico", persona.getPer_usumodifico())
					.setParameter("per_situacion", persona.getPer_situacion())
					.setParameter("per_cpfiscal", persona.getPer_cpfiscal())
					.setParameter("per_fechanacimiento", persona.getPer_fechanacimiento())
					.setParameter("per_email", persona.getPer_email())
					.setParameter("per_tipodiscap", persona.getPer_tipodiscap())
					.setParameter("per_escolaridad", persona.getPer_escolaridad())
					.setParameter("per_idioma", persona.getPer_idioma()).executeUpdate();

			return filasAfectadas > 0;
		} catch (Exception e) {
			logger.error("Error al registrar la persona con fecha de baja: " + e.getMessage(), e);
			return false;
		}
	}
	// ====================FIN DEL MÉTODO CON DOS QUERY'S PARA HACER EL REGISTRO DE
	// UNA PERSONA =========================

	// QUERY PARA OBTENER DATOS POR GÉNERO DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpersona> obtenerDatosXgenero() {
		try {
			String query = "from ctg_lstpersona where lper_clase = 1 and lper_situacion = 1";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por genero: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	// FIN QUERY PARA OBTENER DATOS POR GENERO DE ACUEROD A SU CLAVE Y DESCRIPCION

	// QUERY PARA OBTENER DATOS IDIOMA DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_idioma> obtenerDatosXidioma() {
		try {
			String query = "from ctg_idioma where idio_situacion = 1 ";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por genero: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}
	// FIN QUERY PARA OBTENER DATOS IDIOMA DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS ESCOLARIDAD DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_escolaridad> obtenerDatosXescolaridad() {
		try {
			String query = "from ctg_escolaridad where esc_situacion = 1 ";
			logger.info("registro: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por genero: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}
	// FIN QUERY PARA OBTENER DATOS ESCOLARIDAD DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS DICAPACIDAD DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpersona> obtenerDatosXdiscapacidad() {
		try {
			String query = "from ctg_lstpersona where lper_clase = 7 and lper_situacion = 1";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por edocivil: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS DICAPACIDAD DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS ESTADO CIVIL DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpersona> obtenerDatosXedocivil() {
		try {
			String query = "from ctg_lstpersona where lper_clase = 2 and lper_situacion = 1";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por edocivil: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}

	// FIN QUERY PARA OBTENER DATOS ESTADO CIVIL DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS ESTADO DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_estado> obtenerDatosXestado() {
		try {
			String query = "from ctg_estado where edo_situacion = 1";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por estado: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS ESTADO DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS ESTADO DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_municipio> obtenerDatosXmunicipio() {
		try {
			String query = "from ctg_municipio where mun_situacion = 1";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por municipio: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS ESTADO DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpersona> obtenerDatosXnacionalidad() {
		try {
			String query = "from ctg_lstpersona where lper_clase = 3 and lper_situacion = 1";

			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por nacionalidad: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}

	// QUERY PARA OBTENER DATOS SITUACIÓN DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpersona> obtenerDatosXsituacion() {
		try {
			String query = "from ctg_lstpersona where lper_clase = 6 and lper_situacion = 1";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por situacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS SITUACIÓN DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS CONTRATACIÓN DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpersona> obtenerDatosXcontratacion() {
		try {
			String query = "from ctg_lstpersona where lper_clase = 4 and lper_situacion = 1";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por contratacion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS CONTRATACIÓN DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS REGIMÉN DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpersona> obtenerDatosXissste() {
		try {
			String query = "from ctg_lstpersona where lper_clase = 5 and lper_situacion = 1";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por regimen isste: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS REGIMÉN DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA OBTENER DATOS UDUARIO DE ACUEROD A SU CLAVE Y DESCRIPCIÓN
	@SuppressWarnings("unchecked")
	@Override
	public List<sg_usuario> obtenerDatosXusuario() {
		try {
			String query = "from sg_usuario";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por usuario: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	// FIN QUERY PARA OBTENER DATOS USUARIO DE ACUEROD A SU CLAVE Y DESCRIPCIÓN

	// QUERY PARA ACTUALIZAR LOS DATOS DE LA PERSONA
	public boolean actualizarDatos(sn_persona persona) {
		logger.info("ACTUALIZACION DE DATOS PARA NOMINA ");
		try {
			logger.info("Iniciando el proceso de actualización de datos...");

			if (persona.getPer_fechabaja() == null && persona.getPer_fechatermino() == null) {

				return ejecutarPrimeraConsulta(persona);
			} else {

				return ejecutarSegundaConsulta(persona);
			}
		} catch (Exception e) {
			logger.error("Error al actualizar datos", e);
			return false;
		}
	}

	private boolean ejecutarPrimeraConsulta(sn_persona persona) {
		try {
			logger.info("Entrando a la primera consulta...");
			String query = "UPDATE sn_persona SET "
					+ "per_id = :per_id, "
					+ "per_curp = :per_curp, "
					+ "per_rfc = :per_rfc, "
					+ "per_noseguridad = :per_noseguridad, "
					+ "per_nacionalidad = :per_nacionalidad, "
					+ "per_homoclave = :per_homoclave, "
					+ "per_nombre = :per_nombre, "
					+ "per_genero = :per_genero, "
					+ "per_appaterno = :per_appaterno, "
					+ "per_apmaterno = :per_apmaterno, "
					+ "per_edocivil = :per_edocivil, "
					+ "per_fechanacimiento = :per_fechanacimiento, "
					+ "per_idioma = :per_idioma, "
					+ "per_escolaridad = :per_escolaridad, "
					+ "per_tipodiscap = :per_tipodiscap, "
					+ "per_email = :per_email, "
					+ "per_cpfiscal = :per_cpfiscal, "
					+ "per_fechaingreso = :per_fechaingreso, "
					+ "per_fechaingresosp = :per_fechaingresosp, "
					+ "per_origenedo = :per_origenedo, "
					+ "per_origenmun = :per_origenmun, "
					+ "per_numempleado = :per_numempleado, "
					+ "per_idrusp = :per_idrusp, "
					+ "per_idinfonacot = :per_idinfonacot, "
					+ "per_regimenissste = :per_regimenissste, "
					+ "per_fechainicio = :per_fechainicio, "
					+ "per_usucapturo = :per_usucapturo, "
					+ "per_fechamod = :per_fechamod, "
					+ "per_usumodifico = :per_usumodifico, "
					+ "per_situacion = :per_situacion "
					+ "WHERE per_id = :per_id";

			int filasAfectadas = entityManager.createNativeQuery(query)
					.setParameter("per_id", persona.getPer_id())
					.setParameter("per_curp", persona.getPer_curp())
					.setParameter("per_rfc", persona.getPer_rfc())
					.setParameter("per_homoclave", persona.getPer_homoclave())
					.setParameter("per_nombre", persona.getPer_nombre())
					.setParameter("per_genero", persona.getPer_genero())
					.setParameter("per_edocivil", persona.getPer_edocivil())
					.setParameter("per_fechaingreso", persona.getPer_fechaingreso())
					.setParameter("per_fechaingresosp", persona.getPer_fechaingresosp())
					.setParameter("per_origenedo", persona.getPer_origenedo())
					.setParameter("per_origenmun", persona.getPer_origenmun())
					.setParameter("per_nacionalidad", persona.getPer_nacionalidad())
					.setParameter("per_numempleado", persona.getPer_numempleado())
					.setParameter("per_idrusp", persona.getPer_idrusp())
					.setParameter("per_idinfonacot", persona.getPer_idinfonacot())
					.setParameter("per_regimenissste", persona.getPer_regimenissste())
					.setParameter("per_fechainicio", persona.getPer_fechainicio())
					.setParameter("per_usucapturo", persona.getPer_usucapturo())
					.setParameter("per_fechamod", persona.getPer_fechamod())
					.setParameter("per_usumodifico", persona.getPer_usumodifico())
					.setParameter("per_situacion", persona.getPer_situacion())
					.setParameter("per_appaterno", persona.getPer_appaterno())
					.setParameter("per_apmaterno", persona.getPer_apmaterno())
					.setParameter("per_noseguridad", persona.getPer_noseguridad())
					.setParameter("per_fechanacimiento", persona.getPer_fechanacimiento())
					.setParameter("per_cpfiscal", persona.getPer_cpfiscal())
					.setParameter("per_email", persona.getPer_email())
					.setParameter("per_tipodiscap", persona.getPer_tipodiscap())
					.setParameter("per_idioma", persona.getPer_idioma())
					.setParameter("per_escolaridad", persona.getPer_escolaridad())
					.executeUpdate();

			logger.info("Filas afectadas en la primera consulta: " + filasAfectadas);

			return filasAfectadas > 0;
		} catch (Exception e) {
			logger.error("Error al ejecutar la actualizacion de datos sin fecha baja: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	private boolean ejecutarSegundaConsulta(sn_persona persona) {
		try {
			logger.info("Entrando LA SEGUNDA CONSULTA ...");
			String query = "UPDATE sn_persona SET "
					+ "per_id= :per_id, "
					+ "per_curp = :per_curp, "
					+ "per_rfc = :per_rfc, "
					+ "per_noseguridad = :per_noseguridad, "
					+ "per_nacionalidad = :per_nacionalidad, "
					+ "per_homoclave = :per_homoclave, "
					+ "per_nombre = :per_nombre, "
					+ "per_genero = :per_genero, "
					+ "per_appaterno = :per_appaterno, "
					+ "per_apmaterno = :per_apmaterno, "
					+ "per_edocivil = :per_edocivil, "
					+ "per_email = :per_email,"
					+ "per_cpfiscal = :per_cpfiscal,"
					+ "per_fechabaja = :per_fechabaja, "
					+ "per_fechaingreso = :per_fechaingreso, "
					+ "per_fechaingresosp = :per_fechaingresosp, "
					+ "per_fechanacimiento = :per_fechanacimiento,"
					+ "per_origenedo = :per_origenedo, "
					+ "per_origenmun = :per_origenmun, "
					+ "per_numempleado = :per_numempleado, "
					+ "per_idrusp = :per_idrusp, "
					+ "per_idinfonacot = :per_idinfonacot, "
					+ "per_regimenissste = :per_regimenissste, "
					+ "per_fechainicio = :per_fechainicio, "
					+ "per_fechatermino = :per_fechatermino, "
					+ "per_usucapturo = :per_usucapturo, "
					+ "per_fechamod = :per_fechamod, "
					+ "per_idioma = :per_idioma, "
					+ "per_tipodiscap = :per_tipodiscap, "
					+ "per_escolaridad = :per_escolaridad, "
					+ "per_usumodifico = :per_usumodifico, "
					+ "per_situacion = :per_situacion "
					+ "WHERE per_id = :per_id";

			int filasAfectadas = entityManager.createNativeQuery(query).setParameter("per_curp", persona.getPer_curp())
					.setParameter("per_rfc", persona.getPer_rfc())
					.setParameter("per_homoclave", persona.getPer_homoclave())
					.setParameter("per_nombre", persona.getPer_nombre())
					.setParameter("per_genero", persona.getPer_genero())
					.setParameter("per_edocivil", persona.getPer_edocivil())
					.setParameter("per_fechaingreso", persona.getPer_fechaingreso())
					.setParameter("per_fechaingresosp", persona.getPer_fechaingresosp())
					.setParameter("per_origenedo", persona.getPer_origenedo())
					.setParameter("per_origenmun", persona.getPer_origenmun())
					.setParameter("per_nacionalidad", persona.getPer_nacionalidad())
					.setParameter("per_numempleado", persona.getPer_numempleado())
					.setParameter("per_idrusp", persona.getPer_idrusp())
					.setParameter("per_idinfonacot", persona.getPer_idinfonacot())
					.setParameter("per_regimenissste", persona.getPer_regimenissste())
					.setParameter("per_fechainicio", persona.getPer_fechainicio())
					.setParameter("per_fechatermino", persona.getPer_fechatermino())
					.setParameter("per_usucapturo", persona.getPer_usucapturo())
					.setParameter("per_fechamod", persona.getPer_fechamod())
					.setParameter("per_usumodifico", persona.getPer_usumodifico())
					.setParameter("per_situacion", persona.getPer_situacion())
					.setParameter("per_appaterno", persona.getPer_appaterno())
					.setParameter("per_apmaterno", persona.getPer_apmaterno())
					.setParameter("per_noseguridad", persona.getPer_noseguridad())
					.setParameter("per_fechabaja", persona.getPer_fechabaja())
					.setParameter("per_fechanacimiento", persona.getPer_fechanacimiento())
					.setParameter("per_cpfiscal", persona.getPer_cpfiscal())
					.setParameter("per_email", persona.getPer_email())
					.setParameter("per_tipodiscap", persona.getPer_tipodiscap())
					.setParameter("per_idioma", persona.getPer_idioma())
					.setParameter("per_escolaridad", persona.getPer_escolaridad())
					.setParameter("per_id", persona.getPer_id())
					.executeUpdate();
			logger.info("Filas afectadas en la segunda	 consulta: " + filasAfectadas);

			return filasAfectadas > 0;
		} catch (Exception e) {
			logger.error("Error al ejecutar la actualziacion de datos con fecha baja: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@Override
	public boolean rfcHomoclaveExiste(String rfcHomoclave) {
		try {
			String query = "SELECT COUNT(*) FROM sn_persona WHERE CONCAT(per_rfc, per_homoclave) = :rfc_homoclave";
			BigInteger count = (BigInteger) entityManager.createNativeQuery(query)
					.setParameter("rfc_homoclave", rfcHomoclave).getSingleResult();

			return count.intValue() > 0; // Retorna true si la combinación de RFC y homoclave existe, false si no existe
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de rfc y homoclave: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}
	// FIN QUERY PARA ACTUALIZAR LOS DATOS DE LA PERSONA

	@SuppressWarnings("unchecked")
	public List<sn_persona> obtenerDatosXeleccion(sn_persona eleccion) {
		try {
			String query = "SELECT "
					+ "per_id, per_curp, per_rfc, per_homoclave, CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) AS nombre_completo, "
					+ "per_genero, "
					+ "(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 1 AND lper_clave = per_genero) AS genero_desc, "
					+ "per_noseguridad, "
					+ "per_edocivil, "
					+ "(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 2 AND lper_clave = per_edocivil) AS edocivil_desc,\n"
					+ "per_fechaingreso, "
					+ "per_fechaingresosp, "
					+ "per_fechabaja, "
					+ "per_nacionalidad, "
					+ "(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 3 AND lper_clave = per_nacionalidad) AS nacionalidad_desc, "
					+ "per_origenedo, "
					+ "(SELECT concat(edo_id,' - ',edo_nombre) FROM ctg_estado WHERE edo_id = per_origenedo) AS origenedo_desc, "
					+ "per_origenmun, "
					+ "(SELECT mun_nombre FROM ctg_municipio WHERE mun_edopadre = per_origenedo AND mun_numero = per_origenmun) AS origenmun_desc, "
					+ "(SELECT idio_descripcion FROM ctg_idioma WHERE idio_id = per_idioma) AS idioma_desc,\n"
					+ "per_idioma,\n"
					+ "(SELECT esc_descripcion FROM ctg_escolaridad WHERE esc_id = per_escolaridad) AS escolaridad_desc,\n"
					+ "per_escolaridad,\n"
					+ "per_numempleado, "
					+ "per_regimenissste, "
					+ "(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 5 AND lper_clave = per_regimenissste) AS regimen_desc, "
					+ "per_idrusp, "
					+ "per_idinfonacot, "
					+ "per_fechainicio, "
					+ "per_fechatermino, "
					+ "per_usucapturo, "
					+ "(SELECT usu_alias FROM sg_usuario WHERE usu_id = per_usucapturo) AS usucapturo_desc, "
					+ "per_fechamod, "
					+ "per_usumodifico, "
					+ "(SELECT usu_alias FROM sg_usuario WHERE usu_id = per_usumodifico) AS usumodifico_desc, "
					+ "(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 7 AND lper_clave = per_tipodiscap) AS disp_desc,"
					+ "per_tipodiscap,"
					+ "(SELECT lper_descripcion FROM ctg_lstpersona WHERE lper_clase = 6 AND lper_clave = per_situacion) AS situacion_desc, "
					+ "per_situacion "
					+ "FROM sn_persona "
					+ "WHERE "
					+ "1 = 1 ";
			// + "per_genero = :generoElegido";

			if (eleccion.getPer_genero() != null) {
				// Realiza la comparación aquí
				query += " AND per_genero = :generoElegido";
			}

			if (eleccion.getPer_situacion() != null) {
				query += " AND per_situacion = :situacionElegida"; // Agregamos la condición de situación
			}
			if (eleccion.getPer_origenedo() != null) {
				query += " AND per_origenedo = :origenedoElegido"; // Agregamos la condición de origen
			}

			if (eleccion.getPer_origenmun() != null) {
				query += " AND per_origenmun = :origenmunElegido ";
			}

			if (eleccion.getPer_edocivil() != null) {
				query += " AND per_edocivil = :edocivilElegido"; // Agregamos la condición de origen
			}
			if (eleccion.getPer_nacionalidad() != null) {
				query += " AND per_nacionalidad = :nacionalidadElegido"; // Agregamos la condición de origen
			}

			if (eleccion.getPer_regimenissste() != null) {
				query += " AND per_regimenissste = :regimenisssteElegido"; // Agregamos la condición de origen
			}

			if (eleccion.getPer_tipodiscap() != null) {
				query += " AND per_tipodiscap = :tipodiscapElegido"; // Agregamos la condición de origen
			}

			if (eleccion.getPer_escolaridad() != null) {
				query += " AND per_escolaridad = :escolaridadElegido"; // Agregamos la condición de origen
			}

			if (eleccion.getPer_idioma() != null) {
				query += " AND per_idioma = :idiomaElegido"; // Agregamos la condición de origen
			}

			@SuppressWarnings("rawtypes")
			Query consulta = (Query) entityManager.createQuery(query);

			if (eleccion.getPer_genero() != null) {
				consulta.setParameter("generoElegido", eleccion.getPer_genero());
			}

			if (eleccion.getPer_situacion() != null) {
				consulta.setParameter("situacionElegida", eleccion.getPer_situacion());
			}
			if (eleccion.getPer_origenedo() != null) {
				consulta.setParameter("origenedoElegido", eleccion.getPer_origenedo());
			}

			if (eleccion.getPer_origenmun() != null) {
				consulta.setParameter("origenmunElegido", eleccion.getPer_origenmun());
			} else {
				// Si es null, no lo agregues a la consulta
			}

			if (eleccion.getPer_edocivil() != null) {
				consulta.setParameter("edocivilElegido", eleccion.getPer_edocivil());
			}

			if (eleccion.getPer_nacionalidad() != null) {
				consulta.setParameter("nacionalidadElegido", eleccion.getPer_nacionalidad());
			}

			if (eleccion.getPer_regimenissste() != null) {
				consulta.setParameter("regimenisssteElegido", eleccion.getPer_regimenissste());
			}

			if (eleccion.getPer_tipodiscap() != null) {
				consulta.setParameter("tipodiscapElegido", eleccion.getPer_tipodiscap());
			}

			if (eleccion.getPer_escolaridad() != null) {
				consulta.setParameter("escolaridadElegido", eleccion.getPer_escolaridad());
			}

			if (eleccion.getPer_idioma() != null) {
				consulta.setParameter("escolaridadElegido", eleccion.getPer_idioma());
			}

			// Establecer más parámetros en función de otros campos...

			List<sn_persona> descripcion = consulta.getResultList();

			return descripcion;
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por eleccion: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

}